import axios from 'axios';

export const createBookingForRoute = (startLong: number, startLat: number, endLong: number, endLat: number,
    startDate: number, endDate: number, carType: string, hotSwap: boolean) => {
    // connect with server get offers bla lba
    // console.log(`create booking for ${name} on ${lat}, ${long} with ${carType}`);
    var data = {
    "startLong": startLong,
    "startLat": startLat,
    "endLong": endLong,
    "endLat": endLat,
    "startDate": startDate,
    "endDate": endDate,
    "carType": carType,
    "hotSwap": hotSwap
    };

    const config: any = {
    method: 'get',
    headers: { 
        'Content-Type': 'application/json'
    },
    url: 'http://localhost:8080/ListOffersForRoute',
    data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    
    submitBooking();
    })
    .catch(function (error) {
    console.log(error);
    });
    
}

const submitBooking = () => {
   var data = {
    "startDate": 1668732207,
    "endDate": 1668818607,
    "distance": 50.5,
    "car": {
        "connect": "348716537770672333"
    }
    };

    var config: any = {
    method: 'post',
    url: 'http://localhost:8080/api/booking',
    headers: { 
        'Content-Type': 'application/json'
    },
    data: data
};

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}

export const createBookingForDuration = (startLong: number, startLat: number, startDate: number, endDate: number,
    carType: string) => {
    var data = {
    "startLong": 75,
    "startLat": 30,
    "startDate": 1668818607,
    "endDate": 1668828607,
    "carType": "Truck"
    };

    var config: any = {
    method: 'get',
    url: 'http://localhost:8080/ListOffersForDuration',
    headers: { 
        'Content-Type': 'application/json'
    },
    data: data
    };

    
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
    
}