import { Routes } from '@angular/router';
import { LoginFormComponent } from '../components/ui/login-form/login-form.component';
import { LayoutComponent } from '../components/shared/layout/layout.component';
import { UserHeaderComponent } from '../components/shared/user-header/user-header.component';
import { authGuard } from './authGuard';
import { FakultetHeaderComponent } from './components/fakultet-header/fakultet-header.component';
import { FakultetLayoutComponent } from './components/fakultet-layout/fakultet-layout.component';
import { DepartmanLayoutComponent } from './components/departman-layout/departman-layout.component';
import { KatedraLayoutComponent } from './components/katedra-layout/katedra-layout.component';
import { StudijskiProgramLayoutComponent } from './components/studijski-program-layout/studijski-program-layout.component';
import { PredmetLayoutComponent } from './components/predmet-layout/predmet-layout.component';
import { EstudentObjaveComponent } from './components/estudent/estudent-objave/estudent-objave.component';
import { EstudentLayoutComponent } from './components/estudent/estudent-layout/estudent-layout.component';
import { StudentSelectionComponent } from './components/estudent/student-selection/student-selection.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { BibliotekaFormaComponent } from './components/biblioteka-forma/biblioteka-forma.component';
import { BibliotekeComponent } from './components/biblioteke/biblioteke.component';
import { TipoviZvanjaComponent } from './components/CRUD/TipZvanja/tipovi-zvanja/tipovi-zvanja.component';
import { TipZvanjaComponent } from './components/CRUD/TipZvanja/tip-zvanja/tip-zvanja.component';
import { TipZvanjaFormaComponent } from './components/CRUD/TipZvanja/tip-zvanja-forma/tip-zvanja-forma.component';
import { TipEvaluacijeComponent } from './components/CRUD/TipEvaluacije/tip-evaluacije/tip-evaluacije.component';
import { TipoviEvaluacijeComponent } from './components/CRUD/TipEvaluacije/tipovi-evaluacije/tipovi-evaluacije.component';
import { TipEvaluacijeFormaComponent } from './components/CRUD/TipEvaluacije/tip-evaluacije-forma/tip-evaluacije-forma.component';
import { UniverzitetComponent } from './components/CRUD/Univerzitet/univerzitet/univerzitet.component';
import { UniverzitetiComponent } from './components/CRUD/Univerzitet/univerziteti/univerziteti.component';
import { UniverzitetFormaComponent } from './components/CRUD/Univerzitet/univerzitet-forma/univerzitet-forma.component';
import { FakultetiComponent } from './components/CRUD/Fakultet/fakulteti/fakulteti.component';
import { FakultetComponent } from './components/CRUD/Fakultet/fakultet/fakultet.component';
import { FakultetFormaComponent } from './components/CRUD/Fakultet/fakultet-forma/fakultet-forma.component';
import { KatedraComponent } from './components/CRUD/Katedra/katedra/katedra.component';
import { KatedreComponent } from './components/CRUD/Katedra/katedre/katedre.component';
import { KatedraFormaComponent } from './components/CRUD/Katedra/katedra-forma/katedra-forma.component';
import { PredmetiComponent } from './components/CRUD/Predmet/predmeti/predmeti.component';
import { PredmetComponent } from './components/CRUD/Predmet/predmet/predmet.component';
import { PredmetFormaComponent } from './components/CRUD/Predmet/predmet-forma/predmet-forma.component';
import { ObavestenjaComponent } from './components/CRUD/Obavestenje/obavestenja/obavestenja.component';
import { ObavestenjeComponent } from './components/CRUD/Obavestenje/obavestenje/obavestenje.component';
import { ObavestenjeFormaComponent } from './components/CRUD/Obavestenje/obavestenje-forma/obavestenje-forma.component';
import { KorisniciComponent } from './components/CRUD/Korisnik/korisnici/korisnici.component';
import { KorisnikComponent } from './components/CRUD/Korisnik/korisnik/korisnik.component';
import { KorisnikFormaComponent } from './components/CRUD/Korisnik/korisnik-forma/korisnik-forma.component';
import { NaucneOblastiComponent } from './components/CRUD/NaucnaOblast/naucne-oblasti/naucne-oblasti.component';
import { NaucnaOblastComponent } from './components/CRUD/NaucnaOblast/naucna-oblast/naucna-oblast.component';
import { NaucnaOblastFormaComponent } from './components/CRUD/NaucnaOblast/naucna-oblast-forma/naucna-oblast-forma.component';
import { TerminiNastaveComponent } from './components/CRUD/TerminNastave/termini-nastave/termini-nastave.component';
import { TerminNastaveComponent } from './components/CRUD/TerminNastave/termin-nastave/termin-nastave.component';
import { TerminNastaveFormaComponent } from './components/CRUD/TerminNastave/termin-nastave-forma/termin-nastave-forma.component';
import { ZvanjaComponent } from './components/CRUD/Zvanje/zvanja/zvanja.component';
import { ZvanjeComponent } from './components/CRUD/Zvanje/zvanje/zvanje.component';
import { ZvanjeFormaComponent } from './components/CRUD/Zvanje/zvanje-forma/zvanje-forma.component';
import { RealizacijePredmetaComponent } from './components/CRUD/RealizacijaPredmeta/realizacije-predmeta/realizacije-predmeta.component';
import { RealizacijaPredmetaComponent } from './components/CRUD/RealizacijaPredmeta/realizacija-predmeta/realizacija-predmeta.component';
import { RealizacijaPredmetaFormaComponent } from './components/CRUD/RealizacijaPredmeta/realizacija-predmeta-forma/realizacija-predmeta-forma.component';
import { IshodiEvaluacijaComponent } from './components/CRUD/IshodEvaluacije/ishodi-evaluacija/ishodi-evaluacija.component';
import { IshodEvaluacijeComponent } from './components/CRUD/IshodEvaluacije/ishod-evaluacije/ishod-evaluacije.component';
import { IshodEvaluacijeFormaComponent } from './components/CRUD/IshodEvaluacije/ishod-evaluacije-forma/ishod-evaluacije-forma.component';
import { EvaluacijeZnanjaComponent } from './components/CRUD/EvaluacijaZnanja/evaluacije-znanja/evaluacije-znanja.component';
import { EvaluacijaZnanjaComponent } from './components/CRUD/EvaluacijaZnanja/evaluacija-znanja/evaluacija-znanja.component';
import { EvaluacijaZnanjaFormaComponent } from './components/CRUD/EvaluacijaZnanja/evaluacija-znanja-forma/evaluacija-znanja-forma.component';
import { NastavniciComponent } from './components/CRUD/Nastavnik/nastavnici/nastavnici.component';
import { NastavnikComponent } from './components/CRUD/Nastavnik/nastavnik/nastavnik.component';
import { NastavnikFormaComponent } from './components/CRUD/Nastavnik/nastavnik-forma/nastavnik-forma.component';
import { EstudentPredmetiComponent } from './components/estudent/estudent-predmeti/estudent-predmeti.component';
import { EstudentIspitiComponent } from './components/estudent/estudent-ispiti/estudent-ispiti.component';
import { EstudentPrijavaIspitaComponent } from './components/estudent/estudent-prijava-ispita/estudent-prijava-ispita.component';
import { EstudentAktivnostiComponent } from './components/estudent/estudent-aktivnosti/estudent-aktivnosti.component';
import { SvObrazacComponent } from './components/estudent/estudent-sv-obrazac/estudent-sv-obrazac.component';
import { EstudentPodaciOStudentuComponent } from './components/estudent/estudent-podaci-o-studentu/estudent-podaci-o-studentu.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { ObjavaDetaljiComponent } from './components/objava-detalji/objava-detalji.component';
import { EnastavnikLayoutComponent } from './components/enastavnik/enastavnik-layout/enastavnik-layout.component';
import { EnastavnikObjaveComponent } from './components/enastavnik/enastavnik-objave/enastavnik-objave.component';
import { EnastavnikPredmetiComponent } from './components/enastavnik/enastavnik-predmeti/enastavnik-predmeti.component';
import { EnastavnikKalendarComponent } from './components/enastavnik/enastavnik-kalendar/enastavnik-kalendar.component';
import { EnastavnikStudentiComponent } from './components/enastavnik/enastavnik-studenti/enastavnik-studenti.component';

