// WIP
import mongoose from "mongoose";
import { config } from "dotenv";
import * as path from "path";
import { Cronjob, Status } from "src/schemas/cronjob.schema";
import { getDaysInMonth } from "src/helpers/date-helper";
import axios from "axios";
// import { CronjobResult } from "src/schemas/cronjobresult.schema";
import * as Bree from "bree";
import { updateCurrentDocument } from "src/helpers/db-helper";

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
        console.error(`Error while running the task-runner cron: ${e}`);
        process.exit(1);
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
            // we will update this because if we don't then there is a possibility that some other instance might also pick this up.
            console.log("IDDDD: ", doc._id.toHexString())
            await updateCurrentDocument(collection, {
                _id: doc._id.toHexString(),
                api_key: doc.api_key,
                link: doc.link,
                number_of_executions: doc.number_of_executions,
                number_of_failures: doc.number_of_failures
            }, {
                status: Status.TAKEN,
            })
            if(doc.scheduled_time == "weekly") {
                result = new Date(result.getTime() + 7 * millisecondsInADay);
            } else if(doc.scheduled_time == "monthly") {
                result = new Date(result.getTime() + getDaysInMonth(result.getFullYear(), result.getMonth()) * millisecondsInADay);
            } else {
                result = new Date(result.getTime() + parseInt(doc.scheduled_time));
            }
            try{
                // Run the API Calling in backgruond
                const b = new Bree({
                    root: path.resolve(__dirname, "."),
                    jobs: [
                        {
                            name: "runapi.bgservice",
                            timeout: 0,
                            worker: {
                                workerData: {
                                    doc: {
                                        _id: doc._id.toHexString(),
                                        api_key: doc.api_key,
                                        link: doc.link,
                                        number_of_executions: doc.number_of_executions,
                                        number_of_failures: doc.number_of_failures
                                    },
                                    next_execution: result
                                }
                            }
                        }
                    ]
                });
                b.start();
            } catch(e) {
                console.error(e);
                process.exit(1);
            }
        }
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

function shouldRun(next_execution: Date): boolean {
    const currentDate = new Date()
    console.log(next_execution <= currentDate);
    if(next_execution <= currentDate) {
        return true;
    }
    return false;
}

main();