import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import RoleSelector from "@/components/RoleSelector";
import AuthMethods from "@/components/AuthMethods";
import WalletConnector from "@/components/WalletConnector";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { login, loginWithOAuth, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleWalletSignup = async (walletId: string) => {
    if (selectedRole) {
      await login(walletId, selectedRole);
      navigate('/profile');
    }
  };

  const handleOAuthSignup = async (provider: 'google' | 'github') => {
    if (selectedRole) {
      await loginWithOAuth(provider, selectedRole);
      navigate('/profile');
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center space-y-4">
            <motion.div
              className="flex justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold">Join CrediLink+</CardTitle>
            <CardDescription className="text-gray-600">
              Start your Web3 learning journey with blockchain-verified credentials
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!selectedRole ? (
              <RoleSelector
                onRoleSelect={handleRoleSelect}
                title="Choose Your Path"
                description="How do you want to use CrediLink+?"
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <button onClick={handleBack} className="text-gray-500 hover:text-gray-700">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-gray-600">
                    Signing up as {selectedRole}
                  </span>
                </div>
                
                <WalletConnector
                  onWalletSelect={() => {
                    if (selectedRole) login(selectedRole);
                  }}
                  isLoading={isLoading}
                  role={selectedRole}
                />
              </div>
            )}

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
