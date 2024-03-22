import {CarsModel} from '../../models/mongoModels.js';
import {getCarsTableFor} from '../../helpers/carsHelpers.js';
import {queryCarPrompt} from '../../helpers/prompts.js';
import inquirer from 'inquirer';

import mongoose from 'mongoose';

// ---------------------------------------------------------------- //
// ------------------------ GET CARS LIST ------------------------- //
// ---------------------------------------------------------------- //

export const carsList = async (cli = false) => {
    const list = await CarsModel.find({});
    const carsTable = getCarsTableFor('Cars on stock', list);
    console.log(carsTable);

    if (cli) process.exit();
    return;
};

// ---------------------------------------------------------------- //
// -------------------- GET QUERY SEARCH LIST --------------------- //
// ---------------------------------------------------------------- //

const queryCarByPromptFunc = async type => await inquirer.prompt(queryCarPrompt(type));

export const queryCarBy = async (cli = false, queryType, query) => {
    // ------------------- HANDLING TYPE ARGUMENT  -------------------- //

    // TODO - Break this function into 4 => one for each type. Build this one will make it hard to read and maintain.

    // !As per now year and price will not work because they need a different searching logic and methods on mongoose/mongoDB

    // const queryTypeCheckArr = ['id', 'model', 'year', 'price'];
    const queryTypeCheckArr = ['id', 'model'];

    if (!queryTypeCheckArr.includes(queryType)) {
        console.log(`--type MUST be 'id' or 'model'. Please try again.`);
        if (cli) process.exit();
        return;
    }

    // -------------------- CONVERT QUERY TO REGEX -------------------- //
    let regexQuery;

    if (cli) {
        // CLI QUERY REGEX CONVERSION
        query = await queryCarByPromptFunc(queryType);
        regexQuery = {$regex: `${query[queryType]}`, $options: 'i'};
    } else {
        // FUNC QUERY REGEX CONVERSION
        regexQuery = {$regex: `${query}`, $options: 'i'};
    }

    const regexSearch = {[queryType]: regexQuery};

    // ------------------------- RETURN TABLE ------------------------- //
    const searchResults = await CarsModel.find(regexSearch);
    const searchTable = getCarsTableFor(
        `Search Results for =>  ${queryType}: ${cli ? query.model : query}`,
        searchResults
    );
    console.log(searchTable);

    if (cli) process.exit();
    return;
};
