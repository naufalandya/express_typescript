import express, {Express} from "express";
import morgan from "morgan";

const app : Express = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

import {tourRouter} from './src/routes/index'

app.use('/api/v1/tours', tourRouter)

app.use((req, res, next) => {
    res.json({
        message : "not found"
    })
});


export default app;