
import { DepartmanNastavnik } from './DepartmanNastavnik';

export interface Departman {
  id: number;
  naziv: string;
  vidljiv: boolean;
  fakultet_id: number;
  sekretarDepartmana_id: number;
  direktorDepartmana_id: number;
  nastavnici?: DepartmanNastavnik[];
}
