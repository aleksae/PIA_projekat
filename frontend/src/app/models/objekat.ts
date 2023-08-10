import { Prostorija } from "./prostorija";

export class Objekat{
    _id:string;
    tip: string;
    adresa: string;
    kvadratura: string;
    broj_prostorija:number;
    sirina_kanvasa:number;
    korisnik:string;
    prostorije:Array<Prostorija>
}