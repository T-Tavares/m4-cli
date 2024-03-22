All the functions here will have a cli argument set to false.
That's because those functions where though to serv both CLI and Backend
When using on the CLI please remember to pass a true argument in the beginning for it to work

Usage:

#### CLI Usage

```
    addCar(true)
    deleteCar(true, <typeOfDeletion>) // Types of Deletion: 'id' or 'model'. Passed on the Terminal with the -t flag
    queryCarBy(true, <typeOfQuery>) // Types of query:  'id', 'model', 'year' or 'price'. Passed on the Terminal with the -t flag
```

#### Backend Usage

```
    addCar(carObj) // Requires a carObj to be added. ex::. {model: 'Honda', year: 2023, price: 13000}
    deleteCar(type, carIdentifier) // Types of Deletion: 'id' or 'model'.
```

The query function needs a refactoring into multiple functions
For logic and readability reasons. For now only the id and model types are allowed on the query function.

Because my next project is starting. This will be my last retouch on this project (For now at least)
But the big takeaway from here was something that always come back to me.
Break your functions to simple tasks each.
