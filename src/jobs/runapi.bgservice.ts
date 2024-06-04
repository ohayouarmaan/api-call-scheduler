import axios from "axios";
import mongoose from "mongoose";
import { updateCurrentDocument } from "src/helpers/db-helper";
import { Cronjob, Status } from "src/schemas/cronjob.schema";
import { CronjobResult } from "src/schemas/cronjobresult.schema";
import { workerData } from "worker_threads";

async function main() {
    const data = (workerData.doc as {
        _id: string;
        link: string;
        api_key: string;
        number_of_executions: number;
        number_of_failures: number;
    })
    const next_execution = (workerData.next_execution) as Date
    const connection = (await mongoose.connect(process.env.MONGO_DB_URI));
    const db = connection.connections[0];
    const collection = db.collection("cronjobs") as mongoose.Collection<Cronjob>;
    let api_failed = false;
    try{
        const response = await callAPI(data.link, data.api_key);
        const resultCollection = db.collection("cronjobresult") as mongoose.Collection<CronjobResult>
        await resultCollection.insertOne({
            cron_id: new mongoose.Types.ObjectId(data._id),
            result: response.data
        });
    } catch(e) {
        console.error(e);
        api_failed = true;
    }
    if(api_failed){
        try{
            console.log("DATA", data);
            console.log("id: ", data._id);
            const result = await updateCurrentDocument(collection, data, {
                status: Status.ACTIVE,
                next_execution: next_execution,
                number_of_executions: data.number_of_executions + 1,
                number_of_failures: data.number_of_failures + 1
            });
            console.log("result", result);
        } catch(e) {
            console.log("error updating", e);
        }
    } else {
        const result = await updateCurrentDocument(collection, data, {
            status: Status.ACTIVE,
            next_execution: next_execution,
            number_of_executions: data.number_of_executions + 1,
        });
    }
}

async function callAPI(url: string, key: string) {
    // WIP
    const result = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${key}`
        }
    });
    return result;
}

main();