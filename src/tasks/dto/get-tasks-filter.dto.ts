import { TaskStatus } from '../task-status.enum';
import { IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
