import express, { json, Request, Response, NextFunction } from "express";
import cors from "cors";
import 'express-async-errors';
import router from "./routers/index.js";
import errorHandlingMiddleware from "./utils/errorHandlerMiddleware.js";

const app = express();

app.use(cors());
app.use(json());

app.use(router);
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to DrivenPass! :)' });
});

app.use(errorHandlingMiddleware);

export default app;