import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { Task } from './task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  tasks: Task[] = [];

  create(taskDto: TaskDTO): Task {
    const task = {
      id: uuidv4(),
      ...taskDto,
    };
    this.tasks.push(task);
    return task;
  }
  findAll(): Task[] {
    return this.tasks;
  }
  findOne(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, task: TaskDTO): Task {
    const newTask = {
      id: id,
      ...task,
    };
    this.tasks = this.tasks.map((t) => (t.id === id ? newTask : t));
    return newTask;
  }
  delete(id: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return `Task with id ${id} deleted`;
  }
}
