import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Radnik = new Schema({

    ime: {
        type:String
    },
    prezime:{
        type:String
    },
    telefon:{
        type:Number
    },
    imejl:{
        type:String
    },
    specijalizacija:{
        type:String
    },
    agencija:{
        type:String
    },
    angazovan:{
        type:String
    },
    prostorija:{
        type: Number
    }
})

export default mongoose.model('RadnikModel', Radnik, 'radnici')