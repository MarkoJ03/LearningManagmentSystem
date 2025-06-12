import { Korisnik } from "./Korisnik";
import { PravoPristupa } from "./PravoPristupa";

export interface DodeljenoPravoPristupa {
    id?: number;
    korisnik: Korisnik;
    pravoPristupa: PravoPristupa;
}