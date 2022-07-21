"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localsFromRequestData = void 0;
const chalkLogger_1 = require("../utils/chalkLogger");
function localsFromRequestData(req, res, next) {
    chalkLogger_1.chalkLogger.log('middleware', 'Saving request data to locals');
    const locals = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, res.locals), req.body), req.query), req.params), req.headers);
    res.locals = locals;
    next();
}
exports.localsFromRequestData = localsFromRequestData;
