import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getDaysInMonth } from 'src/helpers/date-helper';
import { CreateCronDto } from 'src/schemas/cronjob.dto';
import { Cronjob } from 'src/schemas/cronjob.schema';

@Injectable()
export class CronjobsService {
    constructor(@InjectModel(Cronjob.name) private cronjobModel: Model<Cronjob>){}

    getAll() {
        return this.cronjobModel.find({});
    }

    createOne(cron: CreateCronDto) {
        let result = cron.start_date;
        const millisecondsInADay = 24 * 60 * 60 * 1000;
        if(cron.scheduled_time == "weekly") {
            result = new Date(result.getTime() + 7 * millisecondsInADay);
        } else if(cron.scheduled_time == "monthly") {
            result = new Date(result.getTime() + getDaysInMonth(result.getFullYear(), result.getMonth()) * millisecondsInADay);
        } else {
            result = new Date(result.getTime() + parseInt(cron.scheduled_time));
        }
        return this.cronjobModel.create({
            ...cron,
        });
    }

}
