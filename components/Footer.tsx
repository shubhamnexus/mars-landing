import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

// Animation variants
const buttonHover = {
  rest: { 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
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

const ButtonWithArrow = ({ 
  children, 
  className = "", 
  onClick = () => {}
}: { 
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={buttonHover}
      className="relative"
    >
      <Button 
        className={`
          group relative overflow-hidden bg-mars-red hover:bg-mars-red/90 text-white
          transition-all duration-300
          ${className}
          before:absolute before:inset-0 
          before:bg-gradient-to-r before:from-white/0 before:to-white/10
          before:translate-x-[-100%] before:hover:translate-x-0
          before:transition-transform before:duration-300
          hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          active:scale-[0.98]
        `}
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

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#383838] text-white py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="flex flex-col max-w-xs mx-auto md:mx-0">
            <div className="mb-8">
              <img 
                src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/MARS-white-1.webp"
                alt="Mars Logo"
                className="h-32 object-contain mb-6"
              />
              <h3 className="text-2xl font-bold mb-3"></h3>
              <p className="text-gray-400 text-lg mb-6">
                Optimize Your Development Team with MARS Solutions Group
              </p>
              <ButtonWithArrow 
                className="w-full"
                onClick={() => {
                  console.log('Button clicked');
                  const contactSection = document.getElementById('contact-form');
                  console.log('Contact section found:', contactSection);
                  if (contactSection) {
                    const headerOffset = 80;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    console.log('Scrolling to position:', offsetPosition);
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  } else {
                    console.log('Contact section not found');
                  }
                }}
              >
                Get in Touch Today!
              </ButtonWithArrow>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Awards Section */}
          <div className="flex flex-col items-center justify-start col-span-1 mx-auto md:mx-0">
            <h3 className="text-2xl font-bold mb-10 text-center">Our Awards</h3>
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="bg-white p-1.5 rounded flex items-center justify-center">
                <img 
                  src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/DISABILITY.png" 
                  alt="Disability Award" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="bg-white p-1.5 rounded flex items-center justify-center">
                <img 
                  src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/NMSDC.png" 
                  alt="NMSDC Award" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="bg-white p-1.5 rounded flex items-center justify-center">
                <img 
                  src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/BizTimesMedia-1.png" 
                  alt="BizTimes Media Award" 
                  className="h-16 object-contain"
                />
              </div>
              <div className="bg-white p-1.5 rounded flex items-center justify-center">
                <img 
                  src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/WBENC-1.png" 
                  alt="WBENC Award" 
                  className="h-16 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-end mx-auto md:mx-0">
            <h3 className="text-2xl font-bold mb-6">Contact</h3>
            <ul className="space-y-3 text-right">
              <li className="text-gray-400 text-lg">1433 North Water Street, Suite 400</li>
              <li className="text-gray-400 text-lg">Milwaukee, WI 53202</li>
              <li className="text-gray-400 text-lg">info@marssg.com</li>
              <li className="text-gray-400 text-lg">(877) 627-7481</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mars Job Board. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 