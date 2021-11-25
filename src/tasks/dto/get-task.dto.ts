import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetTaskDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
}
