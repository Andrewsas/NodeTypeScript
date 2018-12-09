import { config } from './config'
import { MongoClient } from "mongodb";

export function dbConnection() {
    return () => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.dbURL, (err, client) => {
                if (!err) {
                    console.log("Server Conectado Com Sucesso!");
                    return resolve(client);
                } else {
                    console.error("error");
                    reject(err);
                }
            });
        });
    }
}
