"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tourSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    rating: Number,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a maxGroupSize']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    instructor: {
        type: String,
        default: "Anonymous"
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a imageCover']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: {
        type: [Date]
    }
});
var Tour = mongoose_1.default.model('ah', tourSchema);
exports.default = Tour;
/*
const testTour = new Tour({
    name : "The Night of Lightness",
    rating: 4.9,
    price : 333
});

testTour.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log(err)
}); */
