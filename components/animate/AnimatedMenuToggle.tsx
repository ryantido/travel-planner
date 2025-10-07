import { Menu, X } from "lucide-react";
import React from "react";

interface AnimatedIconProps {
  isOpen: boolean;
}

export function AnimatedMenuToggle({ isOpen }: AnimatedIconProps) {
  return (
    <div className="relative w-6 h-6">      
      <Menu
        className={`
          absolute top-0 left-0 w-6 h-6 transition-all
          ${isOpen ? "opacity-0 pointer-events-none animate-[fade-rotate-out_300ms_ease-out]" : "opacity-100 animate-[fade-rotate-in_300ms_ease-in]"}
        `}
      />
      <X
        className={`
          absolute top-0 left-0 w-6 h-6 transition-all
          ${isOpen ? "opacity-100 animate-[fade-rotate-out_300ms_ease-in]" : "opacity-0 pointer-events-none animate-[fade-rotate-out_300ms_ease-in]"}
        `}
      />
    </div>
  );
}
