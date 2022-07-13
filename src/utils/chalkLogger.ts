import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';


const types = {
    middleware: chalk.bold.magenta('  [Middleware]'),
    controller: chalk.bold.blueBright('[Controller]'),
    service: chalk.bold.magenta('    [Service]'),
    db: chalk.bold.blue('      [db]'),
    api: chalk.bold.blue('      [API]'),
    log: chalk.bold.gray.italic('[Log]'),
    route: chalk.bold.blueBright('[Route]'),
    server: chalk.bold.yellow('[Server]'),
    error: chalk.bold.red('[ERROR]')
};


function log (type: any, message: string) {
    console.log(`${types[type as keyof typeof types]} ${message}`);
}

function logObject (type: any, obj: object) {
    console.log(`${types[type as keyof typeof types]}`);
    console.log(obj);
}

export const chalkLogger = {
    log, logObject
}
