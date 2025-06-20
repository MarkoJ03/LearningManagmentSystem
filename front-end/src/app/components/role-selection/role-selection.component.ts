import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { RouterLink } from '@angular/router';
import { UniverzitetHeaderComponent } from '../../../components/shared/univerzitet-header/univerzitet-header.component';
import { UniverzitetFooterComponent } from '../../../components/shared/univerzitet-footer/univerzitet-footer.component';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [CommonModule, RouterLink, UniverzitetHeaderComponent, UniverzitetFooterComponent],
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.css'
})
export class RoleSelectionComponent {
  roles: string[] = [];
  email: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.loginService.getUser();
    this.email = user?.sub;
    this.roles = this.loginService.getRoles();
  }

  selectRole(role: string) {
    this.loginService.getUserByEmail(this.email).subscribe(fullUser => {
      const id = fullUser.id;

      if (role === "ROLE_STUDENT") {
        this.router.navigate([`/student/${id}`]);
      } else if (role === "ROLE_NASTAVNIK") {
        this.router.navigate([`/nastavnik/${id}/enastavnik`]);
      } else if (role === "ROLE_STUDENTSKA_SLUZBA") {
        this.router.navigate([`/osoblje/${id}/esluzba`]);
      }else if (role === "ROLE_ADMIN") {
        this.router.navigate([`/admin/${id}`]);
        } else {
        this.router.navigate(['/']);
      }
    });
  }
}
