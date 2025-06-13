import { Nastavnik } from "./Nastavnik";
import { Predmet } from "./Predmet";


export interface Obavestenje {
  id: number;
  vidljiv: boolean;
  nastavnik: Nastavnik;
  naslov: string;
  sadrzaj: string;
  predmet: Predmet;
}