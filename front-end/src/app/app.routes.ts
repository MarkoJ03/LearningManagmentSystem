import { Routes } from '@angular/router';
import { LoginFormComponent } from '../components/ui/login-form/login-form.component';
import { LayoutComponent } from '../components/shared/layout/layout.component';
import { UserHeaderComponent } from '../components/shared/user-header/user-header.component';
import { authGuard } from './authGuard';

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
    }
];
