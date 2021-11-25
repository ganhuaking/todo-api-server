import { TaskStatus } from '../task-status.enum';
import { IsEnum } from 'class-validator';
export class UpdateTaskDto {
  id: string;
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
