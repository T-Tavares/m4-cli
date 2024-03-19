// --------------------------- IMPORTS ---------------------------- //

import mongoose from 'mongoose';

// -------------------------- CARS MODEL -------------------------- //

const CarsSchema = new mongoose.Schema({
    model: String,
    year: Number,
    price: Number,
});

export const CarsModel = mongoose.model('turners-cars', CarsSchema);

// ----------------------- COSTUMERS MODEL ------------------------ //

const CostumersSchema = new mongoose.Schema({
    name: String,
    email: String,
    risk_rating: Number,
    claim: String,

    // TODO reference CarsSchema for current_car as well

    current_car: {
        model: String,
        year: Number,
        price: Number,
    },
});

export const CostumersModel = mongoose.model('turners-costumers', CarsSchema);
