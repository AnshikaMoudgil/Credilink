
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

const CourseHighlights = () => {
  const courses = [
    {
      title: "Blockchain Development Mastery",
      description: "Master smart contracts, DeFi protocols, and Web3 development",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=240&fit=crop",
      rating: 4.9,
      students: 2500,
      duration: "12 weeks",
      price: "$299",
      category: "Development",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "AI & Machine Learning Engineer",
      description: "Build intelligent systems with Python, TensorFlow, and PyTorch",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop",
      rating: 4.8,
      students: 3200,
      duration: "16 weeks",
      price: "$399",
      category: "AI/ML",
      gradient: "from-green-500 to-teal-600"
    },
    {
      title: "Full-Stack Web Development",
      description: "Complete MERN stack development with modern practices",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop",
      rating: 4.7,
      students: 4100,
      duration: "20 weeks",
      price: "$349",
      category: "Web Dev",
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Cloud Architecture & DevOps",
      description: "Master AWS, Docker, Kubernetes, and CI/CD pipelines",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=240&fit=crop",
      rating: 4.9,
      students: 1800,
      duration: "14 weeks",
      price: "$379",
      category: "DevOps",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Courses
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry experts and get blockchain-verified certificates upon completion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.gradient} opacity-20`} />
                  <Badge className="absolute top-4 left-4 bg-white text-gray-900">
                    {course.category}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${course.gradient} hover:scale-105 transition-transform`}>
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            size="lg"
            className="hover:scale-105 transition-transform"
          >
            View All Courses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseHighlights;
