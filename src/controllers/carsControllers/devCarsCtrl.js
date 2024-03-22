import {CarsModel} from '../../models/mongoModels.js';
import {carsInitDB} from '../../helpers/carsHelpers.js';

// ---------------------------------------------------------------- //
// ------------------- GET CARS LIST AS OBJECTS ------------------- //
// ---------------------------------------------------------------- //

export const carsObjList = async (cli = false) => {
    const objList = await CarsModel.find({});
    console.log(objList);

    if (cli) process.exit();
    return;
};

// ---------------------------------------------------------------- //
// --------------------------- RESET DB --------------------------- //
// ---------------------------------------------------------------- //

export const hardReset = async (cli = false) => {
    const deletedDBInfo = await CarsModel.deleteMany({});
    console.log('Collection cleared : turners-cars\nDev Report::.\n', deletedDBInfo);

    const addedDBInfo = await CarsModel.insertMany(carsInitDB);
    console.log('Collection Initialised : turners-cars\nDev Report::.\n', addedDBInfo);

    if (cli) process.exit();
    return;
};
