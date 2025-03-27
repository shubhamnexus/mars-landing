"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { 
  CheckCircle, 
  Code, 
  Database, 
  Globe, 
  Server, 
  Users, 
  MoveRight,
  Briefcase,
  Award,
  Scale,
  Headphones
} from "lucide-react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import Footer from "@/components/Footer"
import { ContactForm } from "@/components/ContactForm"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const buttonHover = {
  rest: { 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smooth animation
    }
  },
  hover: { 
    scale: 1.01,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
}

const buttonTextHover = {
  rest: { 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: { 
    y: -2,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
}

const arrowMotion = {
  rest: { 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    x: 4,
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
}

interface ButtonWithArrowProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const ButtonWithArrow = ({ 
  children, 
  variant = "default", 
  className = "", 
  size = "default",
  type = "button",
  disabled = false,
  onClick
}: ButtonWithArrowProps) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={buttonHover}
      className="relative"
    >
      <Button 
        variant={variant} 
        size={size}
        type={type}
        className={`
          group relative overflow-hidden
          transition-all duration-300
          ${className}
          before:absolute before:inset-0 
          before:bg-gradient-to-r before:from-white/0 before:to-white/10
          before:translate-x-[-100%] before:hover:translate-x-0
          before:transition-transform before:duration-300
          hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          active:scale-[0.98]
        `}
        disabled={disabled}
        onClick={onClick}
      >
        <motion.span 
          className="relative flex items-center gap-2 z-10"
          variants={buttonTextHover}
        >
          <motion.span
            className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:origin-bottom-left group-hover:after:scale-x-100"
          >
            {children}
          </motion.span>
          <motion.span
            variants={arrowMotion}
            className="relative inline-block"
          >
            <MoveRight className="h-4 w-4 transition-colors duration-300" />
          </motion.span>
        </motion.span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ 
            opacity: 1, 
            scale: 2,
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          style={{ 
            originX: 0.5,
            originY: 0.5,
            rotate: -45
          }}
        />
      </Button>
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-white/20 to-transparent opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2">
            <div className="relative h-12 w-[140px]">
              <Image
                src="/images/mars-logo.webp"
                alt="MARS Solutions Group Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 120px, 140px"
                priority
              />
            </div>
          </motion.div>
          <nav className="hidden md:flex gap-6">
            {["Services", "Benefits", "Case Study", "Contact"].map((item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.1, color: "#E31837" }}
                href={`#${item.toLowerCase().replace(" ", "-") === "contact" ? "contact-form" : item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-navy-blue transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <ButtonWithArrow 
            className="bg-mars-red hover:bg-mars-red/90 text-white"
            onClick={() => {
              const formSection = document.querySelector('.transform-section');
              if (formSection) {
                const yOffset = -80;
                const y = formSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({
                  top: y,
                  behavior: 'smooth'
                });
              }
            }}
          >
            Schedule Consultation
          </ButtonWithArrow>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-24 lg:py-32 bg-gradient-to-br from-navy-blue/5 to-mars-red/5 overflow-hidden">
          {/* Background decorative elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-mars-red/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-navy-blue/10 rounded-full blur-3xl"></div>
          </motion.div>
          
          <div className="container relative grid gap-8 md:grid-cols-2 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="space-y-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-2 bg-mars-red/10 rounded-full">
                <span className="text-mars-red font-medium">Transform Your Development Team</span>
              </motion.div>
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy-blue leading-tight">
                Hire Top Developers at <span className="text-mars-red relative">
                  30% Lower Costs
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-mars-red/20 rounded-full"></span>
                </span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-700 max-w-xl">
                Access pre-vetted tech talent ready to integrate seamlessly into your team without sacrificing quality.
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4">
                <ButtonWithArrow 
                  variant="outline"
                  className="border-2 border-navy-blue text-navy-blue hover:bg-navy-blue/5 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto" 
                  size="lg"
                  onClick={() => {
                    const targetSection = document.getElementById('contact-form');
                    if (targetSection) {
                      const headerOffset = 100;
                      const elementPosition = targetSection.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Learn More
                </ButtonWithArrow>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <video
                src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/MARS%20VIDEO%20(Video).mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Core Competencies */}
        <section id="services" className="relative py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-mars-red/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-blue/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-mars-red/10 to-navy-blue/10 rounded-full blur-3xl opacity-50"></div>
          </div>

          <div className="container relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-2 bg-mars-red/10 rounded-full mb-6"
              >
                <span className="text-mars-red font-medium">Our Expertise</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6 bg-clip-text text-transparent bg-gradient-to-r from-navy-blue to-mars-red">
                Core Competencies
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Our specialized developers bring expertise across the entire technology stack, 
                delivering innovative solutions that drive your business forward.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Code className="h-8 w-8 text-mars-red" />,
                  title: "Full-Stack Development",
                  description: "Building complex web and mobile applications requires a combination of skills across the entire tech stack. Our highly skilled full-stack developers seamlessly integrate into your team.",
                  gradient: "from-blue-500/10 to-purple-500/10"
                },
                {
                  icon: <Server className="h-8 w-8 text-mars-red" />,
                  title: "Front-End & Back-End Development",
                  description: "Whether you're developing intuitive user interfaces or robust back-end systems, our specialized developers excel in creating scalable, efficient applications.",
                  gradient: "from-red-500/10 to-orange-500/10"
                },
                {
                  icon: <Globe className="h-8 w-8 text-mars-red" />,
                  title: "Cloud & DevOps Solutions",
                  description: "Our developers bring experience in cloud platforms like AWS, Azure, and Google Cloud, ensuring your applications are built with security, scalability, and efficiency in mind.",
                  gradient: "from-green-500/10 to-blue-500/10"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="relative border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full overflow-hidden group">
                    {/* Card background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <CardContent className="relative p-8 space-y-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="h-16 w-16 rounded-2xl bg-mars-red/10 flex items-center justify-center group-hover:bg-mars-red/20 transition-colors duration-300"
                      >
                        {item.icon}
                      </motion.div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-navy-blue group-hover:text-mars-red transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-mars-red to-transparent"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-mars-red/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-blue/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-2 bg-mars-red/10 rounded-full mb-6"
              >
                <span className="text-mars-red font-medium">Business Benefits</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6">
                Streamlined Operations,{" "}
                <span className="relative">
                  Reduced Overhead
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-mars-red/20 rounded-full"></span>
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Our staff augmentation services provide multiple advantages for your business
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Efficiency",
                  description: "Integrate top-tier developers quickly, reducing time-to-hire and accelerating project timelines.",
                  icon: "⚡"
                },
                {
                  title: "Scalability",
                  description: "Quickly scale up or down based on project needs without long-term commitment.",
                  icon: "📈"
                },
                {
                  title: "Cost-Effective",
                  description: "Avoid the overhead of full-time hires while getting access to highly skilled developers.",
                  icon: "💰"
                },
                {
                  title: "Precision",
                  description: "Focus on achieving your business goals with developers who bring the right skills to your team.",
                  icon: "🎯"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-mars-red/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-mars-red/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-navy-blue mb-4 group-hover:text-mars-red transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section id="case-study" className="py-16 md:py-24 bg-navy-blue text-white">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World Impact</h2>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">Client Success with MARS Staff Augmentation</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white/5 via-white/10 to-transparent backdrop-blur-sm p-8 rounded-xl max-w-3xl mx-auto border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-lg mb-6">
                After partnering with MARS Solutions Group, our client, a leading tech firm, was able to fill critical
                development roles in just two weeks. This resulted in a 30% reduction in project delays, improved team
                productivity, and more efficient use of their internal resources.
              </p>
              <motion.div className="flex justify-center">
                <a 
                  href="https://drive.google.com/file/d/129HmwGNUWEgMRFbAg3IjChQ-1wKb7Iu9/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <ButtonWithArrow 
                    variant="outline" 
                    className="border border-white/30 text-white bg-transparent hover:bg-white/5 hover:border-white/50 transition-all duration-300"
                  >
                    View Full Case Study
                  </ButtonWithArrow>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
          <div className="container relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-2 bg-mars-red/10 rounded-full mb-6"
              >
                <span className="text-mars-red font-medium">Get in Touch</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6">
                Submit Your Inquiry
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Why MARS Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-mars-red/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-blue/5 rounded-full blur-3xl"></div>
          </div>

          <div className="container relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-2 bg-mars-red/10 rounded-full mb-6"
              >
                <span className="text-mars-red font-medium">Our Advantages</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy-blue mb-6">
                Why MARS Solutions Group?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Briefcase className="h-8 w-8 text-mars-red" />,
                  title: "Industry Expertise",
                  description: "Over 10+ years of experience in staffing top-tier developers",
                  gradient: "from-blue-500/10 to-purple-500/10"
                },
                {
                  icon: <Award className="h-8 w-8 text-mars-red" />,
                  title: "Proven Results",
                  description: "Proven results across tech, finance, and healthcare industries",
                  gradient: "from-red-500/10 to-orange-500/10"
                },
                {
                  icon: <Scale className="h-8 w-8 text-mars-red" />,
                  title: "Scalable Solutions",
                  description: "Fully scalable and adaptable talent solutions for all project sizes",
                  gradient: "from-green-500/10 to-blue-500/10"
                },
                {
                  icon: <Headphones className="h-8 w-8 text-mars-red" />,
                  title: "Expert Support",
                  description: "Ongoing support and consultation from industry experts",
                  gradient: "from-purple-500/10 to-pink-500/10"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-mars-red/20 overflow-hidden">
                    {/* Card background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative space-y-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="h-16 w-16 rounded-2xl bg-mars-red/10 flex items-center justify-center group-hover:bg-mars-red/20 transition-colors duration-300 mx-auto"
                      >
                        {item.icon}
                      </motion.div>
                      <div className="space-y-4 text-center">
                        <h3 className="text-xl font-semibold text-navy-blue group-hover:text-mars-red transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-mars-red to-transparent"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

