"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Posao = new Schema({
    agencija: {
        type: String
    },
    agencija_ime: {
        type: String
    },
    klijent: {
        type: String
    },
    objekat: {
        type: String
    },
    pocetak: {
        type: Date
    },
    kraj: {
        type: Date
    },
    status: {
        type: String
    },
    placen: {
        type: Boolean
    },
    ponuda: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('PosaoModel', Posao, 'poslovi');
//# sourceMappingURL=posao.js.map