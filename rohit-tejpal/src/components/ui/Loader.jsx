import React from 'react';

const Loader = ({ fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-primary-dark)]" 
    : "w-full flex justify-center items-center py-24 md:py-32";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center justify-center gap-8">
        
        {/* Brand Logo - "Lotus" */}
        <div className="relative w-32 h-auto flex items-center justify-center animate-pulse duration-[2000ms]">
          <img 
            src="/images/logo_horizontal_transparent.png" 
            alt="Rohit Tejpal Logo" 
            className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
        </div>
        
        {/* Loading Text & Bar */}
        <div className="flex flex-col items-center gap-3 w-48">
          <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.4em] font-medium opacity-80 animate-pulse">
            Loading
          </span>
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-[var(--color-gold)] rounded-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
        
      </div>
      
      {/* CSS Animation for loading bar */}
      <style>{`
        @keyframes progress {
          0% { left: -33%; }
          50% { left: 100%; }
          100% { left: -33%; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
