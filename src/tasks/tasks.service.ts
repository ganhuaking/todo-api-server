import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasks(getTasksFilterDto: GetTasksFilterDto): Task[] {
    let tasks: Task[];
    if (getTasksFilterDto.search) {
      tasks = this.tasks.filter(
        (item) =>
          item.description.includes(getTasksFilterDto.search) ||
          item.title.includes(getTasksFilterDto.search),
      );
    }
    if (getTasksFilterDto.status) {
      tasks = tasks.filter((item) => item.status === getTasksFilterDto.status);
    }
    return tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(getTaskDto: GetTaskDto): Task {
    const { id } = getTaskDto;
    const task = this.tasks.find((item) => item.id === id);
    return task;
  }

  deleteTaskById(deleteTaskDto: DeleteTaskDto): void {
    const { id } = deleteTaskDto;
    const index = this.tasks.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }

  updateTaskStatusById(updateTaskDto: UpdateTaskDto): Task {
    const { id, status } = updateTaskDto;
    const index = this.tasks.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new NotFoundException(`updateTaskStatus with id ${id} not found`);
    }
    this.tasks[index].status = status;
    return this.tasks[index];
  }
}
