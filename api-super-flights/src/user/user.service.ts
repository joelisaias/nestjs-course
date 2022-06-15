import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/commons/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/commons/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<User>) {}

  hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  checkPassword = async (
    password: string,
    passwordDB: string,
  ): Promise<boolean> => {
    return await bcrypt.compare(password, passwordDB);
  };
  create = async (userDTO: UserDTO): Promise<User> => {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    return await newUser.save();
  };

  findAll = async (): Promise<User[]> => {
    return await this.model.find();
  };

  findOne = async (id: string): Promise<User> => {
    return await this.model.findById(id);
  };

  update = async (id: string, userDTO: UserDTO): Promise<User> => {
    const hash = await this.hashPassword(userDTO.password);
    const user = { ...userDTO, password: hash };
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  };

  delete = async (id: string) => {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'User deleted' };
  };

  findByUsername = async (username: string): Promise<User> => {
    return await this.model.findOne({ username });
  };
}
