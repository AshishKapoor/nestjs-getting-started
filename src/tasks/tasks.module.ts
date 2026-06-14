import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// A module groups a feature's pieces. `controllers` are instantiated by Nest;
// `providers` are added to this module's DI scope. To let OTHER modules use
// TasksService, you'd add `exports: [TasksService]`.
@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
