"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chalkLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const types = {
    middleware: chalk_1.default.bold.magenta('  [Middleware]'),
    controller: chalk_1.default.bold.blueBright('[Controller]'),
    service: chalk_1.default.bold.magenta('    [Service]'),
    repository: chalk_1.default.bold.magenta('      [Repository]'),
    db: chalk_1.default.bold.blue('      [db]'),
    api: chalk_1.default.bold.blue('      [API]'),
    log: chalk_1.default.bold.gray.italic('[Log]'),
    route: chalk_1.default.bold.blueBright('[Route]'),
    server: chalk_1.default.bold.yellow('[Server]'),
    error: chalk_1.default.bold.red('[ERROR]')
};
function log(type, message) {
    console.log(`${types[type]} ${message}`);
}
function logObject(type, obj) {
    console.log(`${types[type]}`);
    console.log(obj);
}
exports.chalkLogger = {
    log, logObject
};
