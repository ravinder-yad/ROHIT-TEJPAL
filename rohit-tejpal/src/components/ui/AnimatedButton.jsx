import React from 'react';
import { Link } from 'react-router-dom';

const AnimatedButton = ({ 
  children, 
  to, 
  href, 
  onClick, 
  type = 'button', 
  theme = 'dark', // 'dark', 'light', or 'gold'
  className = '',
  disabled = false,
  fullWidth = false,
  icon = true,
  as = null
}) => {
  
  const themeClasses = {
    dark: 'border-white/30 text-white hover:border-transparent',
    light: 'border-[var(--color-primary-dark)]/30 text-[var(--color-primary-dark)] hover:border-transparent',
    gold: 'border-[var(--color-gold)] text-[var(--color-gold)] hover:border-transparent'
  };

  const textHoverClasses = {
    dark: 'group-hover/btn:text-[var(--color-primary-dark)]',
    light: 'group-hover/btn:text-white',
    gold: 'group-hover/btn:text-[var(--color-primary-dark)]'
  };

  const bgHoverClasses = {
    dark: 'bg-[var(--color-gold)]',
    light: 'bg-[var(--color-primary-dark)]',
    gold: 'bg-[var(--color-gold)]'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  const baseClasses = `group/btn relative inline-flex items-center justify-center overflow-hidden border px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${themeClasses[theme]} ${widthClass} ${disabledClasses} ${className}`;

  const innerContent = (
    <>
      <span className={`relative z-10 flex items-center justify-center gap-3 transition-colors duration-500 ${textHoverClasses[theme]}`}>
        {children}
        {icon && (
          <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1.5 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </span>
      <div className={`absolute inset-0 h-full w-0 transition-all duration-500 ease-out group-hover/btn:w-full z-0 ${bgHoverClasses[theme]}`}></div>
    </>
  );

  if (as === 'span') {
    return (
      <span className={baseClasses}>
        {innerContent}
      </span>
    );
  }

  if (to) {
    return <Link to={to} className={baseClasses}>{innerContent}</Link>;
  }

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>{innerContent}</a>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {innerContent}
    </button>
  );
};

export default AnimatedButton;
