import {Response, Request, NextFunction} from 'express';
import Tour from '../model/tourModel';
import APIfeatures from '../utils/apiFeatures';
//import { match } from 'assert';
//import { Console } from 'console';
/*

import mongoose from 'mongoose';
// Membuat koneksi ke database MongoDB
mongoose.connect('mongodb://localhost:27017/andya', {
})
.then(() => console.log('Terhubung ke database MongoDB'))
.catch(err => console.error('Koneksi gagal:', err));

// Mendapatkan nama koleksi yang digunakan oleh model Tour
const collectionName = Tour.collection.name;
console.log('Nama koleksi:', collectionName);
*/

interface TourInterface {
    name: string;
    price: number;
    priceDiscount?: number;
    rating?: number;
    duration: number;
    maxGroupSize: number;
    difficulty: string;
    ratingsAverage?: number;
    ratingsQuantity?: number;
    instructor?: string;
    summary: string;
    description?: string;
    imageCover: string;
    images: string[];
    createdAt: Date;
    startDates?: Date[];
}



class TourController {
    //private tours : Tour[]
    constructor(){

    }

    async checkId(req : Request, res : Response, next : NextFunction){

        try {

            const tour = await Tour.findById(req.params.id)

            if (!tour){
                const notFound = new Error("Not Found")
                throw notFound
            } else {
                next()
            }

        } catch (err) {
            console.log(err)
            res.status(404).json({
                status : 'fail',
                message : `Tour with id ${req.params.id} is not found`
            })
            
        }
    }

    async createTour(req : Request, res : Response, next : NextFunction) {

    try {

        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status : 'success',
            data : {
                tour : newTour
            }
        })
    } 
    
    catch (err) {
        console.log(err)
        res.status(400).json({
            status : 'Bad Request',
            message : err,
        })
    }

    }

    async aliasTop5Tour(req: Request, res :Response, next : NextFunction) {
        req.query.limit = '5'
        req.query.sort = '-ratingsAverage%price'
        req.query.fields = 'name%price%ratingsAverage%summary%difficulty'

        next()
    }
    
    async getAllTours(req : Request, res : Response, next : NextFunction) : Promise<void> {
        
        try {

            const features = new APIfeatures(Tour.find(), req.query).filter().sorting().fieldLimiting().pagination()

            const tours = await features.query;
            // console.log(tours)
            res.status(200).json({
                status : 'success',
                data : {
                    tour : tours
                }
            })
            //console.log(tours)

        } catch (err) {
            console.log(err)
            res.status(500).json({
                status : 'Internal Server Error',
                message : err,
            })
            
        }
    }

    async getTourById(req : Request, res : Response, next : NextFunction) {
        
        try {
            const tour = await Tour.findById(req.params.id);
            res.status(200).json({
                status: 'success',
                data  : {
                    tour : tour
                }
            })

        } catch (err) {
            console.log(err)
            res.status(400).json({
                status : `Bad Request`,
                message : err
            });
        }

    }

    async updateById(req : Request, res : Response, next : NextFunction) {
        try {

            const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
                new : true,
                runValidators : true
            })

            res.status(201).json({
                status : "success",
                data : {
                    tour : tour,
                }
            })

        } catch (err) {

            console.log(err)
            res.status(400).json({
                status : 'Bad Request',
                message : err,
            })

        }
    }

    async deleteById(req : Request, res : Response, next : NextFunction) {
        try {
            const tour = await Tour.findByIdAndDelete(req.params.id)

            res.status(201).json({
                message : 'success',
                data : {
                    tour : tour
                }
            })

        } catch (err) {
            console.log(err) 
            res.status(400).json({
                status : 'Bad Request',
                message : err
            })
        }
    }

}

export default new TourController();



























//before
/*
const tours : Tour[] = JSON.parse(
    fs.readFileSync(`../firstapi/dev-data/data/tours-simple.json`, 'utf-8')
);

export const getTourById = (req : Request, res : Response) => {
    //console.log(req.params)

    const id = parseInt(req.params.id)

    //const tour = tours.find(el => el.id === id)

    if(!tour){
        return res
        .status(404)
        .json({
        status : 'invalid',
        data : {
            message : `Data with id ${id} is not available`
        }
    })
    }

    return res
    .status(200)
    .json({
        status : 'success',
        data : {
            tour
        }
    })
}

export const getAllTours = (req : Request, res : Response) => {
    res
    .status(200)
    .json({
        status : 'success',
        results : tours.length,
        data : {
            tours
        }
    })
}

export const createTours = (req : Request, res : Response) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id : newId}, req.body)

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res
        .status(201).json({
            status:'success',
            data : {
                tour : newTour
            }
        })
    })
    //res.json({message:"work"})
}

export const updateTourById = (req : Request, res : Response) => {
    const id = parseInt(req.params.id)
    const tour = tours.find(el => el.id === id)

    if(!tour){
        res
        .status(404)
        .json({
        status : 'invalid',
        data : {
            message : `Data with id ${id} is not available`
        }
    })
    }

    res
    .status(200)
    .json({
        status : 'success',
        data : {
            tour : 'Updated Tour Here'
        }
    })
}

export const deleteTourById = (req : Request, res : Response) => {
    const id = parseInt(req.params.id)
    const tour = tours.find(el => el.id === id)

    if(!tour){
        res
        .status(404)
        .json({
        status : 'invalid',
        data : {
            message : `Data with id ${id} is not available`
        }
    })
    }

    res
    .status(200)
    .json({
        status : 'success',
        data : {
            tour : 'Deleted Tour Here'
        }
    })
}
*/