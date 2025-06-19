// import { Component, OnInit } from '@angular/core';
// import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
// import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FormaModel } from '../../genericka-forma/FormaModel';
// import { SvObrazac } from '../../../models/SvObrazac';
// import { SvObrazacService } from '../../../services/sv-obrazac.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { StudentskaSluzba } from '../../../models/StudentskaSluzba';
// import { StudentNaGodini } from '../../../models/StudentNaGodini';
// import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';
// import { StudentNaGodiniService } from '../../../services/student-na-godini.service';

// @Component({
//   selector: 'app-sv-obrazac-forma',
//   standalone: true,
//   imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
//   templateUrl: './sv-obrazac-forma.component.html',
//   styleUrls: ['./sv-obrazac-forma.component.css']
// })
// export class SvObrazacFormaComponent implements OnInit {
//   formaModel: FormaModel | null = null;
//   id: number | null = null;
//   sveStudentskeSluzbe: StudentskaSluzba[] = [];
//   sviStudentiNaGodini: StudentNaGodini[] = [];

//   constructor(
//     private service: SvObrazacService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private studentskaSluzbaService: StudentskaSluzbaService,
//     private studentNaGodiniService: StudentNaGodiniService
//   ) {}

//   ngOnInit(): void {
//     // Dohvatanje svih studentskih službi
//     this.studentskaSluzbaService.getAll().subscribe(sluzbe => {
//       this.sveStudentskeSluzbe = sluzbe;

//       // Dohvatanje svih studenata na godini (ugnežđeno unutar prethodnog subscribe-a)
//       this.studentNaGodiniService.getAll().subscribe(studenti => {
//         this.sviStudentiNaGodini = studenti;

//         // Nakon što su svi podaci potrebni za formu učitani, inicijalizujemo formaModel
//         const idParam = this.route.snapshot.paramMap.get('id');
//         if (idParam) {
//           this.id = +idParam;
//           this.service.getById(this.id).subscribe(data => {
//             this.formaModel = this.kreirajModel(data);
//           });
//         } else {
//           this.formaModel = this.kreirajModel();
//         }
//       });
//     });
//   }

//   otkazi(): void {
//     this.router.navigate(['/sv-obrazac']);
//   }

//   sacuvaj(vrednosti: any): void {
//     if (this.id) {
//       // Logika za ažuriranje postojećeg obrasca
//       this.service.update(this.id, vrednosti).subscribe({
//         next: () => this.router.navigate(['/sv-obrazac']),
//         error: err => console.error('Greška pri ažuriranju SV obrasca:', err)
//       });
//     } else {
//       // Logika za kreiranje novog obrasca
//       this.service.create(vrednosti).subscribe({
//         next: () => this.router.navigate(['/sv-obrazac']),
//         error: err => console.error('Greška pri kreiranju SV obrasca:', err)
//       });
//     }
//   }

//   private kreirajModel(podaci?: SvObrazac): FormaModel {
//     // Inicijalizacija selektovanih vrednosti za select polja
//     let selektovaniStudentNaGodini = podaci?.studentNaGodini ?? null;
//     let selektovanaStudentskaSluzba = podaci?.studentska_sluzba ?? null; // Ažurirano sa studentska_sluzba na studentskaSluzba

//     return {
//       naziv: podaci ? 'Izmena SV obrasca' : 'Dodavanje SV obrasca',
//       polja: [
//         ...(podaci ? [{ naziv: 'id', labela: '', tip: 'hidden', podrazumevanaVrednost: podaci.id }] : []),
//         { naziv: 'maternjiJezik', labela: 'Maternji jezik', tip: 'text', podrazumevanaVrednost: podaci?.maternjiJezik ?? '', validatori: [Validators.required] },
//         { naziv: 'vrstaZavreseneSrednje', labela: 'Vrsta srednje', tip: 'text', podrazumevanaVrednost: podaci?.vrstaZavreseneSrednje ?? '' },
//         { naziv: 'datumZavrsetkaSrednje', labela: 'Datum završetka', tip: 'date', podrazumevanaVrednost: podaci?.datumZavrsetkaSrednje ?? '' },
//         { naziv: 'bracniStatus', labela: 'Bračni status', tip: 'checkbox', podrazumevanaVrednost: podaci?.bracniStatus ?? false },
//         { naziv: 'kontakt', labela: 'Kontakt', tip: 'text', podrazumevanaVrednost: podaci?.kontakt ?? '' },
//         { naziv: 'zaposlen', labela: 'Zaposlen', tip: 'checkbox', podrazumevanaVrednost: podaci?.zaposlen ?? false },
//         { naziv: 'nacinFinansiranja', labela: 'Način finansiranja', tip: 'checkbox', podrazumevanaVrednost: podaci?.nacinFinansiranja ?? false },
//         { naziv: 'vidljiv', labela: 'Vidljiv', tip: 'checkbox', podrazumevanaVrednost: podaci?.vidljiv ?? true },
//         // Select polje za studentNaGodini
//         {
//           naziv: 'studentNaGodini',
//           labela: 'Student na godini',
//           tip: 'select',
//           podrazumevanaVrednost: selektovaniStudentNaGodini,
//           opcije: this.sviStudentiNaGodini, // Lista svih studenata
//           displayFn: (student: StudentNaGodini) => `${student.brojIndeksa}` // Prikazuje ID ili neko drugo polje
//         },
//         // Select polje za studentskaSluzba
//         {
//           naziv: 'studentskaSluzba',
//           labela: 'Studentska služba',
//           tip: 'select',
//           podrazumevanaVrednost: selektovanaStudentskaSluzba,
//           opcije: this.sveStudentskeSluzbe, // Lista svih studentskih službi
//           displayFn: (sluzba: StudentskaSluzba) => `${sluzba.id}` // Prikazuje ID ili neko drugo polje (npr. sluzba.naziv)
//         }
//       ]
//     };
//   }
// }import { Component, OnInit } from '@angular/core';
import { GenerickaFormaComponent } from '../../genericka-forma/genericka-forma.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaModel } from '../../genericka-forma/FormaModel';
import { SvObrazac } from '../../../models/SvObrazac';
import { SvObrazacService } from '../../../services/sv-obrazac.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentskaSluzba } from '../../../models/StudentskaSluzba';
import { StudentNaGodini } from '../../../models/StudentNaGodini';
import { StudentskaSluzbaService } from '../../../services/studentska-sluzba.service';
import { StudentNaGodiniService } from '../../../services/student-na-godini.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sv-obrazac-forma',
  standalone: true,
  imports: [GenerickaFormaComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './sv-obrazac-forma.component.html',
  styleUrls: ['./sv-obrazac-forma.component.css']
})
export class SvObrazacFormaComponent implements OnInit {
  formaModel: FormaModel | null = null;
  id: number | null = null;
  sveStudentskeSluzbe: StudentskaSluzba[] = [];
  sviStudentiNaGodini: StudentNaGodini[] = [];

