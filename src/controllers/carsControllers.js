import {CarsModel, CostumersModel} from '../models/mongoModels.js';
import {carsInitDB, addCarPrompt, deleteCarPrompt, getCarsTableFor} from '../helpers/carsHelpers.js';
import {warningMsg, successMsg, failMsg, noMatchesMsg, cliReturn} from '../helpers/helpers.js';
import inquirer from 'inquirer';

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
    const carsTable = getCarsTableFor('Cars on stock', list);
    console.log(carsTable);
    process.exit();
};

// --------------------------- ADD CAR ---------------------------- //

const addCarPromptFunc = async () => await inquirer.prompt(addCarPrompt);

export const addCar = async (cli = false, carObj) => {
    if (cli) carObj = await addCarPromptFunc(); // Get's carObj (model, year and price) from the cli interface.
    if (!carObj) console.log(failMsg('Something went wront. We could not get the car info to upload on our DB'));

    const {model, year, price} = carObj;

    const newCarObj = {
        model,
        year: +year,
        price: +price,
    };

    const addedCar = await CarsModel.create(newCarObj);
    const addedCarTable = getCarsTableFor('Car Added to DB', addedCar);
    console.log(addedCarTable);
    console.log(successMsg());

    return cliReturn(cli);
};
// -------------------------- DELETE CAR -------------------------- //

const deleteCarPromptFunc = async identifier => await inquirer.prompt(deleteCarPrompt(identifier));

export const deleteCar = async (cli = false, type, carIdentifierObj) => {
    // ------------------- HANDLING TYPE ARGUMENT  -------------------- //

    if (type !== 'id' && type !== 'model') {
        console.log(`--type MUST be "id" or "model" please try again.`);
        console.log(type);

        return cliReturn(cli);
    }

    /*
        If user chooses 'model' as the identifier to delete car AND it 
        has more than one entry, Jumps to the ID option.
    */

    // ----------------------- DELETE BY MODEL ------------------------ //
    // ---------------------------------------------------------------- //

    if (type === 'model') {
        carIdentifierObj = await deleteCarPromptFunc(type);

        // ----- REBUILD CARIDENTIFIEROBJ AS REGEX FOR A BROAD SEARCH ----- //

        const objKey = Object.keys(carIdentifierObj)[0];
        const objValRegex = {$regex: `${carIdentifierObj[objKey]}`, $options: 'i'};
        const carSearchRegex = {[`${objKey}`]: objValRegex};

        // ------------------------- REGEX SEARCH ------------------------- //

        const carSearch = await CarsModel.find(carSearchRegex);

        if (carSearch.length === 0) {
            console.log(noMatchesMsg());
            return cliReturn(cli);
        }

        // ------------------ HANDLING DUPLICATE RESULTS ------------------ //

        if (carSearch.length > 1) {
            const duplicateTable = getCarsTableFor('Delete Duplicates Search', carSearch);

            console.log(`${warningMsg(`Two or more entries were found for ${carIdentifierObj[objKey]}`)}`);
            console.log(duplicateTable);
            console.log(`${warningMsg(`Two or more entries were found for ${carIdentifierObj[objKey]}`)}`);

            const carIdentifierID = await deleteCarPromptFunc('id');
            const deletedCar = await CarsModel.findByIdAndDelete(carIdentifierID.id);
            const deletedCarTable = getCarsTableFor('Car Deleted from DB', deletedCar);

            console.log(deletedCarTable);
            console.log(successMsg());

            // ----------- IF SEARCH GOES SMOOTHLY (1 RESULT ONLY) ------------ //
        } else {
            const deletedCar = await CarsModel.findOneAndDelete(carSearchRegex);
            const deletedCarTable = getCarsTableFor('Car Deleted from DB', deletedCar);

            console.log(deletedCarTable);
            console.log(successMsg());
        }
    }

    // ------------------------- DELETE BY ID ------------------------- //
    // ---------------------------------------------------------------- //

    if (type === 'id') {
        const carIdentifierID = await deleteCarPromptFunc('id');

        /* 
            Mongoose does not handle id searchs when the argument does not have 
            an _id pattern and lenght.
            For that reason I broke this guard clauses into 2 steps.
            
                GUARD CLAUSE 1 - User input have to match an _id lenght.
                GUARD CLAUSE 2 - If deleteSearch returns null it means nothing was found or delete.
        */

        // GUARD CLAUSE 1
        if (carIdentifierID.id.length !== 24) {
            console.log(noMatchesMsg());
            return cliReturn(cli);
        }

        // FIND AND DELETE SEARCH
        const deletedCar = await CarsModel.findOneAndDelete({_id: carIdentifierID.id});

        // GUARD CLAUSE 2
        if (deletedCar === null) {
            console.log(noMatchesMsg());
            return cliReturn(cli);
        }

        // If all works return a table with the deleted car.
        const deletedCarTable = getCarsTableFor('Car Deleted from DB', deletedCar);

        console.log(deletedCarTable);
        console.log(successMsg());
    }

    return cliReturn(cli);
};

// ----------------------- UPDATE CAR ENTRY ----------------------- //

// --------------------- QUERY FOR SPECIFICS ---------------------- //
// --------------------- MODEL / YEAR / PRICE --------------------- //
