#! /usr/bin/env node

/* 
    LINKS

    MONGODB => https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
    MONGOOSE => https://mongoosejs.com/docs/index.html
    COMMANDER => https://www.npmjs.com/package/commander
    TABLE => https://www.npmjs.com/package/table
*/

/* 
    NOTES ::.

    MODULAR ES6 AND INQUIRER PACKAGE
    I've converted this project to a ESM because of the inquirer pkg
    This package is now a ESM and it's a fundamental part of how this CLI works

*/

// --------------------------- IMPORTS ---------------------------- //

import {deleteCar} from './src/controllers/carsControllers/deleteCarsCtrl.js';
import {addCar} from './src/controllers/carsControllers/addCarsCtrl.js';
import {hardReset, carsObjList} from './src/controllers/carsControllers/devCarsCtrl.js';
import {carsList, queryCarBy} from './src/controllers/carsControllers/queryCarsCtrl.js';

import {warningMsg, devTempMsg, descriptionMsg} from './src/helpers/helpers.js';

import mongoose from 'mongoose';
import {Command} from 'commander';

// ---------------------------- SETUP ----------------------------- //

const program = new Command();
program.version('0.0.0').description(descriptionMsg());

mongoose.connect('mongodb://localhost:27017/turnersDB');
mongoose.connection.on('error', err => console.error('MONGOOSE ERROR :::', err));

// ---------------------------------------------------------------- //
// ------------------------- DEV COMMANDS ------------------------- //
// ---------------------------------------------------------------- //

// --------------------------- RESET DB --------------------------- //

program
    .command('hard-reset')
    .alias('hr')
    .description(`${warningMsg()}${warningMsg('Reset Cars DB to a clean starting point.')}${devTempMsg()}\n`)
    .action(hardReset);

// ---------------------------------------------------------------- //
// --------------------------- COMMANDS --------------------------- //
// ---------------------------------------------------------------- //

// ------------------- GET CARS LIST AS OBJECTS ------------------- //

program
    .command('cars-obj-list')
    .alias('col')
    .description(`Get's a list of available Turners cars on stock as an array of objects.\n\n`)
    .action(() => carsObjList(true));

// ------------------------ GET CARS LIST  ------------------------ //

program
    .command('cars-list')
    .alias('cl')
    .description(`Get's a list of available Turners cars on stock.\n\n`)
    .action(() => carsList(true));

// ----------------------- QUERY CARS LIST ------------------------- //

program
    .command('searchBy')
    .requiredOption('-t, --type', `Chose either:\n    id\n    model\n   year\n  price\n`)
    .alias('search')
    .alias('s')
    .description(`Search for Cars based on condition / search type.\n\n`)
    .action(() => queryCarBy(true));

// --------------------------- ADD CAR ---------------------------- //

program
    .command('add-car')
    .alias('add')
    .alias('a')
    .description(`Add new car to DB. Asks for user inputs.\n\n`)
    .action(() => addCar(true));

// -------------------------- DELETE CAR -------------------------- //

program
    .command('delete-car')
    .requiredOption('-t, --type', `Choose "id" to Delete car by ID or "model" to Delete car by MODEL / NAME`)
    .alias('delete')
    .alias('d')
    .description(
        `${warningMsg()}${warningMsg(
            'Choose "id" to Delete car by ID or "model" to Delete car by MODEL / NAME'
        )}For more information on command options:\ntcli d -h\n\n`
    )
    .action(() => deleteCar(true, program.args.slice(-1)[0]));

/* 
    requiredOption => program.args returns an array with the flags and passed argument.
    slice and [0] is used to retrieve the raw user passed argument
*/

// ---------------------------------------------------------------- //

program.parse();
