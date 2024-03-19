import {CarsModel, CostumersModel} from '../models/mongoModels.js';
import {carsInitDB, carsTableHeaders} from '../helpers/carsHelpers.js';
import {tableConfig, tableTitle} from '../helpers/setupHelpers.js';
import {table} from 'table';
import chalk from 'chalk';

// ---------------------------------------------------------------- //
// ------------------------ DEV FUNCTIONS ------------------------- //
// ---------------------------------------------------------------- //

/* 
    Those functions aim to help on the initial tests while building the CLI

    Things like resets and initializers were put into functions so devs
    can freely mess up the database and reset to readable version with a 
    a single command.
*/

// --------------------------- RESET DB --------------------------- //

export const hardReset = async () => {
    const deletedDBInfo = await CarsModel.deleteMany({});
    console.log('Collection cleared : turners-cars\nDev Report::.\n', deletedDBInfo);

    const addedDBInfo = await CarsModel.insertMany(carsInitDB);
    console.log('Collection Initialised : turners-cars\nDev Report::.\n', addedDBInfo);

    process.exit();
};

// ---------------------------------------------------------------- //
// --------------------------- CARS CLI --------------------------- //
// ---------------------------------------------------------------- //

// ------------------- GET CARS LIST AS OBJECTS ------------------- //

export const carsObjList = async () => {
    const objList = await CarsModel.find({});
    console.log(objList);
    process.exit();
};

// ------------------------ GET CARS LIST  ------------------------ //

export const carsList = async () => {
    const list = await CarsModel.find({});

    const carsTable = list.map(car => [car.model, car.year, `NZD$ ${car.price}`]);
    console.log(table([tableTitle('Cars on stock'), carsTableHeaders, ...carsTable], tableConfig));

    process.exit();
};

// --------------------------- ADD CAR ---------------------------- //

export const addCar = async ({model, year, price}) => {
    const newCarObj = {
        model,
        year: +year,
        price: +price,
    };

    const addedCar = await CarsModel.create(newCarObj);
    const addedCarTable = [addedCar.model, addedCar.year, addedCar.price];

    console.log(table([tableTitle('Car Added to DB'), carsTableHeaders, addedCarTable], tableConfig));

    process.exit();
};
// -------------------------- DELETE CAR -------------------------- //
// ----------------------- UPDATE CAR ENTRY ----------------------- //
