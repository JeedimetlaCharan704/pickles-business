import { motion } from 'framer-motion';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-accent hover:bg-accent-dark text-primary shadow-soft hover:shadow-medium',
    secondary: 'bg-primary hover:bg-primary-light text-white shadow-soft hover:shadow-medium',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-primary',
    ghost: 'text-gray-600 hover:text-primary hover:bg-gray-100',
    danger: 'bg-danger hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
};
