import {table} from 'table';
import chalk from 'chalk';

// ------------------------- TABLE TITLE -------------------------- //

export const tableTitle = title => [
    `${chalk.hex('#b71234').bold('●')}${chalk.hex('#0073cf').bold('Turners')}${chalk
        .hex('#555')
        .bold('Cars')} - ${title}`,
    '',
    '',
    '',
];

// ---------------------------------------------------------------- //
// --------------------------- MESSAGES --------------------------- //
// ---------------------------------------------------------------- //

export const warningMsg = (msg = 'That is a destructive action') =>
    `${chalk.yellow('WARNING')} - ${chalk.red(msg)} - ${chalk.yellow('WARNING')}\n`;

export const successMsg = (msg = 'Operation Completed') =>
    `${chalk.hex('#67EA06')('SUCCESS')} - ${chalk.hex('#05D391')(msg)} - ${chalk.hex('#67EA06')('SUCCESS')}\n`;

export const failMsg = (msg = 'Something went wrong') =>
    `${chalk.hex('#F46909')('FAIL')} - ${chalk.hex('#F4C909')(msg)} - ${chalk.hex('#F46909')('FAIL')}\n`;

const noMatchesString =
    'There are no matches for your entry. Please try again.\n\nFor a complete list of the Cars DB use the command:\ntcli cl\n';
export const noMatchesMsg = (msg = noMatchesString) => `${failMsg()}${msg}${failMsg()}`;

export const devTempMsg = (msg = "That's a Temporary Development command.") =>
    `${chalk.hex('#39EB00')('DEV')} - ${chalk.hex('#44A326')(msg)} - ${chalk.hex('#39EB00')('DEV')}\n`;

// ---------------------------------------------------------------- //
// ------------------------- CLI HELPERS -------------------------- //
// ---------------------------------------------------------------- //

export const descriptionMsg = () => {
    const options = {columnDefault: {alignment: 'center', paddingRight: 20, paddingLeft: 20}};
    const descriptionText = [
        [
            `${chalk.hex('#b71234').bold('●')}${chalk.hex('#0073cf').bold('Turners')}${chalk
                .hex('#555')
                .bold('Cars')} - Command Line Interface (CLI)`,
        ],
    ];

    const header = table(descriptionText, options);
    return `${header}\nThis project is a MVP for a CLI to access and manage TurnersCars Database.`;
};

export const cliReturn = cli => cli && process.exit();
