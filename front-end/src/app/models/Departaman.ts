
import { DepartmanNastavnik } from './DepartmanNastavnik';
import { Fakultet } from './Fakultet';
import { Nastavnik } from './Nastavnik';

export interface Departman {
  id: number;
  naziv: string;
  vidljiv: boolean;
  fakultet: Fakultet;
  sekretarDepartmana: Nastavnik;
  direktorDepartmana: Nastavnik;
  nastavnici?: DepartmanNastavnik[];
}
