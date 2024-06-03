import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCronDto } from 'src/schemas/cronjob.dto';
import { Cronjob } from 'src/schemas/cronjob.schema';

@Injectable()
export class CronjobsService {
    constructor(@InjectModel(Cronjob.name) private cronjobModel: Model<Cronjob>){}

    getAll() {
        return this.cronjobModel.find({});
    }

    createOne(cron: CreateCronDto) {
        return this.cronjobModel.create(cron);
    }

}
