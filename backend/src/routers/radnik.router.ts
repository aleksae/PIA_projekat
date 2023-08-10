import express from 'express'
import { RadnikController } from '../controllers/radnik.controller';


const radnikRouter = express.Router();

radnikRouter.route('/dodaj').post(
    (req, res)=>new RadnikController().dodaj(req, res)
)

radnikRouter.route('/azuriraj').post(
    (req, res)=>new RadnikController().azuriraj(req, res)
)
radnikRouter.route('/obrisi').post(
    (req, res)=>new RadnikController().obrisi(req, res)
)
radnikRouter.route('/dohvati_sve_za_agenciju').post(
    (req, res)=>new RadnikController().dohvati_sve_za_agenciju(req, res)
)
radnikRouter.route('/dodaj_zahtev_za_radna_mesta').post(
    (req, res)=>new RadnikController().dodaj_zahtev_za_radna_mesta(req, res)
)
radnikRouter.route('/dohvati_zahteve_za_radna_mesta_za_agenciju').post(
    (req, res)=>new RadnikController().dohvati_zahteve_za_radna_mesta_za_agenciju(req, res)
)
radnikRouter.route('/dohvati_zahteve_za_radna_mesta').post(
    (req, res)=>new RadnikController().dohvati_zahteve_za_radna_mesta(req, res)
)
radnikRouter.route('/oslobodi_radnika_posao_prostorija').post(
    (req, res)=>new RadnikController().oslobodi_radnika_posao_prostorija(req, res)
)
radnikRouter.route('/azuriraj_zahtev_za_radnim_mestom').post(
    (req, res)=>new RadnikController().azuriraj_zahtev_za_radnim_mestom(req, res)
)

//dohvati_zahtev_za_otkazivanjem


export default radnikRouter