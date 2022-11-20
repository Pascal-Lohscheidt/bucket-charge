import axios from 'axios';
import { useEffect, useState } from 'react';

const BookingCard = ({ booking, click, selected }: any) => {
  return (
    <div
      onClick={click}
      className={` h-14 rounded-md p-1 flex flex-row justify-between ${
        selected ? 'bg-gray-200' : 'bg-gray-100'
      }`}
    >
      <div className="flex flex-col h-full">
        <span>{booking.car.name}</span>
        <span className="text-gray-400">{booking.distance}</span>
      </div>
      <div className="flex flex-col h-full">
        <span className="text-gray-400">{booking.startDate}</span>
        <span className="text-gray-400">{booking.startDate}</span>
      </div>
    </div>
  );
};

const BookingPanel = ({ selectBooking, selectedBooking }: any) => {
  const [bookings, setBookings] = useState<any[]>([
    {
      _id: '348797388440207564',
      endDate: 1668818607,
      car: { name: 'Mercedes' },
      startPosition: {
        lat: 33.799718,
        long: -117.889326,
      },
      incentiveUsed: true,
      startDate: 1668732207,
      distance: 50.5,
      waypoints: {
        data: [
          {
            positionLat: 33.807127,
            positionLong: -118.145908,
            chargingSlots: 1,
            stationType: 'SixtStation',
          },
          {
            positionLat: 33.943021,
            positionLong: -118.401891,
            chargingSlots: 3,
            stationType: 'Other',
          },
        ],
      },
    },
    {
      _id: '348797388440207563',
      endDate: 1668818607,
      car: { name: 'Mercedes' },
      startPosition: {
        lat: 33.799718,
        long: -117.889326,
      },
      incentiveUsed: true,
      startDate: 1668732207,
      distance: 50.5,
      waypoints: {
        data: [
          {
            positionLat: 33.978546,
            positionLong: -117.461845,
            chargingSlots: 7,
            stationType: 'SixtStation',
          },
          {
            positionLat: 33.943021,
            positionLong: -118.401891,
            chargingSlots: 3,
            stationType: 'Other',
          },
        ],
      },
    },
  ]);
  const [dataFeteched, setDataFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!dataFeteched) {
      setDataFetched(true);
      axios
        .get('http://localhost:8080/api/booking')
        .then((res) => {
          setBookings(res.data.allBookings);
        })
        .catch((error) => console.log(error));
    }
  }, [dataFeteched]);

  return (
    <div className="w-full h-full flex flex-col p-1 space-y-2 overflow-scroll box-border">
      {bookings.map((booking, index) => (
        <BookingCard
          selected={booking._id === selectedBooking?._id}
          booking={booking}
          key={index}
          click={() => selectBooking(booking)}
        />
      ))}
    </div>
  );
};

export default BookingPanel;