export const routes: Routes = [
    {
        path: 'es',
        component: UserHeaderComponent,
        data: {requiredRoles: ["ROLE_ADMIN"]},
        canActivate: [authGuard]
    },

    { path: 'bibliotekaForma', component: BibliotekaFormaComponent },

    { path: 'biblioteke', component: BibliotekeComponent },

    { path: 'biblioteke/izmeni/:id', component: BibliotekaFormaComponent },

    { path: 'student/:id', component: StudentSelectionComponent },

      {
        path:'',
        component: LayoutComponent,
        children: [
     { path: '', component: PocetnaComponent },
     { path: 'fakultet/:id', component: FakultetLayoutComponent },
     { path: 'departman/:id', component: DepartmanLayoutComponent },
     { path: 'katedra/:id', component: KatedraLayoutComponent },
     { path: 'studijskiProgram/:id', component: StudijskiProgramLayoutComponent },
     { path: 'predmet/:id', component: PredmetLayoutComponent },
     { path: 'objava/:id', component: ObjavaDetaljiComponent },
         {
        path: 'login',
        component: LoginFormComponent
    }, 
        ]
      },


    { path: 'tipovi-zvanja', component: TipoviZvanjaComponent},
    { path: 'tipovi-zvanja/:id', component: TipZvanjaComponent},
    { path: 'tipovi-zvanja/forma', component: TipZvanjaFormaComponent},
    { path: 'tipovi-zvanja/forma/:id', component: TipZvanjaFormaComponent},

    { path: 'tipovi-evaluacije', component: TipoviEvaluacijeComponent},
    { path: 'tipovi-evaluacije/:id', component: TipEvaluacijeComponent},
    { path: 'tipovi-evaluacije/forma', component: TipEvaluacijeFormaComponent},
    { path: 'tipovi-evaluacije/forma/:id', component: TipEvaluacijeFormaComponent},

    { path: 'univerziteti', component: UniverzitetiComponent},
    { path: 'univerziteti/:id', component: UniverzitetComponent},
    { path: 'univerziteti/forma', component: UniverzitetFormaComponent},
    { path: 'univerziteti/forma/:id', component: UniverzitetFormaComponent},

    { path: 'fakulteti', component: FakultetiComponent},
    { path: 'fakulteti/:id', component: FakultetComponent},
    { path: 'fakulteti/forma', component: FakultetFormaComponent},
    { path: 'fakulteti/forma/:id', component: FakultetFormaComponent},

    { path: 'katedre', component: KatedreComponent},
    { path: 'katedre/:id', component: KatedraComponent},
    { path: 'katedre/forma', component: KatedraFormaComponent},
    { path: 'katedre/forma/:id', component: KatedraFormaComponent},

    { path: 'predmeti', component: PredmetiComponent},
    { path: 'predmeti/:id', component: PredmetComponent},
    { path: 'predmeti/forma', component: PredmetFormaComponent},
    { path: 'predmeti/forma/:id', component: PredmetFormaComponent},

    { path: 'obavestenja', component: ObavestenjaComponent},
    { path: 'obavestenja/:id', component: ObavestenjeComponent},
    { path: 'obavestenja/forma', component: ObavestenjeFormaComponent},
    { path: 'obavestenja/forma/:id', component: ObavestenjeFormaComponent},

    { path: 'korisnici', component: KorisniciComponent},
    { path: 'korisnici/:id', component: KorisnikComponent},
    { path: 'korisnici/forma', component: KorisnikFormaComponent},
    { path: 'korisnici/forma/:id', component: KorisnikFormaComponent},

    { path: 'naucne-oblasti', component: NaucneOblastiComponent},
    { path: 'naucne-oblasti/:id', component: NaucnaOblastComponent},
    { path: 'naucne-oblasti/forma', component: NaucnaOblastFormaComponent},
    { path: 'naucne-oblasti/forma/:id', component: NaucnaOblastFormaComponent},

    { path: 'termini-nastave', component: TerminiNastaveComponent},
    { path: 'termini-nastave/:id', component: TerminNastaveComponent},
    { path: 'termini-nastave/forma', component: TerminNastaveFormaComponent},
    { path: 'termini-nastave/forma/:id', component: TerminNastaveFormaComponent},

    { path: 'zvanja', component: ZvanjaComponent},
    { path: 'zvanja/:id', component: ZvanjeComponent},
    { path: 'zvanja/forma', component: ZvanjeFormaComponent},
    { path: 'zvanja/forma/:id', component: ZvanjeFormaComponent},

    { path: 'realizacije-predmeta', component: RealizacijePredmetaComponent},
    { path: 'realizacije-predmeta/:id', component: RealizacijaPredmetaComponent},
    { path: 'realizacije-predmeta/forma', component: RealizacijaPredmetaFormaComponent},
    { path: 'realizacije-predmeta/forma/:id', component: RealizacijaPredmetaFormaComponent},

    { path: 'ishodi-evaluacija', component: IshodiEvaluacijaComponent},
    { path: 'ishodi-evaluacija/:id', component: IshodEvaluacijeComponent},
    { path: 'ishodi-evaluacija/forma', component: IshodEvaluacijeFormaComponent},
    { path: 'ishodi-evaluacija/forma/:id', component: IshodEvaluacijeFormaComponent},

    { path: 'evaluacije-znanja', component: EvaluacijeZnanjaComponent},
    { path: 'evaluacije-znanja/:id', component: EvaluacijaZnanjaComponent},
    { path: 'evaluacije-znanja/forma', component: EvaluacijaZnanjaFormaComponent},
    { path: 'evaluacije-znanja/forma/:id', component: EvaluacijaZnanjaFormaComponent},

    { path: 'nastavnici', component: NastavniciComponent},
    { path: 'nastavnici/:id', component: NastavnikComponent},
    { path: 'nastavnici/forma', component: NastavnikFormaComponent},    
    { path: 'nastavnici/forma/:id', component: NastavnikFormaComponent},    

{
    path: 'studentNaGodini/:id/estudent',
    component: EstudentLayoutComponent,
    children: [
      { path: 'objave', component: EstudentObjaveComponent },

      { path: 'predmeti', component: EstudentPredmetiComponent },

      { path: 'ispiti', component: EstudentIspitiComponent },

      { path: 'prijava-ispita', component: EstudentPrijavaIspitaComponent },
      { path: 'aktivnosti', component: EstudentAktivnostiComponent }
,
      { path: 'sv-obrazac', component: SvObrazacComponent },

      { path: 'podaci-o-studentu', component: EstudentPodaciOStudentuComponent },

      { path: '', redirectTo: 'objave', pathMatch: 'full' }

    ]
  },

  {
    path: 'nastavnik/:id/enastavnik',
    component: EnastavnikLayoutComponent,
    children: [
      { path: 'objave', component: EnastavnikObjaveComponent },

      { path: 'predmeti', component: EnastavnikPredmetiComponent },

      { path: 'kalendar', component: EnastavnikKalendarComponent },

      { path: 'studenti', component: EnastavnikStudentiComponent },

      { path: '', redirectTo: 'objave', pathMatch: 'full' }

    ]
  }
  
];
