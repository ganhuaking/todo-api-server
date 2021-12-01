import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  async getTasks(
    getTasksFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getTasks(getTasksFilterDto, user);
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
  async getTaskById(getTaskDto: GetTaskDto, user: User): Promise<Task> {
    const { id } = getTaskDto;
    const task = await this.tasksRepository.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException(`getTaskById with id: ${id} not found`);
    }
    return task;
  }
  async deleteTaskById(
    deleteTaskDto: DeleteTaskDto,
    user: User,
  ): Promise<void> {
    const { id } = deleteTaskDto;
    const deleteResult = await this.tasksRepository.delete({ id, user });
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`deleteTaskById with id: ${id} not found`);
    }
  }

  async updateTaskStatusById(
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const { id, status } = updateTaskDto;
    const task = await this.getTaskById({ id }, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
