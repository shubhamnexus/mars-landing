"use client"

import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"

interface ScrollToSectionProps {
  children: React.ReactNode;
  sectionId: string;
  className?: string;
}

export function ScrollToSection({ children, sectionId, className = "" }: ScrollToSectionProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const section = document.getElementById(sectionId);
      if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <Button 
      className={`
        group relative flex items-center gap-2
        transition-all duration-300
        ${className}
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        active:scale-[0.98]
      `}
      onClick={handleClick}
    >
      <span>{children}</span>
      <MoveRight className="h-4 w-4 transition-colors duration-300" />
    </Button>
  )
} 