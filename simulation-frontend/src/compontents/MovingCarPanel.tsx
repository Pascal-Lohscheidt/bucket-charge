import { useCars } from '../hooks/mapHooks';
import CarItem from './CarItem';

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
