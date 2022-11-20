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
  const [bookings, setBookings] = useState<any[]>([]);
  const [dataFeteched, setDataFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!dataFeteched) {
      setDataFetched(true);
      axios
        .get('http://localhost:8080/api/booking')
        .then((res) => {
          setBookings(res.data.allBookings.data);
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
