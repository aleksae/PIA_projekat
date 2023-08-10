"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Komentar = new Schema({
    agencija: {
        type: String
    },
    klijent: {
        type: String
    },
    ocena: {
        type: Number
    },
    komentar: {
        type: String
    },
    posao: {
        type: String
    }
});
exports.default = mongoose_1.default.model('KomentarModel', Komentar, 'komentari');
//# sourceMappingURL=komentar.js.map