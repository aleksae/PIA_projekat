import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Objekat= new Schema({
    tip: {
        type: String
    },
    adresa:{
        type: String
    },
    kvadratura:{
        type: Number
    },
    broj_prostorija:{
        type: Number
    },
    sirina_kanvasa:{
        type: Number
    },
    korisnik:{
        type: String
    },
    prostorije:{
        type: Array<Object>
    }
})


export default mongoose.model('Objekat', Objekat, 'objekti')