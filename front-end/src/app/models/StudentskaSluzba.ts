import { Objava } from './Objava';
import { Inventar } from './Inventar';
import { Biblioteka } from './Biblioteka';
import { Osoblje } from './Osoblje';
import { Nastavnik } from './Nastavnik';
import { Kalendar } from './Kalendar';
import { Student } from './Student';
import { SvObrazac } from './SvObrazac';

export interface StudentskaSluzba {
  id: number;
  vidljiv: boolean;
  objave_id: Objava[];
  inventari?: Inventar[];
  biblioteka_id: Biblioteka;
  osoblje?: Osoblje[];
  nastavnici?: Nastavnik[];
  kalendari?: Kalendar[];
  studenti?: Student[];
  obrasci?: SvObrazac[];
}
