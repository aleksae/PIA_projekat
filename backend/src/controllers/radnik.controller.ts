import express from 'express'
import RadnikModel from '../models/radnik'
import zahtevRadnaMesta from '../models/zahtev-radna-mesta'


 
export class RadnikController{
    dodaj = (req: express.Request, res: express.Response)=>{
        let radnik= new RadnikModel(req.body)
        radnik.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }
    oslobodi_radnika_posao_prostorija = (req: express.Request, res: express.Response)=>{
        RadnikModel.updateMany({'angazovan':req.body.angazovan,
        'prostorija':req.body.prostorija}, {$set:{
            'angazovan':"",
            'prostorija':-1
        }},(err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }
    azuriraj = (req: express.Request, res: express.Response)=>{
        RadnikModel.updateOne({"_id":req.body._id}, {$set:{
            'ime':req.body.ime, 'prezime':req.body.prezime, 'telefon':req.body.telefon, 
            'imejl':req.body.imejl, 'specijalizacija':req.body.specijalizacija, 'angazovan':req.body.angazovan,
            'prostorija':req.body.prostorija
        }},(err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }
    obrisi = (req: express.Request, res: express.Response)=>{
        RadnikModel.deleteMany({"_id":req.body.id},(err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }
    dohvati_sve_za_agenciju = (req: express.Request, res: express.Response)=>{
        RadnikModel.find({"agencija":req.body.id},(err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }
    dodaj_zahtev_za_radna_mesta =  (req: express.Request, res: express.Response)=>{
        let zahtev = new zahtevRadnaMesta(req.body)
        zahtev.save((err, resp)=>{
            if(err) console.log(err)
            else res.json({'message':'ok'})
        })
    }
    dohvati_zahteve_za_radna_mesta = (req: express.Request, res: express.Response)=>{
        zahtevRadnaMesta.find({}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }
    dohvati_zahteve_za_radna_mesta_za_agenciju = (req: express.Request, res: express.Response)=>{
        zahtevRadnaMesta.find({'agencija':req.body.agencija}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }
    azuriraj_zahtev_za_radnim_mestom = (req: express.Request, res: express.Response)=>{
        zahtevRadnaMesta.updateOne({'_id':req.body._id}, {$set:{'status':req.body.status}}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }



    
}