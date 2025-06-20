import { Departman } from './Departaman';
import { Univerzitet } from './Univerzitet';

export interface Fakultet {
  id: number;
  naziv: string;
  vidljiv: boolean;
  univerzitet: Univerzitet; 
  departmani?: Departman[]; 

}
