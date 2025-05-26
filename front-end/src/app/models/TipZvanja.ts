import { Zvanje } from './Zvanje';

export interface TipZvanja {
  id: number;
  naziv: string;
  vidljiv: boolean;
  zvanja?: Zvanje[];
}
