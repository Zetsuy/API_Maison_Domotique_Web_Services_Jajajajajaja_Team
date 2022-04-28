import IDatabase from "@/interfaces/IDatabase";
import { EventEmitter } from "stream";

class Database extends EventEmitter implements IDatabase {

    constructor() {
        super()
    }

    public async get (tableName : string, id : string)  {

        return null;
    }

    public async getall (tableName : string)   {

        return null;
    }

    public async post (tableName : string, data : any)  {

        return null;
    }

    public  update (tableName : string, id : string, data : any)  {

        return false;
    }

    public  delete (tableName : string, id : string) {

        return false;
    }
}