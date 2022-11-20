import { useState } from 'react';
import BookingPanel from './compontents/BookingPanel';
import Map from './compontents/map/Map';
import MovingCarPanel from './compontents/MovingCarPanel';
import StationInfoPanel from './compontents/StationInfoPanel';

const TabButton = ({ active, children, click }: any) => {
  const acitveClass = 'bg-sixt-500 text-white px-2 h-11 rounded-lg';
  const normalClass = 'hover:bg-gray-100 h-11 px-2 rounded-lg';

  return (
    <button onClick={click} className={active ? acitveClass : normalClass}>
      {children}
    </button>
  );
};

const MENUS = ['Bookings', 'Active', 'Inactive'];

function App() {
  const [currentStation, selectStation] = useState<any>();
  const [selectedMenu, selectMenu] = useState<string>('Active');
  const [selectedBooking, selectBooking] = useState<any>();

  return (
    <div className="w-full h-screen bg-white p-1 relative">
      <div className="bg-sixt-500 w-fit px-4 z-20 h-16 rounded-full text-white font-extrabold text-lg flex justify-center items-center shadow-lg absolute top-4 left-4">
        <span>Sixt Admin Panel</span>
      </div>
      {/* Overlay Content */}
      <div
        className="absolute top-0 left-0 w-full h-screen max-h-screen box-border
                      grid grid-cols-app grid-rows-app"
      >
        <div className="row-start-1 row-span-1 col-start-2 col-span-1 z-30 p-3 w-full h-full box-border">
          <div className="bg-white rounded-lg w-full h-full flex flex-row justify-around items-center shadow-md">
            {MENUS.map((menu, index) => (
              <TabButton
                key={index}
                click={() => selectMenu(menu)}
                active={selectedMenu === menu}
              >
                {menu}
              </TabButton>
            ))}
          </div>
        </div>
        <div className="row-start-2 row-span-1 col-start-2 col-span-1 z-30 p-3 box-border overflow-hidden">
          <div className="rounded-lg bg-white shadow-md w-full h-full box-border overflow-hidden">
            {selectedMenu === 'Inactive' && (
              <StationInfoPanel station={currentStation} />
            )}
            {selectedMenu === 'Active' && <MovingCarPanel />}
            {selectedMenu === 'Bookings' && (
              <BookingPanel
                selectBooking={selectBooking}
                selectedBooking={selectedBooking}
              />
            )}
          </div>
        </div>
      </div>
      <Map selectStation={selectStation} selectedBooking={selectedBooking} />
    </div>
  );
}

export default App;
