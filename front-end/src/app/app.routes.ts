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
import { EstudentObjaveComponent } from './components/estudent-objave/estudent-objave.component';
import { StudentSelectionComponent } from './components/student-selection/student-selection.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { EstudentLayoutComponent } from './components/estudent/estudent-layout/estudent-layout.component';
// import {  FakultetComponentComponent } from './components/fakultet-component/fakultet-component.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginFormComponent
    }, 
    {
        path: '',
        component: LayoutComponent
    },
    {
        //ne treba imati role admin menjacemo nasim role
        path: 'es',
        component: UserHeaderComponent,
        data: {requiredRoles: ["ROLE_ADMIN"]},
        canActivate: [authGuard]
    },

     { path: 'fakultet/:id', component: FakultetLayoutComponent },

    { path: 'departman/:id', component: DepartmanLayoutComponent },

     { path: 'katedra/:id', component: KatedraLayoutComponent },

    { path: 'studijskiProgram/:id', component: StudijskiProgramLayoutComponent },

    { path: 'predmet/:id', component: PredmetLayoutComponent },

    // { path: 'estudent/objave', component: EstudentObjaveComponent },

      { path: 'student/:id', component: StudentSelectionComponent },
    //   { path: 'studentNaGodini/:id', component: StudentDashboardComponent }

{
    path: 'studentNaGodini/:id/estudent',
    component: EstudentLayoutComponent,
    children: [
      { path: 'objave', component: EstudentObjaveComponent },
      // Dodaj dalje:
      // { path: 'predmeti', component: EstudentPredmetiComponent },
      // { path: 'prijava-ispita', component: EstudentPrijavaIspitaComponent },
      { path: '', redirectTo: 'objave', pathMatch: 'full' }
    ]
  }
  
];
