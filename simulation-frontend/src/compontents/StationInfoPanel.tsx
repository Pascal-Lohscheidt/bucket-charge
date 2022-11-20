import CarItem from './CarItem';

const StationInfoPanel = ({ station }: any) => {
  return (
    <div className="w-full h-full flex-row flex-wrap">
      {station?.cars?.data.map((car: any, index: number) => (
        <CarItem key={index} car={car} />
      ))}
    </div>
  );
};

export default StationInfoPanel;
