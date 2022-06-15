import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Create User' })
  @Post()
  create(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Put('/:id')
  update(@Param('id') id: string, @Body() userDTO: UserDTO) {
    return this.userService.update(id, userDTO);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
