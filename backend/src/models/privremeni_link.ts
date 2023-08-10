import mongoose from "mongoose";

const Schema = mongoose.Schema;

let PrivremeniLink = new Schema({
    mejl: {
        type: String
    },
    token:{
        type: String
    },
    rok_vazenja:{
        type: Date
    }

})

export default mongoose.model('PrivremeniLinkModel', PrivremeniLink, 'privremeni_linkovi')