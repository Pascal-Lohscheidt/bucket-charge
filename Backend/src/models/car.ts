export interface Car {
    "name": string,
    "carType": CarType,
    "maximumRange": number,
    "currentRange": number,
    "carMode": CarMode,
    "lastTimeParked": number
}

export enum CarType {
    Sedan,
    Transporter,
    Truck
  }
  
export enum CarMode {
    Moving,
    Charging,
    Parked
  }