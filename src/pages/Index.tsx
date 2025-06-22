
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users, Briefcase, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import CourseHighlights from "@/components/CourseHighlights";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <CourseHighlights />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
