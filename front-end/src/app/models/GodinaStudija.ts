import { StudentNaGodini } from './StudentNaGodini';

export interface GodinaStudija {
  id: number;
  godina: string;
  vidljiv: boolean;
  studijskiProgram_id: number;
  studentiNaGodini?: StudentNaGodini[]; 
}
