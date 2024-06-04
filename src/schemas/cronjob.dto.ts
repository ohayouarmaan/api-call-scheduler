import { Type } from "class-transformer";
import { IsDate, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCronDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    link: string;

    @IsString()
    @IsNotEmpty()
    api_key: string;

    @IsString()
    @IsNotEmpty()
    scheduled_time: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    start_date: Date;
}

export class UpdateCronJobDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    link?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    api_key?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    scheduled_time?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    status?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    start_date?: Date;
}