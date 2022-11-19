import './App.css';
import Map from './compontents/Map';

function App() {
  return (
    <div className="w-full h-screen bg-white p-4">
      <div className="bg-sixt-500 w-fit px-4 h-16 rounded-full text-white font-extrabold text-lg flex justify-center items-center shadow-lg fixed">
        <span>Sixt Admin Panel</span>
      </div>
      <div className="w-full h-96">
        <Map width={600} height={500} zoom={10} />
      </div>
    </div>
  );
}

export default App;
