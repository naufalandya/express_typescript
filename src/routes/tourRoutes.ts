import express, {Router} from 'express';
import tourController from '../controllers/tourController';
const tourRouter : Router = express.Router();

tourRouter.param('id', tourController.checkId)

tourRouter
    .route("/:id")
    .get(tourController.getTourById)
    .patch(tourController.updateById)
    .delete(tourController.deleteById)

tourRouter
    .route("/")
    .post(tourController.createTour)
    .get(tourController.getAllTours)

export default tourRouter



/*
import {getAllTours, getTourById, createTours, updateTourById, deleteTourById} from '../controllers/tourController'


tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTours)

tourRouter
    .route('/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(deleteTourById)

export default tourRouter 
*/