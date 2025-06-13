import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-cloudy flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-8"
        >
          <ApperIcon name="CloudOff" className="w-24 h-24 text-gray-400 mx-auto" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like this page got lost in the clouds. Let's get you back to the weather dashboard.
        </p>
        
        <Button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          icon="Home"
          iconClass="w-5 h-5"
        >
          Back to Dashboard
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;