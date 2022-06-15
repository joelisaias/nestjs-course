import { Passenger } from './passenger.interface';

export interface Flight {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: Date;
  passengers: Passenger[];
}
