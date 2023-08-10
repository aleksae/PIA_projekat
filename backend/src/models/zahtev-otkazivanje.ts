import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ZahtevOtkazivanje= new Schema({
    posao:{
        type: String
    },
    klijent:{
        type: String
    },
    razlog:{
        type: String
    },
    status:{
        type: String
    }

})


export default mongoose.model('ZahtevOtkazivanjeModel', ZahtevOtkazivanje, 'zahtev_za_otkazivanjem')