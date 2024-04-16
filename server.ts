import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config({path : './.env'})
import app from './index';

//console.log(process.env.DATABASE_MONGO)

const DB : any = process.env.DATABASE_MONGO
const PORT : number = Number(process.env.PORT) || 4765


async function main() {
    try {
        const connect = await mongoose.connect(DB)
        //console.log(connect)
    } catch (error) {
        console.log(error)
    }
}

//import importData from./import/data/import-dev-datata';

app.listen(PORT, () =>{
    console.log(`Server berjalan di port https://localhost:${4765}`);
    main()
    //importData()
})