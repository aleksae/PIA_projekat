"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Radnik = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    telefon: {
        type: Number
    },
    imejl: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    agencija: {
        type: String
    },
    angazovan: {
        type: String
    },
    prostorija: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('RadnikModel', Radnik, 'radnici');
//# sourceMappingURL=radnik.js.map