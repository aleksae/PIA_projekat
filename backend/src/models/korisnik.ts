import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    br_telefona: {
        type: Number
    },
    imejl: {
        type: String
    },
    uloga: {
        type: String
    },
    dodatno: {
        type: Object
    },
    profilna_slika: {
        type: String
    },
    odobren: {
        type: Boolean
    },
    odbijen:{
        type: Boolean
    },
    blokiran:{
        type:Boolean
    },
    datum:{
        type:Date
    }
})

export default mongoose.model('KorisnikModel', Korisnik, 'korisnici')