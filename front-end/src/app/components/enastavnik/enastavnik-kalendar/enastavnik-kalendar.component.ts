import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KalendarService } from '../../../services/kalendar.service';
import { CommonModule } from '@angular/common';
import { TerminNastave } from '../../../models/TerminNastave';
import { LoginService } from '../../../../services/login.service';
import { Kalendar } from '../../../models/Kalendar';

@Component({
  selector: 'app-enastavnik-kalendar',
  imports: [CommonModule],
  templateUrl: './enastavnik-kalendar.component.html',
  styleUrls: ['./enastavnik-kalendar.component.css']
})
export class EnastavnikKalendarComponent implements OnInit {
  termini: TerminNastave[] = [];
  error: string | null = null;

  constructor(
    private router: Router,
    private kalendarService: KalendarService,
    private loginService: LoginService
  ) {}

  // ngOnInit(): void {
  //   const nastavnikId = Number(this.route.snapshot.paramMap.get('id'));
  //   if (nastavnikId) {
  //     this.kalendarService.getByNastavnikId(nastavnikId).subscribe({
  //       next: (data) => this.termini = data,
  //       error: () => this.error = 'Greška pri dohvatanju kalendara.'
  //     });
  //   }
  // }

  // ngOnInit(): void {
  //   const user = this.loginService.getUser();

  //   // Ensure user is logged in and the JWT payload contains an 'id'
  //   if (user && user.id) {
  //     const nastavnikId = Number(user.id);

  //     if (!isNaN(nastavnikId)) {
  //       this.kalendarService.getByNastavnikId(nastavnikId).subscribe({
  //         next: (kalendarData: Kalendar) => { // Expect a single Kalendar object
  //           if (kalendarData && kalendarData.terminiNastave) {
  //             this.termini = kalendarData.terminiNastave;

  //             // Convert string dates from the backend to Date objects
  //             // This is crucial for Angular's date pipe to work correctly
  //             this.termini.forEach(termin => {
  //               if (typeof termin.vremePocetka === 'string') {
  //                 termin.vremePocetka = new Date(termin.vremePocetka);
  //               }
  //               if (typeof termin.vremeKraja === 'string') { // Corrected property name
  //                 termin.vremeKraja = new Date(termin.vremeKraja);
  //               }
  //             });
  //           } else {
  //             // Handle case where calendar data or terminiNastave is null/undefined
  //             this.termini = [];
  //             this.error = 'Nema pronađenih termina nastave za ovog nastavnika.';
  //           }
  //         },
  //         error: (err) => {
  //           console.error('Greška pri dohvatanju kalendara:', err);
  //           // Check if the error is due to 404 (not found) or other issues
  //           if (err.status === 404) {
  //               this.error = 'Kalendar nije pronađen za datog nastavnika.';
  //           } else {
  //               this.error = 'Došlo je do greške prilikom dohvatanja kalendara.';
  //           }
  //         }
  //       });
  //     } else {
  //       this.error = 'Greška: ID nastavnika iz tokena nije validan.';
  //       this.router.navigate(['/login']); // Redirect if ID is invalid
  //     }
  //   } else {
  //     this.error = 'Niste prijavljeni ili ID nastavnika nije pronađen u tokenu. Molimo prijavite se.';
  //     this.router.navigate(['/login']); // Redirect to login if not authenticated or ID missing
  //   }
  // }

   ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Niste prijavljeni. Molimo prijavite se.';
      this.router.navigate(['/login']);
      return;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const email = payload.sub;
      if (!email) {
        this.error = 'Email nije pronađen u tokenu. Molimo prijavite se.';
        this.router.navigate(['/login']);
        return;
      }

      this.loginService.getUserByEmail(email).subscribe({
        next: (fullUser) => {
          const nastavnikId = fullUser.id;
          if (!nastavnikId) {
            this.error = 'ID nastavnika nije pronađen. Molimo prijavite se.';
            this.router.navigate(['/login']);
            return;
          }

          this.kalendarService.getByNastavnikId(nastavnikId).subscribe({
            next: (kalendarData: Kalendar) => {
              if (kalendarData && kalendarData.terminiNastave) {
                this.termini = kalendarData.terminiNastave;

                this.termini.forEach(termin => {
                  if (typeof termin.vremePocetka === 'string') {
                    termin.vremePocetka = new Date(termin.vremePocetka);
                  }
                  if (typeof termin.vremeKraja === 'string') {
                    termin.vremeKraja = new Date(termin.vremeKraja);
                  }
                });
              } else {
                this.termini = [];
                this.error = 'Nema pronađenih termina nastave za ovog nastavnika.';
              }
            },
            error: (err) => {
              console.error('Greška pri dohvatanju kalendara:', err);
              if (err.status === 404) {
                this.error = 'Kalendar nije pronađen za datog nastavnika.';
              } else {
                this.error = 'Došlo je do greške prilikom dohvatanja kalendara.';
              }
            }
          });
        },
        error: (err) => {
          console.error('Greška pri dohvatanju korisnika po emailu:', err);
          this.error = 'Greška pri dohvatanju korisnika. Molimo prijavite se ponovo.';
          this.router.navigate(['/login']);
        }
      });
    } catch (e) {
      console.error('Neuspešno parsiranje tokena:', e);
      this.error = 'Neispravan token. Molimo prijavite se.';
      this.router.navigate(['/login']);
    }
  }
}
