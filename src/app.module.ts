import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // isGlobal:true => ConfigService is injectable everywhere without re-importing.
    // It loads variables from `.env` into process.env.
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Registering global interceptors/filters via these tokens (instead of in
    // main.ts) lets them use dependency injection. APP_GUARD / APP_PIPE exist too.
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  // Middleware can't be registered with a decorator — you wire it here.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
