import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ForecastCard = ({
  day,
  index, // For animation delay
  formatDate,
  getWeatherIcon,
  getUnitSymbol,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-effect rounded-xl p-4 text-center hover:shadow-lg transition-all duration-200"
    >
<p className="text-sm font-medium text-stone-700 mb-3">
        {formatDate(day.date)}
      </p>
      
      <ApperIcon 
        name={getWeatherIcon(day.condition)} 
        className="w-10 h-10 text-stone-700 mx-auto mb-3" 
      />
      
      <div className="space-y-1">
        <p className="text-lg font-semibold text-stone-800">
          {Math.round(day.tempHigh)}{getUnitSymbol()}
        </p>
        <p className="text-sm text-stone-600">
          {Math.round(day.tempLow)}{getUnitSymbol()}
        </p>
      </div>
      
      {day.precipitation > 0 && (
        <div className="flex items-center justify-center mt-2">
          <ApperIcon name="Droplets" className="w-3 h-3 text-blue-500 mr-1" />
          <span className="text-xs text-stone-600">{day.precipitation}%</span>
        </div>
      )}
    </motion.div>
  );
};

export default ForecastCard;