// ---------------------------------------------------------------- //
// ------------------------- CAR PROMPTS -------------------------- //
// ---------------------------------------------------------------- //

// ----------------------- ADD CAR PROMPTS ------------------------ //

export const addCarPrompt = () => [
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

// ---------------------- DELETE CAR PROMPT ----------------------- //
export const deleteCarPrompt = type => [
    {
        type: 'input',
        name: type,
        message: `Please provide us with the ${type} of the car you wish to delete from the DB.`,
    },
];

// ---------------------- QUERY CAR PROMPTS ----------------------- //
export const queryCarPrompt = type => [
    {
        type: 'input',
        name: type,
        message: `Please provide us with the ${type} you with to search on our DB.`,
    },
];
