import GoogleMapReact from 'google-map-react';

type MapProps = {
  width: number;
  height: number;
  zoom: number;
};

const Map = ({ width, height, zoom }: MapProps) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAOZHU9E2RR_QoCF2P7vI976LbQ35F_D5M' }}
      defaultCenter={{
        lat: 10.99835602,
        lng: 77.01502627,
      }}
      defaultZoom={11}
    />
  );
};

export default Map;
