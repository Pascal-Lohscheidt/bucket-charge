const CarItem = ({ car }: any) => {
  const batteryLevel = (car.currentRange / car.maximumRange) * 100;
  return (
    <div className={`w-4/5 rounded-md bg-gray-100 flex flex-col h-16 p-2`}>
      <span>{car.name}</span>
      <div className="flex flex-row justify-between">
        <span className="text-sm text-gray-500">{car.carType}</span>
        {batteryLevel <= 40 && (
          <span className="text-sm text-red-400">
            {Number(batteryLevel).toFixed(1)}%
          </span>
        )}
        {batteryLevel >= 40 && (
          <span className="text-sm text-green-500">
            {Number(batteryLevel).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default CarItem;
