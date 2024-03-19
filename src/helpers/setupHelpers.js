import {table} from 'table';
import chalk from 'chalk';
// --------------------------- GENERAL ---------------------------- //

export const log = console.log;

// ------------------------- CHALK SETUP -------------------------- //

export const dangerLog = chalk.red;
export const warningLog = chalk.yellow;
export const okLog = chalk.green;

// ------------------------- TABLE CONFIG ------------------------- //

export const tableTitle = title => [
    `${chalk.hex('#b71234').bold('●')}${chalk.hex('#0073cf').bold('Turners')}${chalk
        .hex('#555')
        .bold('Cars')} - ${title}`,
    '',
    '',
];

// TODO FIX COLSPAN OF TITLE TO BE PROGRAMATICALLY OR AUTOMATICALLY ADDED

export const tableConfig = {
    spanningCells: [{col: 0, row: 0, colSpan: 3, alignment: 'center'}],
    columns: [
        {alignment: 'left', width: 20},
        {alignment: 'center', width: 15},
        {alignment: 'right', width: 20},
    ],
    columnDefault: {
        paddingLeft: 1,
        paddingRight: 1,
    },
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
