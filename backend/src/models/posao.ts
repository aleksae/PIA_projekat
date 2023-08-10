import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Posao= new Schema({
    agencija: {
        type: String
    },
    agencija_ime:{
        type: String
    },
    klijent:{
        type: String
    },
    objekat:{
        type: String
    },
    pocetak:{
        type: Date
    },
    kraj:{
        type: Date
    },
    status:{
        type: String
    },
    placen:{
        type: Boolean
    },
    ponuda:{
        type: Number
    }
})


export default mongoose.model('PosaoModel', Posao, 'poslovi')