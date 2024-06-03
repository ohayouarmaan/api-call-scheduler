import { Module } from '@nestjs/common';
import { CronJobController } from './cronjobs.controller';
import { CronjobsService } from './cronjobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cronjob, CronjobSchema } from 'src/schemas/cronjob.schema';

@Module({
    controllers: [CronJobController],
    imports: [MongooseModule.forFeature([
        { name: Cronjob.name, schema: CronjobSchema }
    ])],
    providers: [CronjobsService]
})
export class CronjobsModule {}
