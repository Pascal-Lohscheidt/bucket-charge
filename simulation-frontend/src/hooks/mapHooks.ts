import axios from 'axios';
import { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8080';

export function useCars() {
  const [cars, setCars] = useState([]);
  const [fetchedData, setFetchedData] = useState<boolean>(false);

  useEffect(() => {
    if (!fetchedData) {
      axios
        .get(`${BASE_URL}/api/car`)
        .then((res) => {
          setCars(res.data.allCars.data);
          console.log(res.data.allCars.data);
        })
        .catch((error) => console.log(error));
    }
    setFetchedData(true);
  }, [fetchedData]);

  return cars;
}

export function useStation(type: string) {
  const [stations, setStations] = useState([]);
  const [fetchedData, setFetchedData] = useState<boolean>(false);

  useEffect(() => {
    if (!fetchedData) {
      axios
        .get(`${BASE_URL}/api/station`)
        .then((res) => {
          setStations(
            res.data.allStations.data.filter((s: any) => s.stationType === type)
          );
        })
        .catch((error) => console.log(error));
    }
    setFetchedData(true);
  }, [fetchedData, type]);

  return stations;
}
