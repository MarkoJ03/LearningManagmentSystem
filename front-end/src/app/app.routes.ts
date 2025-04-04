import { Routes } from '@angular/router';
import { LoginFormComponent } from '../components/ui/login-form/login-form.component';
import { LayoutComponent } from '../components/shared/layout/layout.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginFormComponent
    }, 
    {
        path: '',
        component: LayoutComponent
    }
];
