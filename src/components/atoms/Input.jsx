import ApperIcon from '@/components/ApperIcon';

const Input = ({ icon, className = '', ...props }) => {
  return (
    <div className="relative w-full">
      {icon && <ApperIcon name={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />}
      <input
        className={`w-full pl-10 pr-4 py-3 glass-effect rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;