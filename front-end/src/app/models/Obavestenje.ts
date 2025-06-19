import { Nastavnik } from "./Nastavnik";
import { Predmet } from "./Predmet";


export interface Obavestenje {
  id: number;
  nastavnik: Nastavnik;
  naslov: string;
  sadrzaj: string;
  predmet: Predmet;

  vidljiv: boolean;

}