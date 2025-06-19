
import { DepartmanNastavnik } from './DepartmanNastavnik';
import { Fakultet } from './Fakultet';
import { Katedra } from './Katedra';
import { Nastavnik } from './Nastavnik';

export interface Departman {
  id: number;
  naziv: string;
  vidljiv: boolean;
  fakultet: Fakultet;
  sekretarDepartmana: Nastavnik;
  direktorDepartmana: Nastavnik;
  katedre?: Katedra[],
  nastavnici: Nastavnik[];

}