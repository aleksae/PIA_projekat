import express from 'express'
import korisnik from '../models/korisnik';
import KorisnikModel from '../models/korisnik'
import KomentarModel from '../models/komentar'
import PrivremeniLinkModel from '../models/privremeni_link'

export class KorisnikController{
   

    odobrenost = (req: express.Request, res: express.Response)=>{
        
        /*korisnik.updateOne({'korisnicko_ime':req.body.korisnicko_ime}, {$set:{'odobren':req.body.odobren, 'odbijen':req.body.odbijen}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message':'ok'})
        })*/
        const fs = require('fs')
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
    }
    prijava = (req: express.Request, rest: express.Response)=>{
        let k_ime = req.body.korisnicko_ime;
        let lozinka_hash = req.body.lozinka;

        korisnik.findOne({'korisnicko_ime' : k_ime, "lozinka": lozinka_hash}, (err, korisnik)=>{
            if(err) rest.json({"message":err})
            else rest.json(korisnik)
        });
    }

    azuriraj_klijenta = (req: express.Request, res: express.Response)=>{
        KorisnikModel.updateOne({'korisnicko_ime':req.body.korisnicko_ime}, {$set: {dodatno: req.body.dodatno, 'imejl': req.body.imejl, br_telefona: req.body.br_telefona, profilna_slika: req.body.profilna_slika}},  (err, uspeh)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }

    registracija = (req: express.Request, res: express.Response)=>{
        let user = new KorisnikModel({
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka: req.body.lozinka,
            br_telefona: req.body.br_telefona,
            imejl: req.body.imejl,
            uloga: req.body.uloga,
            dodatno: req.body.dodatno,
            profilna_slika: req.body.profilna_slika,
            odobren: req.body.odobren,
            odbijen: req.body.odbijen
        })


        //ako se isto zovu, let user = new UserModel(req.body)

        user.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }

    dohvatiSve = (req: express.Request, res: express.Response)=>{

        korisnik.find({}, (err, korisnici)=>{
            if(err) res.json({'message':err})
            else res.json(korisnici)
        })
    };
    promena_lozinke = (req: express.Request, res: express.Response)=>{
        KorisnikModel.updateOne({'imejl': req.body.mejl}, {$set: {'lozinka': req.body.lozinka}}, (err, kor)=>{
            if(err) res.json({'message':'err'})
            else {
                if(req.body.token!=-1){
                    PrivremeniLinkModel.deleteOne({'token': req.body.token}, (err, result)=>{
                        if(err) res.json({'message':'err'})
                        
                    })
                }
                res.json({'message':'updated'})
            }
        })
    }
    dodaj_komentar = (req: express.Request, res: express.Response)=>{
        let kom = new KomentarModel(req.body)
        kom.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        }) 
    }
    uredi_komentar = (req: express.Request, res: express.Response)=>{
        KomentarModel.deleteOne({'_id':req.body.id}, (err, resp)=>{
            let kom = new KomentarModel(req.body)
            kom.save((err, resp)=>{
                if(err) {
                    res.status(400).json({"message": "err"})
                }
                else res.json({"message": "ok"})
            }) 
        })
        
    }
    obrisi_komentar = (req: express.Request, res: express.Response)=>{
        KomentarModel.deleteOne({'_id':req.body._id}, (err, resp)=>{
            let kom = new KomentarModel(req.body)    
                if(err) res.status(400).json({"message": "err"})
                else res.json({"message": "ok"})
        
        })
        
    }
    komentari_za_agenciju = (req: express.Request, res: express.Response)=>{
        KomentarModel.find({'agencija':req.body.id}, (err, resp)=>{
            if(err) res.json({'message':err})
            else res.json(resp)
        })
    }
    komentari_za_klijenta = (req: express.Request, res: express.Response)=>{
        KomentarModel.find({'klijent':req.body.id}, (err, resp)=>{
            if(err) res.json({'message':err})
            else res.json(resp)
        })
    }
    dohvati_korisnika = (req: express.Request, res: express.Response)=>{
        KorisnikModel.findOne({'korisnicko_ime':req.body.id}, (err, resp)=>{
            if(err) res.json({'message':err})
            else res.json(resp)}
            )
    }
    obrisi = (req: express.Request, res: express.Response)=>{
        KorisnikModel.deleteOne({'korisnicko_ime':req.body.korisnicko_ime}, (err, resp)=>{
            if(err) res.json({'message':err})
            else res.json(resp)}
            )
    }
    dohvati_sliku= (req:express.Request, res:express.Response)=>{
        
    }
    
}