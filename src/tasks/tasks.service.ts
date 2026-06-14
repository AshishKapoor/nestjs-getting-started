import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { QueryTasksDto } from './dto/query-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

// @Injectable() marks this class as a "provider" — something the DI container can
// construct and hand to anyone who asks for it (here, TasksController).
// All business logic lives in services; controllers should stay thin.
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor() {
    // Seed a little data so the API has something to return on boot.
    this.create({ title: 'Learn NestJS modules', status: TaskStatus.IN_PROGRESS });
    this.create({ title: 'Understand dependency injection' });
  }

  findAll(query: QueryTasksDto) {
    let result = this.tasks;
    if (query.status) {
      result = result.filter((t) => t.status === query.status);
    }
    if (query.search) {
      const needle = query.search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(needle));
    }
    const start = (query.page - 1) * query.limit;
    return {
      items: result.slice(start, start + query.limit),
      total: result.length,
      page: query.page,
      limit: query.limit,
    };
  }

  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    // Throwing an HttpException is the idiomatic way to "return" an error.
    // Nest catches it and produces a proper 404 response.
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: this.nextId++,
      title: dto.title,
      description: dto.description,
      status: dto.status ?? TaskStatus.OPEN,
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  update(id: number, dto: UpdateTaskDto): Task {
    const task = this.findOne(id); // reuse — also gives us the 404 for free
    Object.assign(task, dto);
    return task;
  }

  remove(id: number): void {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }
}
