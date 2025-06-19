import { Drzava } from "./Drzava"

export interface Grad{
    id:number
    naziv:string
    drzava:Drzava
    vidljiv: boolean
}