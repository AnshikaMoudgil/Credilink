
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase } from "lucide-react";
import { UserRole } from "@/contexts/AuthContext";

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
  title: string;
  description: string;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect, title, description }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Student</CardTitle>
              <CardDescription>
                Learn new skills, earn certificates, and showcase your achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => onRoleSelect('student')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
              >
                Continue as Student
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Recruiter</CardTitle>
              <CardDescription>
                Find verified talent and build your dream team with blockchain-verified skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => onRoleSelect('recruiter')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700"
              >
                Continue as Recruiter
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelector;
