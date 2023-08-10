import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller';


const korisnikRouter = express.Router();

korisnikRouter.route('/prijava').post(
    (req, res)=>new KorisnikController().prijava(req, res)
)

korisnikRouter.route('/registracija').post(
    (req, res)=>{
        console.log("registracijaaaaaaaaa");
        new KorisnikController().registracija(req, res)
    }
)

korisnikRouter.route('/svi_korisnici').get(
    (req, res)=>{
        new KorisnikController().dohvatiSve(req, res)
    }
)
korisnikRouter.route('/svi_korisnici').get(
    (req, res)=>{
        new KorisnikController().dohvatiSve(req, res)
    }
)
korisnikRouter.route('/promena_lozinke').post(
    (req, res)=>{
        new KorisnikController().promena_lozinke(req, res)
    }
)
korisnikRouter.route('/azuriraj_klijenta').post(
    (req, res)=>{
        new KorisnikController().azuriraj_klijenta(req, res)
    }
)
korisnikRouter.route('/komentari_za_agenciju').post(
    (req, res)=>{
        new KorisnikController().komentari_za_agenciju(req, res)
    }
)
korisnikRouter.route('/komentari_za_klijenta').post(
    (req, res)=>{
        new KorisnikController().komentari_za_klijenta(req, res)
    }
)
korisnikRouter.route('/dohvati_korisnika').post(
    (req, res)=>{
        new KorisnikController().dohvati_korisnika(req, res)
    }
)
korisnikRouter.route('/dodaj_komentar').post(
    (req, res)=>{
        new KorisnikController().dodaj_komentar(req, res)
    }
)
korisnikRouter.route('/uredi_komentar').post(
    (req, res)=>{
        new KorisnikController().uredi_komentar(req, res)
    }
)
korisnikRouter.route('/obrisi_komentar').post(
    (req, res)=>{
        new KorisnikController().obrisi_komentar(req, res)
    }
)
korisnikRouter.route('/odobrenost').post(
    (req, res)=>{
        new KorisnikController().odobrenost(req, res)
    }
)
korisnikRouter.route('/obrisi').post(
    (req, res)=>{
        new KorisnikController().obrisi(req, res)
    }
)
korisnikRouter.route('/prikaz_slike/:id').get((req, res)=>{
    const fs = require('fs')
    console.log(req.params.id)
    try{
        fs.readFile('public/'+req.params.id, function(err, data) {
          if (err) throw err;
          else {
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data);
          }
        });
      }catch{
        console.log("Doslo je do greske prilikom ucitavanja slike");
        res.status(400);
      }
})


export default korisnikRouter;