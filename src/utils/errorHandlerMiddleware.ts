import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import { chalkLogger } from './chalkLogger';
import { AppError } from './errors/AppError';


function errorHandlingMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
	if (error instanceof AppError) {
		chalkLogger.log('error', error.message);
		return res.status(error.statusCode).send({ message: error.message, status: 'error' });
	}
	else {
		chalkLogger.logObject('error', error);
		return res.status(500).send({message: 'Internal server error', status: 'error'});
	}
}

export default errorHandlingMiddleware;
