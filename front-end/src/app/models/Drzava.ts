import { Grad } from "./Grad";

export interface Drzava{
    id:number
    naziv:string
    gradovi: Grad[];
    vidljiv: boolean
}
