"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"

export function VideoPlayer() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8"
    >
      {/* Text Content */}
      <motion.div
        animate={isVideoOpen ? 
          { 
            x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : -100,
            y: typeof window !== 'undefined' && window.innerWidth < 768 ? -50 : 0 
          } : 
          { x: 0, y: 0 }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`bg-gradient-to-br from-white/5 via-white/10 to-transparent backdrop-blur-sm p-4 md:p-8 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 ${isVideoOpen ? 'md:col-span-1' : 'md:col-span-2'}`}
      >
        <div className={`max-w-2xl mx-auto ${isVideoOpen ? 'md:max-w-none' : ''}`}>
          <p className="text-base md:text-lg mb-6">
            After partnering with MARS Solutions Group, our client, a leading tech firm, was able to fill critical
            development roles in just two weeks. This resulted in a 30% reduction in project delays, improved team
            productivity, and more efficient use of their internal resources.
          </p>
        </div>
      </motion.div>

      {/* Video Content */}
      <motion.div
        initial={{ opacity: 0, x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 100, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 0 }}
        animate={isVideoOpen ? 
          { opacity: 1, x: 0, y: 0 } : 
          { opacity: 0, x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 100, y: typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 0 }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`relative w-full transition-all duration-300 ${isVideoOpen ? 'block' : 'hidden'}`}
      >
        <div className="relative w-full bg-gradient-to-br from-white/5 via-white/10 to-transparent backdrop-blur-sm p-4 md:p-8 rounded-xl border border-white/10 shadow-lg">
          <div className="relative w-full aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full rounded-lg object-cover"
              controls
              autoPlay
              playsInline
              disablePictureInPicture
              controlsList="nodownload"
              src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/MARS/MARSCaseStudy1.mp4"
            />
            <button
              onClick={handleCloseVideo}
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-mars-red text-white rounded-full p-2 hover:bg-mars-red/90 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 