import {CarsModel} from '../../models/mongoModels.js';
import {deleteCarPrompt} from '../../helpers/prompts.js';
import {warningMsg, successMsg, noMatchesMsg} from '../../helpers/helpers.js';
import {getCarsTableFor} from '../../helpers/carsHelpers.js';
import inquirer from 'inquirer';

// ---------------------------------------------------------------- //
// -------------------------- DELETE CAR -------------------------- //
// ---------------------------------------------------------------- //

const deleteCarPromptFunc = async identifier => await inquirer.prompt(deleteCarPrompt(identifier));

export const deleteCar = async (cli = false, type, carIdentifierObj) => {
    // ------------------- HANDLING TYPE ARGUMENT  -------------------- //
    let deletedCar;
    if (type !== 'id' && type !== 'model') {
        console.log(`--type MUST be "id" or "model" please try again.`);
        console.log(type);

        if (cli) process.exit();
        return;
    }

    /*
        If user chooses 'model' as the identifier to delete car AND it 
        has more than one entry, Jumps to the ID option.
    */

    // ----------------------- DELETE BY MODEL ------------------------ //
    // ---------------------------------------------------------------- //

    if (type === 'model') {
        if (cli) carIdentifierObj = await deleteCarPromptFunc(type);

        // ----- REBUILD CARIDENTIFIEROBJ AS REGEX FOR A BROAD SEARCH ----- //

        const objKey = Object.keys(carIdentifierObj)[0];
        const objValRegex = {$regex: `${carIdentifierObj[objKey]}`, $options: 'i'};
        const carSearchRegex = {[`${objKey}`]: objValRegex};

        // ------------------------- REGEX SEARCH ------------------------- //

        const carSearch = await CarsModel.find(carSearchRegex);

        if (carSearch.length === 0) {
            console.log(noMatchesMsg());
            if (cli) process.exit();
            return;
        }

        // ------------------ HANDLING DUPLICATE RESULTS ------------------ //

        if (carSearch.length > 1) {
            const duplicateTable = getCarsTableFor('Delete Duplicates Search', carSearch);

            console.log(`${warningMsg(`Two or more entries were found for ${carIdentifierObj[objKey]}`)}`);
            console.log(duplicateTable);
            console.log(`${warningMsg(`Two or more entries were found for ${carIdentifierObj[objKey]}`)}`);

            const carIdentifierID = await deleteCarPromptFunc('id');
            deletedCar = await CarsModel.findByIdAndDelete(carIdentifierID.id);
            const deletedCarTable = getCarsTableFor('Car Deleted from DB', deletedCar);

            // TODO fail message on deletion error

            console.log(deletedCarTable);
            console.log(successMsg());

            // ----------- IF SEARCH GOES SMOOTHLY (1 RESULT ONLY) ------------ //
        } else {
            const deletedCar = await CarsModel.findOneAndDelete(carSearchRegex);
            const deletedCarTable = getCarsTableFor('Car Deleted from DB', deletedCar);

            if (cli) {
                console.log(deletedCarTable);
                console.log(successMsg());
            } else {
                return deletedCar;
            }
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
            if (cli) process.exit();
            return;
        }

        // FIND AND DELETE SEARCH
        deletedCar = await CarsModel.findOneAndDelete({_id: carIdentifierID.id});

        // GUARD CLAUSE 2
        if (deletedCar === null) {
            console.log(noMatchesMsg());
            if (cli) process.exit();
            return;
        }

        // If all works return a table with the deleted car.
        const deletedCarTable = getCarsTableFor('Car Deleted from DB', deletedCar);

        if (cli) {
            console.log(deletedCarTable);
            console.log(successMsg());
        }
    }

    if (cli) process.exit();
    return;
};
