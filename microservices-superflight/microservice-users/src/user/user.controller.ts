import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/commons/constants';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern(UserMSG.CREATE)
  create(@Payload() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }
  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }
  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }
  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() { id, userDTO }: any) {
    return this.userService.update(id, userDTO);
  }

  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: string) {
    return this.userService.delete(id);
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload() { username, password }: any): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    );
    if (user && isValidPassword) return user;

    return null;
  }
}
