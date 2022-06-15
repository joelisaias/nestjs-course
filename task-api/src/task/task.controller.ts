import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post('/param/:id')
  createOneTask(@Param('id') id: number) {
    return { id };
  }

  @Post('/query')
  createOtherTask(@Query('id') id: number) {
    return `Query params ${id}`;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() task: TaskDTO) {
    return this.taskService.create(task);
  }
  @Get()
  findAll() {
    return this.taskService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() task: TaskDTO) {
    return this.taskService.update(id, task);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
