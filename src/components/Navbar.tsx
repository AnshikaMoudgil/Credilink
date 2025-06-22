import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CrediLink+
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <div className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </Link>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="hover:scale-105 transition-transform">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <a href="#features" className="block px-3 py-2 text-gray-700">Features</a>
              <a href="#courses" className="block px-3 py-2 text-gray-700">Courses</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700">Testimonials</a>
              
              {user ? (
                <div className="px-3 pt-2 space-y-2 border-t">
                  <Link to="/profile">
                    <div className="flex items-center space-x-2 py-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                    </div>
                  </Link>
                  <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-3 pt-2">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
