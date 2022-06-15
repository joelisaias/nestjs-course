import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Passenger } from 'src/commons/interfaces/passenger.interface';
import { PASSENGER } from 'src/commons/models/models';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<Passenger>,
  ) {}

  create = async (passengerDTO: PassengerDTO): Promise<Passenger> => {
    const newPassenger = new this.model(passengerDTO);
    return await newPassenger.save();
  };

  findAll = async (): Promise<Passenger[]> => {
    return await this.model.find();
  };

  findOne = async (id: string): Promise<Passenger> => {
    return await this.model.findById(id);
  };

  update = async (
    id: string,
    passengerDTO: PassengerDTO,
  ): Promise<Passenger> => {
    return await this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
  };

  delete = async (id: string) => {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Passenger deleted' };
  };
}
