"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Objekat = new Schema({
    tip: {
        type: String
    },
    adresa: {
        type: String
    },
    kvadratura: {
        type: Number
    },
    broj_prostorija: {
        type: Number
    },
    sirina_kanvasa: {
        type: Number
    },
    korisnik: {
        type: String
    },
    prostorije: {
        type: (Array)
    }
});
exports.default = mongoose_1.default.model('Objekat', Objekat, 'objekti');
//# sourceMappingURL=objekat.js.map