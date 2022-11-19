import { useCars } from '../hooks/mapHooks';

const CarItem = ({ car }: any) => {
  const batteryLevel = (car.currentRange / car.maximumRange) * 100;
  return (
    <div className="w-4/5 rounded-md shadow-md flex flex-col h-16 p-2">
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

const MovingCarPanel = () => {
  const cars: any[] = useCars();

  return (
    <>
      <h1 className="text-xl">Moving Cars</h1>
      {cars
        .filter((car) => car.carMode === 'Moving')
        .map((car, index) => (
          <CarItem key={index} car={car} />
        ))}
    </>
  );
};

export default MovingCarPanel;
