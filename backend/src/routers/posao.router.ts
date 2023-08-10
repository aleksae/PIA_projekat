import express from 'express'
import { PosaoController } from '../controllers/posao.controller';


const posaoRouter = express.Router();

posaoRouter.route('/dodaj').post(
    (req, res)=>new PosaoController().dodaj(req, res)
)

posaoRouter.route('/sve_za_klijenta').post(
    (req, res)=>new PosaoController().dohvati_sve_za_klijenta(req, res)
)
posaoRouter.route('/sve_za_agenciju').post(
    (req, res)=>new PosaoController().dohvati_sve_za_agenciju(req, res)
)
posaoRouter.route('/zahtev_za_otkazivanjem').post(
    (req, res)=>new PosaoController().zahtev_otkazivanje(req, res)
)
//dohvati_zahtev_za_otkazivanjem
posaoRouter.route('/dohvati_zahtev_za_otkazivanjem').post(
    (req, res)=>new PosaoController().dohvati_zahtev_za_otkazivanjem(req, res)
)
posaoRouter.route('/azuriraj').post(
    (req, res)=>new PosaoController().azuriraj(req, res)
)
posaoRouter.route('/obrisi').post(
    (req, res)=>new PosaoController().obrisi(req, res)
)
posaoRouter.route('/sve').post(
    (req, res)=>new PosaoController().dohvati_sve_(req, res)
)
posaoRouter.route('/azuriraj_zahtev_za_otkazivanjem').post(
    (req, res)=>new PosaoController().azuriraj_zahtev_za_otkazivanjem(req, res)
)




export default posaoRouter