"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const chalk_1 = __importDefault(require("chalk"));
dotenv_1.default.config();
const port = Number(process.env.PORT) || 5000;
app_1.default.listen(port, () => console.log(chalk_1.default.bold.green(`Servidor em pé na porta ${port}`)));
