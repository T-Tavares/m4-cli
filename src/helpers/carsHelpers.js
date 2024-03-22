import chalk from 'chalk';
import {table} from 'table';
import {tableTitle} from './helpers.js';

// ---------------------------------------------------------------- //
// ---------------------- DATABASE INIT DATA ---------------------- //
// ---------------------------------------------------------------- //

export const carsInitDB = [
    {
        model: 'Tesla Model S',
        year: 2018,
        price: 50000,
    },
    {
        model: 'Tesla Model 3',
        year: 2020,
        price: 40000,
    },
    {
        model: 'Tesla Model X',
        year: 2019,
        price: 60000,
    },
    {
        model: 'Tesla Model Y',
        year: 2021,
        price: 55000,
    },
    {
        model: 'Toyota Camry',
        year: 2017,
        price: 20000,
    },
    {
        model: 'Toyota Corolla',
        year: 2019,
        price: 18000,
    },
    {
        model: 'Honda Accord',
        year: 2016,
        price: 22000,
    },
    {
        model: 'Honda Civic',
        year: 2020,
        price: 25000,
    },
    {
        model: 'Ford Mustang',
        year: 2015,
        price: 30000,
    },
    {
        model: 'Ford F-150',
        year: 2020,
        price: 35000,
    },
    {
        model: 'BMW 3 Series',
        year: 2019,
        price: 45000,
    },
    {
        model: 'BMW 5 Series',
        year: 2018,
        price: 55000,
    },
    {
        model: 'Audi A4',
        year: 2020,
        price: 48000,
    },
    {
        model: 'Audi Q5',
        year: 2017,
        price: 40000,
    },
    {
        model: 'Mercedes-Benz C-Class',
        year: 2019,
        price: 50000,
    },
    {
        model: 'Mercedes-Benz E-Class',
        year: 2018,
        price: 60000,
    },
    {
        model: 'Chevrolet Malibu',
        year: 2019,
        price: 22000,
    },
    // {
    //     model: 'Chevrolet Silverado',
    //     year: 2020,
    //     price: 38000,
    // },
    // {
    //     model: 'Dodge Charger',
    //     year: 2017,
    //     price: 30000,
    // },
    // {
    //     model: 'Dodge Challenger',
    //     year: 2018,
    //     price: 35000,
    // },
    // {
    //     model: 'Jeep Wrangler',
    //     year: 2020,
    //     price: 40000,
    // },
    // {
    //     model: 'Jeep Grand Cherokee',
    //     year: 2019,
    //     price: 45000,
    // },
    // {
    //     model: 'Nissan Altima',
    //     year: 2018,
    //     price: 20000,
    // },
    // {
    //     model: 'Nissan Rogue',
    //     year: 2019,
    //     price: 25000,
    // },
    // {
    //     model: 'Subaru Outback',
    //     year: 2017,
    //     price: 28000,
    // },
    // {
    //     model: 'Subaru Forester',
    //     year: 2018,
    //     price: 30000,
    // },
    // {
    //     model: 'Volkswagen Jetta',
    //     year: 2020,
    //     price: 23000,
    // },
    // {
    //     model: 'Volkswagen Passat',
    //     year: 2019,
    //     price: 26000,
    // },
    // {
    //     model: 'Hyundai Sonata',
    //     year: 2018,
    //     price: 22000,
    // },
    // {
    //     model: 'Hyundai Tucson',
    //     year: 2019,
    //     price: 25000,
    // },
    // {
    //     model: 'Kia Optima',
    //     year: 2020,
    //     price: 23000,
    // },
    // {
    //     model: 'Kia Sportage',
    //     year: 2017,
    //     price: 24000,
    // },
    // {
    //     model: 'Lexus ES',
    //     year: 2018,
    //     price: 45000,
    // },
    // {
    //     model: 'Lexus RX',
    //     year: 2019,
    //     price: 50000,
    // },
    // {
    //     model: 'Mazda Mazda6',
    //     year: 2020,
    //     price: 27000,
    // },
    // {
    //     model: 'Mazda CX-5',
    //     year: 2018,
    //     price: 32000,
    // },
    // {
    //     model: 'Infiniti Q50',
    //     year: 2017,
    //     price: 35000,
    // },
    // {
    //     model: 'Infiniti QX60',
    //     year: 2019,
    //     price: 40000,
    // },
    {
        model: 'Unique Car',
        year: 2024,
        price: 100000,
    },
];

// ---------------------------------------------------------------- //
// ---------------------- CARS TABLES SETUP  ---------------------- //
// ---------------------------------------------------------------- //

export const carsTableHeaders = [
    chalk.hex('#0073cf').bold('Car ID'),
    chalk.hex('#0073cf').bold('Model'),
    chalk.hex('#0073cf').bold('Year'),
    chalk.hex('#0073cf').bold('Price'),
];

// ---------------------------------------------------------------- //
// -------------------------- CARS TABLE -------------------------- //
// ---------------------------------------------------------------- //

// --------------------- CARS TABLES CONFIG   --------------------- //

export const carsTableConfig = {
    spanningCells: [{col: 0, row: 0, colSpan: 4, alignment: 'center'}],
    columnDefault: {
        paddingLeft: 3,
        paddingRight: 3,
    },
    columns: [
        {alignment: 'left', paddingLeft: 2},
        {alignment: 'center'},
        {alignment: 'center'},
        {alignment: 'right', paddingRight: 2},
    ],

    border: {
        topBody: `─`,
        topJoin: `┬`,
        topLeft: `┌`,
        topRight: `┐`,

        bottomBody: `─`,
        bottomJoin: `┴`,
        bottomLeft: `└`,
        bottomRight: `┘`,

        bodyLeft: `│`,
        bodyRight: `│`,
        bodyJoin: `│`,

        joinBody: `─`,
        joinLeft: `├`,
        joinRight: `┤`,
        joinJoin: `┼`,
    },
};

// ----------------- GENERATE TABLES FOR RESULTS ------------------ //

export const getCarsTableFor = (title, data) => {
    let tableData;
    let tableOutput;
    const titleOutput = tableTitle(title);

    if (Array.isArray(data)) {
        tableData = data.map(car => [car._id, car.model, car.year, `NZD$ ${car.price}`]);
        tableOutput = table([titleOutput, carsTableHeaders, ...tableData], carsTableConfig);
    } else {
        tableData = [data._id, data.model, data.year, `NZD$ ${data.price}`];
        tableOutput = table([titleOutput, carsTableHeaders, tableData], carsTableConfig);
    }

    return tableOutput;
};
