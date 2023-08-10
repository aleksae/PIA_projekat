import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
})

export default mongoose.model('KomentarModel', Komentar, 'komentari')