import { Biblioteka } from "./Biblioteka";
import { Knjiga } from "./Knjiga";


export interface BibliotekaKnjiga {
  id: number;
  vidljiv: boolean;
  biblioteka: Biblioteka;
  knjiga: Knjiga;
  
}
