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

import {carsList, carsObjList, hardReset, addCar} from './src/controllers/carsControllers.js';
import {addCarPrompts} from './src/helpers/carsHelpers.js';
import {dangerLog, warningLog, okLog} from './src/helpers/setupHelpers.js';

import mongoose from 'mongoose';
import inquirer from 'inquirer';
import {Command} from 'commander';
import chalk from 'chalk';

// ---------------------------- SETUP ----------------------------- //

const descriptionText = ``;
const program = new Command();
program.version('0.0.0').description('Turners Cars CLI');

mongoose.connect('mongodb://localhost:27017/turnersDB');
mongoose.connection.on('error', err => console.error('MONGOOSE ERROR :::', err));

// ---------------------------------------------------------------- //
// ------------------------- DEV COMMANDS ------------------------- //
// ---------------------------------------------------------------- //

// --------------------------- RESET DB --------------------------- //

program
    .command(dangerLog('hard-reset'))
    .alias('hr')
    .description(dangerLog('Reset Cars DB to a clean starting point.'))
    .action(hardReset);

// ---------------------------------------------------------------- //
// --------------------------- COMMANDS --------------------------- //
// ---------------------------------------------------------------- //

// ------------------- GET CARS LIST AS OBJECTS ------------------- //

program
    .command('cars-obj-list')
    .alias('col')
    .description(`Get's a list of available Turners cars on stock as an array of objects.`)
    .action(carsObjList);

// ------------------------ GET CARS LIST  ------------------------ //

program
    .command('cars-list')
    .alias('cl')
    .description(`Get's a list of available Turners cars on stock.`)
    .action(carsList);

// --------------------------- ADD CAR ---------------------------- //

program
    .command('add-car')
    .alias('add')
    .alias('a')
    .description(`Reset Cars Database Collection to a clean starting point. This is a dev tool auxiliate on testing`)
    .action(() => inquirer.prompt(addCarPrompts).then(answers => addCar(answers)));

// -------------------------- DELETE CAR -------------------------- //
// ----------------------- UPDATE CAR ENTRY ----------------------- //

// ---------------------------------------------------------------- //

program.parse();
