import { DodeljenoPravoPristupa } from "./DodeljenoPravoPristupa";

export interface PravoPristupa {
    id: number;
    naziv: string;
    dodeljenaPravaPristupa?: DodeljenoPravoPristupa[];
}