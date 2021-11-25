import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(getTasksFilterDto);
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  async getTaskById(getTaskDto: GetTaskDto): Promise<Task> {
    const { id } = getTaskDto;
    const task = await this.tasksRepository.findOne({ id });
    if (!task) {
      throw new NotFoundException(`getTaskById with id: ${id} not found`);
    }
    return task;
  }
  async deleteTaskById(deleteTaskDto: DeleteTaskDto): Promise<void> {
    const { id } = deleteTaskDto;
    const deleteResult = await this.tasksRepository.delete({ id });
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`deleteTaskById with id: ${id} not found`);
    }
  }

  async updateTaskStatusById(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { id, status } = updateTaskDto;
    const task = await this.getTaskById({ id });
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
