import express from 'express'
import { ObjekatController } from '../controllers/objekat.controller';


const objekatRouter = express.Router();

objekatRouter.route('/dodaj').post(
    (req, res)=>new ObjekatController().dodaj(req, res)
)
objekatRouter.route('/dohvati_sve_za_korisnika').post(
    (req, res)=>new ObjekatController().dohvati_sve_za_korisnika(req, res)
)
objekatRouter.route('/brisanje').post(
    (req, res)=>new ObjekatController().obrisi(req, res)
)
objekatRouter.route('/dohvati_jedan').post(
    (req, res)=>new ObjekatController().dohvati_jedan(req, res)
)
objekatRouter.route('/azuriraj').post(
    (req, res)=>new ObjekatController().azuriraj(req, res)
)

export default objekatRouter