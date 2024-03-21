import {CarsModel, CostumersModel} from '../models/mongoModels.js';
import {queryCarPrompt} from '../../helpers/carsHelpers.js';
import {carsInitDB, addCarPrompt, deleteCarPrompt, getCarsTableFor} from '../helpers/carsHelpers.js';
import {warningMsg, successMsg, failMsg, noMatchesMsg} from '../helpers/helpers.js';
import inquirer from 'inquirer';

// ------------------------ GET CARS LIST  ------------------------ //

export const carsList = async (cli = false) => {
    const list = await CarsModel.find({});
    const carsTable = getCarsTableFor('Cars on stock', list);
    console.log(carsTable);

    if (cli) process.exit();
    return;
};

// -------------------- GET QUERY SEARCH LIST --------------------- //

const queryCarByPromptFunc = async type => await inquirer.prompt(queryCarPrompt(type));

export const queryCarBy = async (cli = false, queryType = 'model', query) => {
    const queryTypeCheckArr = ['id', 'model', 'year', 'price'];
    if (!queryTypeCheckArr.includes(queryType)) {
        if (cli) process.exit();
        return;
    }

    if (cli) query = queryCarByPromptFunc(queryType);

    const searchResults = await CarsModel.find({[queryType]: query});
    const searchTable = getCarsTableFor(`Search Results for =>  ${queryType}: ${query}`, searchResults);
    console.log(searchTable);

    if (cli) process.exit();
    return;
};
