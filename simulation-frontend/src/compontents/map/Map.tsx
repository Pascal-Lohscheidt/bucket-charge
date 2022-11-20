import { useEffect, useState } from 'react';
import useScript from '../../hooks/useScript';
import { useCars, useStation } from '../../hooks/mapHooks';
import { carIcon, chargingStationIcon, warehouseIcon } from './icons';

type MapProps = {
  selectStation: (station: any) => void;
  selectedBooking: any;
};

const GOOGLE_KEY = 'AIzaSyCylOoTb8pEjHGRPhUK2BNIfyxAOzf2cK8';

const Map = ({ selectStation, selectedBooking }: MapProps) => {
  useScript(
    `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&callback=initMap&v=weekly`
  );
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
          const marker = new google.maps.Marker({
            position: { lat: station.positionLat, lng: station.positionLong },
            icon: warehouseIcon(new google.maps.Point(15, 30)),
            map: window.map,
          });
          google.maps.event.addListener(marker, 'click', () =>
            selectStation(station)
          );

          return marker;
        })
      );
    }

    if (chargingStations.length > 0) {
      setChargingMarkers(
        chargingStations.map((station) => {
          // The marker, positioned at Uluru
          const marker = new google.maps.Marker({
            position: { lat: station.positionLat, lng: station.positionLong },
            icon: chargingStationIcon(new google.maps.Point(15, 30)),
            map: window.map,
          });
          google.maps.event.addListener(marker, 'click', () =>
            selectStation(station)
          );

          return marker;
        })
      );
    }

    if (
      cars
        .filter((car: any) => !!car.parkedAt)
        .filter((car: any) => car.parkedAt.stationType === 'Other').length > 0
    ) {
      setChargingMarkers(
        cars.map((station: any) => {
          // The marker, positioned at Uluru
          const marker = new google.maps.Marker({
            position: {
              lat: station.parkedAt.positionLat,
              lng: station.parkedAt.positionLong,
            },
            icon: carIcon(new google.maps.Point(15, 30)),
            map: window.map,
          });

          return marker;
        })
      );
    }
  }, [sixtStations, chargingStations, cars]);

  useEffect(() => {
    if (!!selectedBooking) {
      const routeService = window.directionsService;
      const routeRenderer = window.directionsRenderer;
      var start = `${selectedBooking.startPosition.lat},${selectedBooking.startPosition.long}`;
      var waypoints = selectedBooking.waypoints.data.map((w: any) => ({
        location: `${w.positionLat},${w.positionLong}`,
      }));
      var end = waypoints[waypoints.length - 1].location;
      waypoints.splice(-1, 1);
      var request: any = {
        origin: start,
        destination: end,
        waypoints: waypoints,
        travelMode: 'DRIVING',
      };

      console.log(request);
      routeService.route(request, function (result, status) {
        if (status === 'OK') {
          routeRenderer.setDirections(result);
        }
      });
    }
  }, [selectedBooking]);

  return (
    <>
      <div className="h-full w-full rounded-md" id="map"></div>
    </>
  );
};

export default Map;

// Initialize and add the map
function initMap(): void {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  // The location of Munich
  //const munich = { lat: 48.164405, lng: 11.574318 };
  const LA = { lat: 33.94662, lng: -118.09963 };
  // The map, centered at Uluru
  const map = new google.maps.Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 10,
      center: LA,
      disableDefaultUI: true,
    }
  );
  directionsRenderer.setMap(map);

  // The marker, positioned at Uluru
  /*const marker = new google.maps.Marker({
    position: LA,
    map: map,
  });*/
  window.map = map;
  window.directionsService = directionsService;
  window.directionsRenderer = directionsRenderer;
}

declare global {
  interface Window {
    initMap: () => void;
    map: google.maps.Map;
    directionsService: google.maps.DirectionsService;
    directionsRenderer: google.maps.DirectionsRenderer;
  }
}
window.initMap = initMap;
