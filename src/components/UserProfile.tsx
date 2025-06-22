import { useState } from "react";
import { useAuth, User } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Save, X, Shield, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BANNER_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

const UserProfile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <p className="text-lg">You are not logged in.</p>
        <Button onClick={() => navigate("/login")} className="mt-4">Login</Button>
      </div>
    );
  }

  const handleEdit = () => {
    setEditData({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow overflow-hidden">
      {/* Banner/Header */}
      <div className="relative h-40 bg-gray-200">
        <img
          src={BANNER_IMAGE}
          alt="Profile banner"
          className="object-cover w-full h-full"
        />
        {/* Profile Avatar */}
        <div className="absolute left-8 -bottom-16">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
            {user.name ? getInitials(user.name) : user.address.slice(2, 3)}
          </div>
        </div>
      </div>

      {/* Main Profile Info */}
      <div className="pt-20 px-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">
                {isEditing ? (
                  <Input
                    value={editData.name || ""}
                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                    className="text-3xl font-bold"
                  />
                ) : (
                  user.name
                )}
              </span>
              {user.isVerified && (
                <Shield className="w-6 h-6 text-green-500" title="Verified" />
              )}
            </div>
            <div className="text-gray-600 flex items-center space-x-2 mt-1">
              <span className="font-semibold">
                {user.role === "student" ? (
                  <><GraduationCap className="inline w-5 h-5 mr-1" /> Student</>
                ) : (
                  <><Briefcase className="inline w-5 h-5 mr-1" /> Recruiter</>
                )}
              </span>
              {user.company && user.role === "recruiter" && (
                <span className="flex items-center ml-4">
                  <MapPin className="w-5 h-5 mr-1" />
                  {user.company}
                </span>
              )}
            </div>
            <div className="text-gray-500 text-sm mt-1">
              Wallet: <span className="font-mono">{user.address.slice(0, 6)}...{user.address.slice(-4)}</span>
              <Button
                size="sm"
                className="ml-2"
                onClick={() => navigator.clipboard.writeText(user.address)}
              >
                Copy
              </Button>
            </div>
            <div className="text-gray-400 text-xs mt-1">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {!isEditing ? (
              <Button onClick={handleEdit} size="sm" variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
            <Button variant="destructive" onClick={logout}>Logout</Button>
          </div>
        </div>

        {/* About/Bio Section */}
        <div className="mt-8">
          <Label htmlFor="bio" className="text-lg font-semibold">About</Label>
          {isEditing ? (
            <Textarea
              id="bio"
              value={editData.bio || ""}
              onChange={e => setEditData({ ...editData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              className="mt-1"
            />
          ) : (
            <p className="mt-1 text-gray-700">
              {user.bio || 'No bio added yet.'}
            </p>
          )}
        </div>

        {/* Experience/Company for recruiter, Experience for student */}
        {user.role === 'student' && (
          <div className="mt-6">
            <Label htmlFor="experience" className="font-semibold">Experience Level</Label>
            {isEditing ? (
              <Input
                id="experience"
                value={editData.experience || ""}
                onChange={e => setEditData({ ...editData, experience: e.target.value })}
                placeholder="e.g., Beginner, Intermediate, Advanced"
                className="mt-1"
              />
            ) : (
              <p className="mt-1 text-gray-700">
                {user.experience || 'Not specified'}
              </p>
            )}
          </div>
        )}

        {user.role === 'recruiter' && (
          <div className="mt-6">
            <Label htmlFor="company" className="font-semibold">Company</Label>
            {isEditing ? (
              <Input
                id="company"
                value={editData.company || ""}
                onChange={e => setEditData({ ...editData, company: e.target.value })}
                placeholder="Company name"
                className="mt-1"
              />
            ) : (
              <p className="mt-1 text-gray-700">
                {user.company || 'Not specified'}
              </p>
            )}
          </div>
        )}

        {/* Skills */}
        <div className="mt-6">
          <Label className="font-semibold">Skills</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {isEditing ? (
              <Input
                value={editData.skills ? editData.skills.join(", ") : ""}
                onChange={e => setEditData({ ...editData, skills: e.target.value.split(",").map(s => s.trim()) })}
                placeholder="Comma-separated skills"
              />
            ) : user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No skills added yet</p>
            )}
          </div>
        </div>

        {/* Achievements/Stats */}
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row gap-4 justify-between mt-8">
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {user.role === 'student' ? '0' : '0'}
            </div>
            <div className="text-sm text-gray-600">
              {user.role === 'student' ? 'Courses Completed' : 'Candidates Hired'}
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {user.role === 'student' ? '0' : '0'}
            </div>
            <div className="text-sm text-gray-600">
              {user.role === 'student' ? 'Certificates Earned' : 'Active Job Posts'}
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-green-600">
              {user.isVerified ? '1' : '0'}
            </div>
            <div className="text-sm text-gray-600">Verifications</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
