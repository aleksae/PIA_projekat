"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ZahtevOtkazivanje = new Schema({
    posao: {
        type: String
    },
    klijent: {
        type: String
    },
    razlog: {
        type: String
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model('ZahtevOtkazivanjeModel', ZahtevOtkazivanje, 'zahtev_za_otkazivanjem');
//# sourceMappingURL=zahtev-otkazivanje.js.map