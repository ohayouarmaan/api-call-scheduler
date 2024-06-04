import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppInitService } from "./app-init.service";
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { IPThrottlerGuard } from './ip-throtter.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ]),
    MongooseModule.forRoot(process.env.MONGO_DB_URI || "mongodb://localhost:27017/yolo-assignment"),
    CronjobsModule
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: IPThrottlerGuard
  }, AppInitService, AppService],
})
export class AppModule {}
