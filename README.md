# Mission Ready - Mission 4 CLI

Data Management: Develop a command-line interface (CLI) tool to seed data into your local MongoDB database or delete data from it. Ensure that this tool is source-controlled and includes the seed data. Team members should be able to seed data by cloning the repository.

# About

This project is part of my studies on Mission Ready. It is a CLI to manage and handle a database.
The CLI has to be used on a frontend query to give alternatives/similars cars prompted that are in our database."

IMPORTANT => For learning purposes, I am using a local mongoDB database.

# Install

If you're using any recent version of NPM you can install locally and run commands with npx

    npm install turners-cli-tavares

Optionally, you can install globally and there's no need to use npx

    npm install turners-cli-tabares -g

# Commands and Usage

The way to access the CLI is:

    npx turners-cli | npx tcli

For info and list of commands:

    npx turners-cli --help | npx tcli -h

Any of the following command with the flag of -h will give more details on the command

    npx tcli d -h
    npx tcli a -h
    npx tcli cl -
    ...

For now there's a dev command to help me test and reset my db to a clean point. This command will add 50 cars entries to the DB.

    npx turners-cli hard-reset | npx tcli hr

To log a list of the cars on the db on a table format:

    npx turners-cli cars-list | npx tcli cl

To log a list of cars on the db as Javascript Objects / JSON:

    npx turners-cli cars-obj-list | npx tcli col

To add a single entry manually:

    npx turners-cli add-car | npx tcli a

To delete a single entry manually:
This command MUST have a arg of type passed. It'll choose if you want to delete it by ID or model/name.
The way it works is through a mongoose search. It'll aske you to pass a query or an id depending on which flag you pass.
In case of multiple entries for the model flag you'll get a list of the duplicates logged and be asked to pick the id of
the one you want to delete.

    npx turners-cli delete-car | npx tcli d <type> id | model

Try

    npx tcli d -t model
    npx tcli d -t id
