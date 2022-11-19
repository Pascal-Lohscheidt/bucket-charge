import { useState } from 'react';
import Map from './compontents/map/Map';
import MovingCarPanel from './compontents/MovingCarPanel';
import StationInfoPanel from './compontents/StationInfoPanel';

function App() {
  const [currentStation, selectStation] = useState<any>();

  return (
    <div className="w-full h-screen bg-white p-4 grid grid-cols-app grid-rows-app">
      <div className="bg-sixt-500 w-fit px-4 z-20 h-16 rounded-full text-white font-extrabold text-lg flex justify-center items-center shadow-lg fixed">
        <span>Sixt Admin Panel</span>
      </div>
      <div className="w-full h-96 col-span-1 col-start-1">
        <Map
          selectStation={selectStation}
          filterChargingStations={false}
          filterSixtStations={false}
        />
      </div>
      <div className="row-start-1 row-span-2 col-start-2 col-span-1 space-y-2 flex flex-col items-center">
        <MovingCarPanel />
      </div>
      <div className="row-start-2 row-span-1 col-start-1 col-span-1">
        <StationInfoPanel station={currentStation} />
      </div>
    </div>
  );
}

export default App;
