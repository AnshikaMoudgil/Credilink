
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech Recruiter",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "CrediLink+ has revolutionized our hiring process. The blockchain verification gives us complete confidence in candidate credentials. No more fake certificates!",
      rating: 5,
      type: "recruiter"
    },
    {
      name: "David Rodriguez",
      role: "Software Engineer",
      company: "Former Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "Completed the Blockchain Development course and got hired within 2 weeks! The certificate verification impressed my employer immediately.",
      rating: 5,
      type: "candidate"
    },
    {
      name: "Emily Watson",
      role: "HR Director",
      company: "Amazon",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "The instant verification feature saves us countless hours. We can trust every certificate from CrediLink+ candidates without additional background checks.",
      rating: 5,
      type: "recruiter"
    },
    {
      name: "Michael Chang",
      role: "Full-Stack Developer",
      company: "Recent Graduate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "The quality of courses is exceptional. The blockchain certificate opened doors I never thought possible. Landed my dream job at a Fortune 500 company!",
      rating: 5,
      type: "candidate"
    },
    {
      name: "Lisa Thompson",
      role: "Talent Acquisition",
      company: "Google",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      content: "CrediLink+ candidates consistently demonstrate higher skill levels. The platform's credibility system has transformed how we evaluate technical talent.",
      rating: 5,
      type: "recruiter"
    },
    {
      name: "James Park",
      role: "AI Engineer",
      company: "Career Changer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      content: "Switched careers from finance to AI with CrediLink+ courses. The blockchain verification gave employers confidence in my new skills. Amazing platform!",
      rating: 5,
      type: "candidate"
    }
  ];

  const recruiterTestimonials = testimonials.filter(t => t.type === "recruiter");
  const candidateTestimonials = testimonials.filter(t => t.type === "candidate");

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what recruiters and candidates say about CrediLink+
          </p>
        </motion.div>

        {/* Recruiters Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-8">
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
              Recruiter Testimonials
            </Badge>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-300 to-transparent ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recruiterTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="h-full bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-blue-400 mb-4" />
                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                          <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Candidates Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-8">
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
              Student Success Stories
            </Badge>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-300 to-transparent ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {candidateTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="h-full bg-gradient-to-br from-purple-50 to-white border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-purple-400 mb-4" />
                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                          <p className="text-sm text-purple-600 font-medium">{testimonial.company}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
