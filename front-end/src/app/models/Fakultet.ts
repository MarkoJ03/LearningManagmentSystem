import { Departman } from './Departaman';

export interface Fakultet {
  id: number;
  naziv: string;
  vidljiv: boolean;
  univerzitet_id: number; 
  departmani?: Departman[]; 

}
