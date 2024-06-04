import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CronjobsService } from "./cronjobs.service";
import { CreateCronDto, UpdateCronJobDto } from "src/schemas/cronjob.dto";

@Controller('cron')
export class CronJobController {
    constructor(private cronService: CronjobsService){};

    @Get("/")
    async getAll() {
        return await this.cronService.getAll(); 
    }

    @Post("/create")
    async createOne(@Body() body: CreateCronDto) {
        return await this.cronService.createOne(body);
    }

    @Put(":id")
    async updateOne(@Param() id: string, @Body() body: UpdateCronJobDto) {
        return await this.cronService.updateOne(id, body);
    }

    @Delete(":id")
    async deleteOne(@Param() id: string) {
        return await this.cronService.deleteOne(id)
    }

    @Get(":id")
    async getOne(@Param() id: string) {
        return await this.cronService.getOne(id);
    }
}