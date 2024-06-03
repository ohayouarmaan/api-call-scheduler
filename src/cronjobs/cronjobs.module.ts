import { Module } from '@nestjs/common';
import { CronJobController } from './cronjobs.controller';
import { CronjobsService } from './cronjobs.service';

@Module({
    controllers: [CronJobController],
    providers: [CronjobsService]
})
export class CronjobsModule {}
