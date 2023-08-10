import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ZahtevOtkazivanje= new Schema({
    agencija:{
        type: String
    },
    broj_mesta:{
        type: Number
    },
    status:{
        type: String
    }

})


export default mongoose.model('ZahtevRadnaMestaModel', ZahtevOtkazivanje, 'zahtevi_za_radna_mesta')