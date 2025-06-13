import ApperIcon from '@/components/ApperIcon';

const WeatherDetailItem = ({ iconName, iconClass, label, value }) => {
  return (
<div className="glass-effect rounded-lg p-4 text-center">
      <ApperIcon name={iconName} className={`w-6 h-6 mx-auto mb-2 ${iconClass}`} />
      <p className="text-sm text-stone-600">{label}</p>
      <p className="text-lg font-semibold text-stone-800">{value}</p>
    </div>
  );
};

export default WeatherDetailItem;