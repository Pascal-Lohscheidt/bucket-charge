import { useEffect, useState } from 'react';
import useScript from '../../hooks/useScript';
import { useCars, useStation } from '../../hooks/mapHooks';
import { chargingStationIcon, warehouseIcon } from './icons';

type MapProps = {
  filterSixtStations: boolean;
  filterChargingStations: boolean;
};

const GOOGLE_KEY = 'AIzaSyCylOoTb8pEjHGRPhUK2BNIfyxAOzf2cK8';

const Map = ({ filterChargingStations, filterSixtStations }: MapProps) => {
  const sixtStations: any[] = useStation('SixtStation');
  const chargingStations: any[] = useStation('ChargingStation');
  const [sixtMarkers, setSixtMarkers] = useState<any>();
  const [chargingMarkers, setChargingMarkers] = useState<any>();
  const cars = useCars();

  useEffect(() => {
    if (sixtStations.length > 0) {
      setSixtMarkers(
        sixtStations.map((station: any) => {
          // The marker, positioned at Uluru
          new google.maps.Marker({
            position: { lat: station.positionLat, lng: station.positionLong },
            icon: warehouseIcon(new google.maps.Point(15, 30)),
            map: window.map,
          });
          return station;
        })
      );
    }

    if (chargingStations.length > 0) {
      setChargingMarkers(
        chargingStations.map((station) => {
          // The marker, positioned at Uluru
          new google.maps.Marker({
            position: { lat: station.positionLat, lng: station.positionLong },
            icon: chargingStationIcon(new google.maps.Point(15, 30)),
            map: window.map,
          });
          return station;
        })
      );
    }
  }, [sixtStations, chargingStations]);

  useScript(
    `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&callback=initMap&v=weekly`
  );

  return (
    <>
      <div className="h-full w-full" id="map"></div>
    </>
  );
};

export default Map;

// Initialize and add the map
function initMap(): void {
  // The location of Munich
  //const munich = { lat: 48.164405, lng: 11.574318 };
  const LA = { lat: 33.94662, lng: -118.09963 };
  // The map, centered at Uluru
  const map = new google.maps.Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 10,
      center: LA,
    }
  );

  // The marker, positioned at Uluru
  /*const marker = new google.maps.Marker({
    position: LA,
    map: map,
  });*/
  window.map = map;
}

declare global {
  interface Window {
    initMap: () => void;
    map: google.maps.Map;
  }
}
window.initMap = initMap;
