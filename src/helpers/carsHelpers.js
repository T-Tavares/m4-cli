import chalk from 'chalk';

export const addCarPrompts = [
    {
        type: 'input',
        name: 'model',
        message: `What's the car model?`,
    },
    {
        type: 'input',
        name: 'year',
        message: `What's the car year?`,
    },
    {
        type: 'input',
        name: 'price',
        message: `What's the car price?`,
    },
];

export const carsInitDB = [
    {
        model: 'Tesla X',
        year: 2015,
        price: 12000,
    },
    {
        model: 'Tesla Y',
        year: 2022,
        price: 22000,
    },
];

export const carsTableHeaders = [
    chalk.hex('#0073cf').bold('Model'),
    chalk.hex('#0073cf')('Year'),
    chalk.hex('#0073cf')('Price'),
];
