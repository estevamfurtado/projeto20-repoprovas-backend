"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObjectToUpdateQuery = void 0;
function mapObjectToUpdateQuery({ object, offset = 1 }) {
    const objectColumns = Object.keys(object).map((key, index) => `"${key}"=$${index + offset}`).join(",");
    const objectValues = Object.values(object);
    return { objectColumns, objectValues };
}
exports.mapObjectToUpdateQuery = mapObjectToUpdateQuery;
