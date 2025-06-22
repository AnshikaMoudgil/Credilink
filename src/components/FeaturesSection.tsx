
import { motion } from "framer-motion";
import { Shield, Users, Award, Briefcase, BookOpen, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Premium Courses",
      description: "Access industry-leading courses designed by experts",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Certificates secured by immutable blockchain technology",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Verified Credentials",
      description: "Employers can instantly verify your achievements",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Briefcase,
      title: "Job Matching",
      description: "Get matched with relevant job opportunities",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with peers and industry professionals",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: CheckCircle,
      title: "Instant Verification",
      description: "Real-time certificate authenticity checks",
      color: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose CrediLink+?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of learning and career development with our blockchain-powered platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="h-full bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
