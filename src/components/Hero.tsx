
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Award } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600 font-medium">Powered by Blockchain Technology</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Learn. Verify. 
              </span>
              <br />
              <span className="text-gray-900">Get Hired.</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The revolutionary platform that combines course learning with job opportunities, 
              secured by blockchain for unbreakable trust and authentic certificate verification.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform text-lg px-8 py-4"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="hover:scale-105 transition-transform text-lg px-8 py-4"
              >
                Explore Courses
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Shield, title: "Blockchain Verified", desc: "Tamper-proof certificates" },
              { icon: Award, title: "Industry Recognition", desc: "Trusted by top companies" },
              { icon: Sparkles, title: "Career Growth", desc: "Direct job opportunities" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
