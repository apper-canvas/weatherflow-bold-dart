import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ children, onClick, className = '', icon, iconClass = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      {icon && <ApperIcon name={icon} className={`inline ${children ? 'mr-2' : ''} ${iconClass}`} />}
      {children}
    </motion.button>
  );
};

export default Button;