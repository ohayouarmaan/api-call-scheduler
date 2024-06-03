import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { InferSchemaType } from "mongoose";

export enum Status {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
    ARCHIVE = "ARCHIVE"
}

@Schema({
    timestamps: true
})
export class Cronjob {
    @Prop()
    name: string

    @Prop()
    link: string

    @Prop()
    api_key: string

    @Prop()
    scheduled_time: string

    @Prop()
    start_date: Date

    @Prop({ type: String, enum: Status })
    status: Status

    @Prop()
    next_execution: Date
}

export const CronjobSchema = SchemaFactory.createForClass(Cronjob);

export type ICron = InferSchemaType<typeof CronjobSchema>
