import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppInitService } from "./app-init.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI || "mongodb://localhost:27017/yolo-assignment"),
    CronjobsModule
  ],
  controllers: [AppController],
  providers: [AppInitService, AppService],
})
export class AppModule {}
