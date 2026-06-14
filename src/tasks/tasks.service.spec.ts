import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from './entities/task.entity';

// Unit-testing a provider: spin up a tiny DI module with just the thing under test.
// This is the same Test.createTestingModule used in app.controller.spec.ts.
describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();
    service = moduleRef.get(TasksService);
  });

  it('creates a task with default status OPEN', () => {
    const task = service.create({ title: 'Write tests' });
    expect(task.id).toBeDefined();
    expect(task.status).toBe(TaskStatus.OPEN);
  });

  it('throws NotFoundException for a missing task', () => {
    expect(() => service.findOne(9999)).toThrow(NotFoundException);
  });

  it('updates an existing task', () => {
    const created = service.create({ title: 'Original' });
    const updated = service.update(created.id, { title: 'Updated' });
    expect(updated.title).toBe('Updated');
  });

  it('filters by status in findAll', () => {
    const { items, total } = service.findAll({
      status: TaskStatus.IN_PROGRESS,
      page: 1,
      limit: 10,
    });
    expect(total).toBeGreaterThanOrEqual(1);
    expect(items.every((t) => t.status === TaskStatus.IN_PROGRESS)).toBe(true);
  });
});
