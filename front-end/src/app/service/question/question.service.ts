import {Injectable} from '@angular/core';
import {DropdownQuestion} from '../../models/questions/question-dropdown';
import {QuestionBase} from '../../models/questions/question-base';
import {TextboxQuestion} from '../../models/questions/question-textbox';
import {map, of} from 'rxjs';
import { DynamicService } from '../dynamic-service/dynamic.service';

@Injectable()
export class QuestionService {

  constructor(private service: DynamicService){

  }


  getAdresaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'broj',
      label: 'Broj',
      required: true,
    }),
    new TextboxQuestion({
      key: 'drzava',
      label: 'Drzava',
      required: true,
    }),
    new TextboxQuestion({
      key: 'grad',
      label: 'Grad',
      required: true,
    }),
    new TextboxQuestion({
      key: 'ulica',
      label: 'Ulica',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}


  getBibliotekaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentska_sluzba_id',
      label: 'studentska_sluzba_id',
      required: true,
      type: 'number',
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}


  getBibliotekaKnjigaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'biblioteka_id',
      label: 'Biblioteka id',
      required: true,
      type: 'number',
    }),
    new DropdownQuestion({
      key: 'knjiga_id',
      label: 'Knjiga id',
      required: true,
      type: 'number',
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}

getDepartmanQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'fakultet_id',
      label: 'Fakultet id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'sekretarDepartmana_id',
      label: 'Sekretar departmana id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'direktorDepartmana_id',
      label: 'Direktor departmana id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}

getDepartmanNastavnikQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'departman_id',
      label: 'Departman id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'nastavnik_id',
      label: 'Nastavnik id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}

getDokumentiPredmetaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'akreditacija',
      label: 'Akreditacija',
      required: true,
    }),
    new TextboxQuestion({
      key: 'silabus',
      label: 'Silabus',
      required: true,
    }),
    new DropdownQuestion({
      key: 'predmet_id',
      label: 'Predmet id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}

getEvaluacijaZnanjaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'kalendar_id',
      label: 'Kalendar id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'nastavnik_id',
      label: 'Nastavnik id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'predmet_id',
      label: 'Predmet id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'tip_evaluacije_id',
      label: 'Tip Evaluacije id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vreme_pocetka',
      label: 'Vreme pocetka',
      type: 'date',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vreme_zavrsetka',
      label: 'Vreme zavrsetka',
      type: 'date',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getFakultetQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'univerzitet_id',
      label: 'Univerzitet id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getGodinaStudijaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'godina',
      label: 'Godina',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studijskiProgram_id',
      label: 'Studijski program id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getGodinaStudijaPredmetQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'godinaStudija_id',
      label: 'Godina studija id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'predmet_id',
      label: 'Predmet ID',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getGrupaStudenataQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'kalendar_id',
      label: 'Kalendar id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getGrupaStudenataPredmetQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'grupaStudenata_id',
      label: 'Grupa Studenata id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'predmet_id',
      label: 'Predmet id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getInventarQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentskaSluzba_id',
      label: 'Studentska sluzba id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getIshodEvaluacijeQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'bodovi',
      label: 'Bodovi',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'napomena',
      label: 'Napomena',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentNaGodini_id',
      label: 'Student na godini id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'evaluacijaZnanja_id',
      label: 'Evaluacija znanja id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'ishodPredmeta_id',
      label: 'Ishod predmeta id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getIshodPredmetaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'ocena',
      label: 'Ocena',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getKalendarQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentskaSluzba_id',
      label: 'Studentska sluzba id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getKatedraQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'departman_id',
      label: 'Departman id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'sekretarKatedre_id',
      label: 'Sekretar katedre id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'sefKatedre_id',
      label: 'Sef katedre id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getKatedraNastavnikQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'katedra_id',
      label: 'Katedra id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'nastavnik_id',
      label: 'Nastavnik id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getKnjigaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'isbn',
      label: 'ISBN',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getKorisnikQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'email',
      label: 'Email',
      required: true,
      type: 'email',
    }),
    new TextboxQuestion({
      key: 'lozinka',
      label: 'Lozinka',
      required: true,
      type: 'password',
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getNastavnikQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new DropdownQuestion({
      key: 'korisnik_id',
      label: 'Korisnik id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'ime',
      label: 'Ime',
      required: true,
    }),
    new TextboxQuestion({
      key: 'prezime',
      label: 'Prezime',
      required: true,
    }),
    new TextboxQuestion({
      key: 'jmbg',
      label: 'JMBG',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentskaSluzba_id',
      label: 'Studentska sluzba id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getNaucnaOblastQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getObavestenjeQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'nastavnik_id',
      label: 'Nastavnik id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'naslov',
      label: 'Naslov',
      required: true,
    }),
    new TextboxQuestion({
      key: 'sadrzaj',
      label: 'Sadrzaj',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getObjavaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentska_sluzba_id',
      label: 'Studentska sluzba id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'naslov',
      label: 'Naslov',
      required: true,
    }),
    new TextboxQuestion({
      key: 'sadrzaj',
      label: 'Sadrzaj',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getOsobljeQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentska_sluzba_id',
      label: 'Studentska sluzba id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'ime',
      label: 'Ime',
      required: true,
    }),
    new TextboxQuestion({
      key: 'jmbg',
      label: 'JMBG',
      required: true,
    }),
    new TextboxQuestion({
      key: 'prezime',
      label: 'Prezime',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getPredmetQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'esbp',
      label: 'ESBP',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'obavezan',
      label: 'Obavezan',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'brojPredavanja',
      label: 'Broj predavanja',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'brojVezbi',
      label: 'Broj vezbi',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'istrazivackiRad',
      label: 'Istrazivacki rad',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'brojSemestara',
      label: 'Broj semestara',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'opis',
      label: 'Opis',
      required: true,
    }),
    new TextboxQuestion({
      key: 'cilj',
      label: 'Cilj',
      required: true,
    }),
    new DropdownQuestion({
      key: 'dokumenti_id',
      label: 'Dokumenti id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}

getPredmetRealizacijePredmetaQuestions() {
  const questions: QuestionBase<string>[] = [
    new DropdownQuestion({
      key: 'predmet_id',
      label: 'Predmet id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'realizacijaPredmeta_id',
      label: 'Realizacija predmeta id',
      type: 'number',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getRealizacijaPredmetaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new DropdownQuestion({
      key: 'nastavnik_id',
      label: 'Nastavnik id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'tipNastave_id',
      label: 'Tip nastave id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'predmet_id',
      label: 'Predmet id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'ishodPredmeta_id',
      label: 'Ishod predmeta id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getStudentQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new DropdownQuestion({
      key: 'korisnik_id',
      label: 'Korisnik id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'ime',
      label: 'Ime',
      required: true,
    }),
    new TextboxQuestion({
      key: 'prezime',
      label: 'Prezime',
      required: true,
    }),
    new TextboxQuestion({
      key: 'jmbg',
      label: 'JMBG',
      required: true,
    }),
    new DropdownQuestion({
      key: 'adresa_id',
      label: 'Adresa id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentska_sluzba_id',
      label: 'Studentska sluzba id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getStudentNaGodiniQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'brojIndeksa',
      label: 'Broj indeksa',
      required: true,
    }),
    new TextboxQuestion({
      key: 'datumUpisa',
      label: 'Datum upisa',
      type: 'date',
      required: true,
    }),
    new DropdownQuestion({
      key: 'student_id',
      label: 'Student id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'godinaStudija_id',
      label: 'Godina studija id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'grupaStudenata_id',
      label: 'Grupa studenata id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'svObrazac_id',
      label: 'SvObrazac id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getStudentskaSluzbaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    
    
    new DropdownQuestion({
      key: 'objave_id',
      label: 'Objave id',
      type: 'text',
      required: false,
    }),
    new DropdownQuestion({
      key: 'biblioteka_id',
      label: 'Biblioteka id',
      required: true,
      type: 'number',
    }),
    
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getStudijskiProgramQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new DropdownQuestion({
      key: 'tipPrograma_id',
      label: 'Tip programa id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'katedra_id',
      label: 'Katedra id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
    
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}

getSvObrazacQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'maternjiJezik',
      label: 'Maternji jezik',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vrstaZavreseneSrednje',
      label: 'Vrsta zavrsene srednje',
      required: true,
    }),
    new TextboxQuestion({
      key: 'datumZavrsetkaSrednje',
      label: 'Datum zavrsetka srednje',
      type: 'date',
      required: true,
    }),
    new TextboxQuestion({
      key: 'bracniStatus',
      label: 'Bracni status',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'kontakt',
      label: 'Kontakt',
      required: true,
    }),
    new TextboxQuestion({
      key: 'zaposlen',
      label: 'Zaposlen',
      type: 'checkbox',
      required: true,
    }),
    new TextboxQuestion({
      key: 'nacinFinansiranja',
      label: 'Nacin finansiranja',
      type: 'checkbox',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentNaGodini_id',
      label: 'Student na godini id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'studentska_sluzba_id',
      label: 'Studentska sluzba id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getTerminNastaveQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'vremePocetka',
      label: 'Vreme pocetka',
      type: 'date',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vremeKraja',
      label: 'Vreme kraja',
      type: 'date',
      required: true,
    }),
    new TextboxQuestion({
      key: 'brojCasova',
      label: 'Broj casova',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'realizacijaPredmeta_id',
      label: 'Realizacija predmeta id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'kalendar_id',
      label: 'Kalendar id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getTipEvaluacijeQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getTipNastaveQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}

getTipProgramaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}

getTipZvanjaQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getUniverzitetQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'naziv',
      label: 'Naziv',
      required: true,
    }),
    new TextboxQuestion({
      key: 'datumOsnivanja',
      label: 'Datum osnivanja',
      type: 'date',
      required: true,
    }),
    new DropdownQuestion({
      key: 'adresa_id',
      label: 'Adresa id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}
getZvanjeQuestions() {
  const questions: QuestionBase<string>[] = [
    new TextboxQuestion({
      key: 'id',
      type: 'hidden',
    }),
    new TextboxQuestion({
      key: 'datumIzbora',
      label: 'Datum izbora',
      type: 'date',
      required: false,
    }),
    new TextboxQuestion({
      key: 'datumPrestanka',
      label: 'Datum prestanka',
      type: 'date',
      required: false,
    }),
    new DropdownQuestion({
      key: 'tip_zvanja_id',
      label: 'Tip zvanja id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'naucna_oblast_id',
      label: 'Naucna oblast id',
      type: 'number',
      required: true,
    }),
    new DropdownQuestion({
      key: 'nastavnik_id',
      label: 'Nastavnik id',
      type: 'number',
      required: true,
    }),
    new TextboxQuestion({
      key: 'vidljiv',
      label: 'Vidljiv',
      type: 'checkbox',
      required: true,
    }),
  ];

  return of(questions.sort((a, b) => a.order - b.order));
}


}