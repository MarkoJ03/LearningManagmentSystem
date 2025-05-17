import { Nastavnik } from "./Nastavnik";


export interface Obavestenje {
  id: number;
  vidljiv: boolean;
  nastavnik: Nastavnik;
  naslov: string;
  sadrzaj: string;
}