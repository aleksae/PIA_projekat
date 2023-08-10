import { Vrata } from "./vrata";

export class Prostorija{
    sirina: number;
    visina: number;
    pozicija_x:number;
    pozicija_y:number;
    postavljeno: boolean;
    boja_okvir:string = "black";
    boja_popuna:string = "white";
    vrata:Array<Vrata> = []
}