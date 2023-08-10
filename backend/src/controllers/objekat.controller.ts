import express from 'express'
import ObjekatModel from '../models/objekat'


export class ObjekatController{
    dodaj = (req: express.Request, res: express.Response)=>{
        let objekat  = new ObjekatModel(req.body)
        objekat.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }
    dohvati_sve_za_korisnika = (req: express.Request, res: express.Response)=>{
        ObjekatModel.find({'korisnik':req.body.korisnik}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }

    obrisi = (req: express.Request, res:express.Response)=>{
        ObjekatModel.deleteOne({'_id':req.body.id}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }
    
    dohvati_jedan = (req: express.Request, res: express.Response)=>{
        ObjekatModel.find({'_id':req.body.id}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }
    azuriraj = (req: express.Request, res: express.Response)=>{
        ObjekatModel.updateOne({'_id':req.body._id}, {'tip':req.body.tip, 'adresa':req.body.adresa, 'kvadratura':req.body.kvadratura, 
        'broj_prostorija':req.body.broj_prostorija, 'sirina_kanvasa':req.body.sirina_kanvasa, 'korisnik':req.body.korisnik, 'prostorije':req.body.prostorije}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }
    
}