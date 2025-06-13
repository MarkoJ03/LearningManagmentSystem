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
import { EstudentPredmetiComponent } from './components/estudent/estudent-predmeti/estudent-predmeti.component';
import { EstudentIspitiComponent } from './components/estudent/estudent-ispiti/estudent-ispiti.component';
import { EstudentPrijavaIspitaComponent } from './components/estudent/estudent-prijava-ispita/estudent-prijava-ispita.component';
import { EstudentAktivnostiComponent } from './components/estudent/estudent-aktivnosti/estudent-aktivnosti.component';
import { SvObrazacComponent } from './components/estudent/estudent-sv-obrazac/estudent-sv-obrazac.component';
import { EstudentPodaciOStudentuComponent } from './components/estudent/estudent-podaci-o-studentu/estudent-podaci-o-studentu.component';
import { ObjavaDetaljiComponent } from './components/objava-detalji/objava-detalji.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { SilabusLayoutComponent } from './components/silabus-layout/silabus-layout.component';
import { ObavestenjaPredmetaComponent } from './components/estudent/obavestenja-predmeta/obavestenja-predmeta.component';



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
     { path: 'predmet/:id/silabus', component: SilabusLayoutComponent },
         {
        path: 'login',
        component: LoginFormComponent
    }, 
        ]
      },


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

      { path: 'predmeti/:id/obavestenja', component: ObavestenjaPredmetaComponent },



      { path: '', redirectTo: 'objave', pathMatch: 'full' }

    ]
  }
  
];
