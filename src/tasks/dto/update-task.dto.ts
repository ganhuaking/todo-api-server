import { TaskStatus } from '../task.model';
import { IsEnum } from 'class-validator';
export class UpdateTaskDto {
  id: string;
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
