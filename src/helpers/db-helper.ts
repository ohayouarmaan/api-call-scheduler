import mongoose from "mongoose";
import { Cronjob } from "src/schemas/cronjob.schema";

export async function updateCurrentDocument(collection: mongoose.Collection<Cronjob>, doc: {
        _id: string;
        link: string;
        api_key: string;
        number_of_executions: number;
        number_of_failures: number;
    }, data: mongoose.mongo.MatchKeysAndValues<Cronjob>) {
    try{
        const toUpdate = await collection.updateOne({ _id: new mongoose.Types.ObjectId(doc._id) }, {
            $set: data, 
        });
    } catch(e) {
        console.error(e);
    }
}