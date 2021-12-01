import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }
  @Get('/:id')
  getTaskById(
    @Param() getTaskDto: GetTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(getTaskDto, user);
  }
  @Delete('/:id')
  deleteTaskById(
    @Param() deleteTaskDto: DeleteTaskDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(deleteTaskDto, user);
  }
  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    updateTaskDto.id = id;
    return this.tasksService.updateTaskStatusById(updateTaskDto, user);
  }
}
