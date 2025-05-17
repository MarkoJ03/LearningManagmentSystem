import { ValidatorFn } from "@angular/forms";

export interface FormaModel{
    naziv: string,
    polja: PoljeModel[]

}


interface PoljeModel{
    naziv: string,
    labela: string,
    tip: string,
    podrazumevanaVrednost: any,
    opcije?: any[],
    validatori?: ValidatorFn[] | ValidatorFn
    displayFn?: (v: any) => string
}