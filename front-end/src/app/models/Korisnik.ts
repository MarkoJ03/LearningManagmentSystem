import { DodeljenoPravoPristupa } from "./DodeljenoPravoPristupa";

export interface Korisnik {
  id: number;
  email: string;
  lozinka: string;
  dodeljenaPravaPristupa?: DodeljenoPravoPristupa[];
  vidljiv: boolean;
}
