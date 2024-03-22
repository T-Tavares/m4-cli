import {CarsModel} from '../../models/mongoModels.js';
import {getCarsTableFor} from '../../helpers/carsHelpers.js';
import {addCarPrompt} from '../../helpers/prompts.js';
import {successMsg, failMsg} from '../../helpers/helpers.js';
import inquirer from 'inquirer';

// ---------------------------------------------------------------- //
// --------------------------- ADD CAR ---------------------------- //
// ---------------------------------------------------------------- //

const addCarPromptFunc = async () => await inquirer.prompt(addCarPrompt());

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

    if (cli) {
        console.log(addedCarTable);
        console.log(successMsg());
        process.exit();
    }

    return addedCar;
};
