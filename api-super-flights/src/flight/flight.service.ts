import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight } from 'src/commons/interfaces/flight.interface';
import { FLIGHT } from 'src/commons/models/models';
import { FlightDTO } from './dto/flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<Flight>,
  ) {}

  create = async (flightDTO: FlightDTO): Promise<Flight> => {
    const newFlight = new this.model(flightDTO);
    return await newFlight.save();
  };

  findAll = async (): Promise<Flight[]> => {
    return await this.model.find().populate('passengers');
  };

  findOne = async (id: string): Promise<Flight> => {
    return await this.model.findById(id).populate('passengers');
  };

  update = async (id: string, flightDTO: FlightDTO): Promise<Flight> => {
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  };

  delete = async (id: string) => {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Flight deleted' };
  };

  addPassenger = async (
    flightId: string,
    passengerId: string,
  ): Promise<Flight> => {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        { $addToSet: { passengers: passengerId } },
        { new: true },
      )
      .populate('passengers');
  };
}
