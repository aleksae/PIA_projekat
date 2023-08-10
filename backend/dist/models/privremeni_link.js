"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let PrivremeniLink = new Schema({
    mejl: {
        type: String
    },
    token: {
        type: String
    },
    rok_vazenja: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('PrivremeniLinkModel', PrivremeniLink, 'privremeni_linkovi');
//# sourceMappingURL=privremeni_link.js.map