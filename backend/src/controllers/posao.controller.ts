import express from 'express'
import PosaoModel from '../models/posao'
import ZahtevOtkazivanjeModel from '../models/zahtev-otkazivanje'
import korisnik from '../models/korisnik'
import posao from '../models/posao'


export class PosaoController{
    dodaj = (req: express.Request, res: express.Response)=>{
        let posao = new PosaoModel(req.body)
        posao.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }
    azuriraj= (req: express.Request, res: express.Response)=>{
        PosaoModel.updateOne({'_id':req.body._id}, {$set:{'status':req.body.status, 'agencija':req.body.agencija, 'agencija_ime':req.body.agencija_ime,
    'klijent':req.body.klijent, 'objekat':req.body.objekat, 'ponuda':req.body.ponuda, 'pocetak':req.body.pocetak, 'kraj':req.body.kraj, 'placen':req.body.placen}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message':'ok'})
        })
    }
    dohvati_sve_= (req: express.Request, res: express.Response)=>{
        PosaoModel.find({}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }
    dohvati_sve_za_klijenta = (req: express.Request, res: express.Response)=>{
        PosaoModel.find({'klijent':req.body.id}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }
    dohvati_sve_za_agenciju = (req: express.Request, res: express.Response)=>{
        PosaoModel.find({'agencija':req.body.id}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }
    zahtev_otkazivanje = (req: express.Request, res: express.Response)=>{
        let zahtev = new ZahtevOtkazivanjeModel(req.body)
        zahtev.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({"message": "ok"})
        })
    }
    dohvati_zahtev_za_otkazivanjem = (req: express.Request, res: express.Response)=>{
        ZahtevOtkazivanjeModel.find({'posao':req.body.id}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json(resp)
        })
    }
    azuriraj_zahtev_za_otkazivanjem = (req: express.Request, res: express.Response)=>{
        ZahtevOtkazivanjeModel.updateOne({'_id':req.body._id},{$set:{'status':req.body.status}}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else {
                //obrada

                korisnik.find({},(err, resp)=>{
                    for(let a of resp){
                        if(a['uloga']=='agencija'){
                            posao.find({'agencija':a['korisnicko_ime']}, (err, respp)=>{
                                var cnt=0
                                let br=0;
                                let max = respp.length
                                for(let p of respp){
                                    console.log(p['_id'].toString())
                                    ZahtevOtkazivanjeModel.find({posao:p['_id'].toString(), status:'Одобрен'}, (err, zaht)=>{
                                        if(zaht){
                                            cnt+=zaht.length
                                        }
                                        if(br==(max-1)){
                                            if(cnt>=3){
                                                korisnik.updateOne({'korisnicko_ime':a['korisnicko_ime']}, {$set:{'blokiran':true, 'datum':new Date()}}, (err, ack)=>{
                                                    
                                                })
                                                for(let pp of respp){
                                                    ZahtevOtkazivanjeModel.deleteOne({posao:pp['_id'].toString(),'status':'Одобрен'}, (err, ackk)=>{

                                                    })
                                                }
                                            }
                                        }
                                        br++;
                                    })
                                } 
                            })
                        }
                    }
                })
                res.json({'message':'ok'})
            }

        })
        
    }
    obrisi=(req: express.Request, res: express.Response)=>{
        PosaoModel.deleteOne({'_id':req.body._id}, (err, resp)=>{
            if(err) {
                res.status(400).json({"message": "err"})
            }
            else res.json({'message':'ok'})
        })
    }
   
    
}