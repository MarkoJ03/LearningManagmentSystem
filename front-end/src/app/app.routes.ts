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
        path: 'student',
        component: UserHeaderComponent,
        data: {requiredRoles: ["ROLE_ADMIN"]},
        canActivate: [authGuard]
    },

     { path: 'fakultet/:id', component: FakultetLayoutComponent },

    { path: 'departman/:id', component: DepartmanLayoutComponent },

     { path: 'katedra/:id', component: KatedraLayoutComponent },

    { path: 'studijskiProgram/:id', component: StudijskiProgramLayoutComponent }
];
