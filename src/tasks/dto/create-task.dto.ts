import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

// A DTO ("Data Transfer Object") defines the shape of an incoming request body.
// The class-validator decorators are read at runtime by the global ValidationPipe.
// If validation fails, Nest auto-responds 400 before your controller ever runs.
export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
