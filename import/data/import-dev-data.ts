import mongoose from 'mongoose';
import fs from 'fs';
import Tour from '../../src/model/tourModel';

//import ahhh from '../../'


import dotenv from 'dotenv';
dotenv.config({path : '../../.env'})
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


const tours : JSON = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Data Successfuly Loaded')
    } catch (error) {
        console.log(error)
    }
}

importData();