  constructor(
    private service: SvObrazacService,
    private router: Router,
    private route: ActivatedRoute,
    private studentskaSluzbaService: StudentskaSluzbaService,
    private studentNaGodiniService: StudentNaGodiniService
  ) {}

  ngOnInit(): void {
    
    this.studentskaSluzbaService.getAll().subscribe(sluzbe => {
      this.sveStudentskeSluzbe = sluzbe;

      this.studentNaGodiniService.getAll().subscribe(studenti => {
        this.sviStudentiNaGodini = studenti;

        
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
          this.id = +idParam;
          this.service.getById(this.id).subscribe(data => {
            this.formaModel = this.kreirajModel(data);
          });
        } else {
          this.formaModel = this.kreirajModel();
        }
      });
    });
  }

  otkazi(): void {
    this.router.navigate(['/sv-obrazac']);
  }

  sacuvaj(vrednosti: any): void {
    if (this.id) {
      
      this.service.update(this.id, vrednosti).subscribe({
        next: () => this.router.navigate(['/sv-obrazac']),
        error: err => console.error('Greška pri ažuriranju SV obrasca:', err)
      });
    } else {
      
      const vrednostiZaKreiranje = { ...vrednosti };
      if (vrednostiZaKreiranje.id) {
        delete vrednostiZaKreiranje.id; 
      }

      this.service.create(vrednostiZaKreiranje).subscribe({ 
        next: () => this.router.navigate(['/sv-obrazac']),
        error: err => console.error('Greška pri kreiranju SV obrasca:', err)
      });
    }
  }

  private kreirajModel(podaci?: SvObrazac): FormaModel {
    let selektovaniStudentNaGodini = podaci?.studentNaGodini ?? null;
    let selektovanaStudentskaSluzba = podaci?.studentskaSluzba ?? null;

    return {
      naziv: podaci ? 'Izmena SV obrasca' : 'Dodavanje SV obrasca',
      polja: [
        ...(podaci ? [{ naziv: 'id', labela: '', tip: 'hidden', podrazumevanaVrednost: podaci.id }] : []),
        { naziv: 'maternjiJezik', labela: 'Maternji jezik', tip: 'text', podrazumevanaVrednost: podaci?.maternjiJezik ?? '', validatori: [Validators.required] },
        { naziv: 'vrstaZavreseneSrednje', labela: 'Vrsta srednje', tip: 'text', podrazumevanaVrednost: podaci?.vrstaZavreseneSrednje ?? '' },
        { naziv: 'datumZavrsetkaSrednje', labela: 'Datum završetka', tip: 'date', podrazumevanaVrednost: podaci?.datumZavrsetkaSrednje ?? '' },
        { naziv: 'bracniStatus', labela: 'Bračni status', tip: 'checkbox', podrazumevanaVrednost: podaci?.bracniStatus ?? false },
        { naziv: 'kontakt', labela: 'Kontakt', tip: 'text', podrazumevanaVrednost: podaci?.kontakt ?? '' },
        { naziv: 'zaposlen', labela: 'Zaposlen', tip: 'checkbox', podrazumevanaVrednost: podaci?.zaposlen ?? false },
        { naziv: 'nacinFinansiranja', labela: 'Način finansiranja', tip: 'checkbox', podrazumevanaVrednost: podaci?.nacinFinansiranja ?? false },
        { naziv: 'vidljiv', labela: 'Vidljiv', tip: 'checkbox', podrazumevanaVrednost: podaci?.vidljiv ?? true },
        {
          naziv: 'studentNaGodini',
          labela: 'Student na godini',
          tip: 'select',
          podrazumevanaVrednost: selektovaniStudentNaGodini,
          opcije: this.sviStudentiNaGodini, 
          displayFn: (student: StudentNaGodini) => `${student.brojIndeksa}` 
        },
        {
          naziv: 'studentskaSluzba',
          labela: 'Studentska služba',
          tip: 'select',
          podrazumevanaVrednost: selektovanaStudentskaSluzba,
          opcije: this.sveStudentskeSluzbe, 
          displayFn: (sluzba: StudentskaSluzba) => `${sluzba.id}` 
        }
      ]
    };
  }
}
