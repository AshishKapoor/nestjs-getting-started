// An "entity" is just the shape of your domain object. With a real database
// (TypeORM/Prisma) this would carry ORM decorators. Here it's a plain class.
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
}
