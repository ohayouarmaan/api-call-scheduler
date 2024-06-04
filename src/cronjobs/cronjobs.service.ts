import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getDaysInMonth } from 'src/helpers/date-helper';
import { CreateCronDto, UpdateCronJobDto } from 'src/schemas/cronjob.dto';
import { Cronjob, Status } from 'src/schemas/cronjob.schema';

@Injectable()
export class CronjobsService {
    constructor(@InjectModel(Cronjob.name) private cronjobModel: Model<Cronjob>){}

    async getAll() {
        return await this.cronjobModel.find({});
    }

    async createOne(cron: CreateCronDto) {
        let result = cron.start_date;
        const millisecondsInADay = 24 * 60 * 60 * 1000;
        if(cron.scheduled_time == "weekly") {
            result = new Date(result.getTime() + 7 * millisecondsInADay);
        } else if(cron.scheduled_time == "monthly") {
            result = new Date(result.getTime() + getDaysInMonth(result.getFullYear(), result.getMonth()) * millisecondsInADay);
        } else {
            result = new Date(result.getTime() + parseInt(cron.scheduled_time));
        }
        console.log(`Result: ${result <= (new Date)}`)
        return await this.cronjobModel.create({
            ...cron,
            next_execution: result,
        });
    }

    async updateOne(id: string, cron: UpdateCronJobDto) {
        return await this.cronjobModel.findOneAndUpdate({
            _id: id
        }, cron);
    }

    async deleteOne(id: string) {
        return await this.cronjobModel.deleteOne({
            _id: id
        });
    }

    async getOne(id: string) {
        return await this.cronjobModel.findById(id);
    }

}
