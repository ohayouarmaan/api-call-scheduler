// WIP
import mongoose from "mongoose";
import { config } from "dotenv";
import * as path from "path";
import { Cronjob, Status } from "src/schemas/cronjob.schema";
import { getDaysInMonth } from "src/helpers/date-helper";

const THRESHOLD = 10 * 1000

config({
    path: path.resolve("../", "../", ".env")
});

async function main() {
    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URI);
        run(db.connections[0])
        setInterval(() => {
            run(db.connections[0])
        }, THRESHOLD)
    } catch(e) {

    }
}

async function run(db: mongoose.Connection) {
    const collection = db.collection("cronjobs") as mongoose.Collection<Cronjob>;
    const cursor = await collection.find({
        status: Status.ACTIVE
    });
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        if(shouldRun(doc.next_execution)){
            let result = new Date();
            const millisecondsInADay = 24 * 60 * 60 * 1000;
            if(doc.scheduled_time == "weekly") {
                result = new Date(result.getTime() + 7 * millisecondsInADay);
            } else if(doc.scheduled_time == "monthly") {
                result = new Date(result.getTime() + getDaysInMonth(result.getFullYear(), result.getMonth()) * millisecondsInADay);
            } else {
                result = new Date(result.getTime() + parseInt(doc.scheduled_time));
            }
            //TODO: Call the provided api with the API Key, Get the output and save it in the db.
            await updateCurrentDocument(collection, doc, {
                status: Status.ACTIVE,
                next_execution: result
            })
        }
    }
}

function shouldRun(next_execution: Date): boolean {
    const currentDate = new Date()
    console.log(next_execution <= currentDate);
    if(next_execution <= currentDate) {
        return true;
    }
    return false;
}

async function updateCurrentDocument(collection: mongoose.Collection<Cronjob>, doc: mongoose.mongo.WithId<Cronjob>, data: mongoose.mongo.MatchKeysAndValues<Cronjob>) {
    await collection.updateOne({ _id: doc._id }, {$set: data});
}

main();