import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) {
    if (filterDto.search || filterDto.status) {
      return this.tasksService.getTasks(filterDto);
    }
    return this.tasksService.getAllTasks();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param() getTaskDto: GetTaskDto): Task {
    return this.tasksService.getTaskById(getTaskDto);
  }
  @Delete('/:id')
  deleteTaskById(@Param() deleteTaskDto: DeleteTaskDto): void {
    return this.tasksService.deleteTaskById(deleteTaskDto);
  }
  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    updateTaskDto.id = id;
    return this.tasksService.updateTaskStatusById(updateTaskDto);
  }
}
