"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diaryEntries_1 = __importDefault(require("../../data/diaryEntries"));
const getEntries = () => {
    return diaryEntries_1.default;
};
const getNonSensitiveEntries = () => {
    return diaryEntries_1.default.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }));
};
const addDiary = () => {
    return null;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addDiary
};
