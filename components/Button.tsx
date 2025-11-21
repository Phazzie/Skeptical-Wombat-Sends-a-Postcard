import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  // Base: Bold border, hard shadow, uppercase text
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-display font-bold tracking-wide transition-all duration-200 border-2 border-black focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0";
  
  // Animation: Lift up and grow shadow on hover, press down on active
  const animationStyles = "hover:-translate-y-1 hover:shadow-neo-hover active:translate-y-0 active:shadow-none shadow-neo";

  const variants = {
    primary: "bg-pop-purple text-white hover:bg-purple-500",
    secondary: "bg-white text-black hover:bg-gray-50",
    accent: "bg-pop-yellow text-black hover:bg-yellow-300",
    ghost: "bg-transparent border-transparent shadow-none hover:bg-slate-100 hover:shadow-none hover:translate-y-0 text-slate-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  // Ghost doesn't get the hard shadow treatment
  const finalStyles = variant === 'ghost' 
    ? `${baseStyles} ${variants[variant]} ${className}`.replace('border-2 border-black', '')
    : `${baseStyles} ${variants[variant]} ${animationStyles} ${className}`;

  return (
    <button 
      className={finalStyles} 
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Working...
        </>
      ) : children}
    </button>
  );
};