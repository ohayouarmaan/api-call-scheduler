import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [CronjobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
