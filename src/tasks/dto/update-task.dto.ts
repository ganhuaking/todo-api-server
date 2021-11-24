import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  id: string;
  status: TaskStatus;
}
