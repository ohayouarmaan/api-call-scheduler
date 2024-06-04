import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { InferSchemaType } from "mongoose";
import { Cronjob } from "./cronjob.schema";

@Schema({
    timestamps: true
})
export class CronjobResult {
    @Prop({ type: mongoose.Types.ObjectId, ref: "Cronjobs" })
    cron_id: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    result: Record<string, object>
}

export const CronresultSchema = SchemaFactory.createForClass(CronjobResult);

export type ICronResult = InferSchemaType<typeof CronjobResult>
