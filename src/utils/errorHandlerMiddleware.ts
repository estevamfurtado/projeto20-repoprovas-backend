import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import { chalkLogger } from './chalkLogger.js';
import { AppError } from './errors/AppError.js';


function errorHandlingMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
	if (error instanceof AppError) {
		chalkLogger.log('error', error.message);
		return res.status(error.statusCode).send({ message: error.message, status: 'error' });
	}
	else {
		console.log('error', error);
		return res.status(500).send({message: 'Internal server error', status: 'error'});
	}
}

export default errorHandlingMiddleware;
