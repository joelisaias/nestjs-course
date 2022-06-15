import { Passenger } from './passenger.interface';

export interface Flight extends Document {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: Date;
  passengers: Passenger[];
}
