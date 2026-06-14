import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// PartialType makes every field of CreateTaskDto optional — and crucially keeps
// the validation rules. So PATCH can send just { status: 'DONE' } and it's valid.
// This is the DRY way to derive DTOs instead of copy-pasting decorators.
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
