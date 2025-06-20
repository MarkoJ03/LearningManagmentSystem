import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KalendarService } from '../../../services/kalendar.service';
import { CommonModule } from '@angular/common';
import { TerminNastave } from '../../../models/TerminNastave';
import { LoginService } from '../../../../services/login.service';
import { Kalendar } from '../../../models/Kalendar';
import { RealizacijaPredmetaService } from '../../../services/realizacija-predmeta.service';

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
    private loginService: LoginService,
    private realizacijaPredmetaService: RealizacijaPredmetaService
  ) {}

  //  ngOnInit(): void {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     this.error = 'Niste prijavljeni. Molimo prijavite se.';
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   try {
  //     const payloadBase64 = token.split('.')[1];
  //     const payloadJson = atob(payloadBase64);
  //     const payload = JSON.parse(payloadJson);

  //     const email = payload.sub;
  //     if (!email) {
  //       this.error = 'Email nije pronađen u tokenu. Molimo prijavite se.';
  //       this.router.navigate(['/login']);
  //       return;
  //     }

  //     this.loginService.getUserByEmail(email).subscribe({
  //       next: (fullUser) => {
  //         const nastavnikId = fullUser.id;
  //         if (!nastavnikId) {
  //           this.error = 'ID nastavnika nije pronađen. Molimo prijavite se.';
  //           this.router.navigate(['/login']);
  //           return;
  //         }

  //         this.kalendarService.getByNastavnikId(nastavnikId).subscribe({
  //           next: (kalendarData: Kalendar) => {
  //             if (kalendarData && kalendarData.terminiNastave) {
  //               this.termini = kalendarData.terminiNastave;

  //               this.termini.forEach(termin => {
  //                 if (typeof termin.vremePocetka === 'string') {
  //                   termin.vremePocetka = new Date(termin.vremePocetka);
  //                 }
  //                 if (typeof termin.vremeKraja === 'string') {
  //                   termin.vremeKraja = new Date(termin.vremeKraja);
  //                 }
  //               });
  //             } else {
  //               this.termini = [];
  //               this.error = 'Nema pronađenih termina nastave za ovog nastavnika.';
  //             }
  //           },
  //           error: (err) => {
  //             console.error('Greška pri dohvatanju kalendara:', err);
  //             if (err.status === 404) {
  //               this.error = 'Kalendar nije pronađen za datog nastavnika.';
  //             } else {
  //               this.error = 'Došlo je do greške prilikom dohvatanja kalendara.';
  //             }
  //           }
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Greška pri dohvatanju korisnika po emailu:', err);
  //         this.error = 'Greška pri dohvatanju korisnika. Molimo prijavite se ponovo.';
  //         this.router.navigate(['/login']);
  //       }
  //     });
  //   } catch (e) {
  //     console.error('Neuspešno parsiranje tokena:', e);
  //     this.error = 'Neispravan token. Molimo prijavite se.';
  //     this.router.navigate(['/login']);
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
            if (kalendarData?.terminiNastave?.length) {
              this.termini = kalendarData.terminiNastave;

              this.termini.forEach(termin => {
                // Convert dates
                termin.vremePocetka = new Date(termin.vremePocetka);
                termin.vremeKraja = new Date(termin.vremeKraja);

                // Fetch predmet i tipNastave naziv via realizacijaPredmeta.id
                if (termin.realizacijaPredmeta?.id) {
                  this.realizacijaPredmetaService.getNaziviByRealizacijaPredmetaId(termin.realizacijaPredmeta.id)
                    .subscribe({
                      next: (data) => {
                        termin.predmetNaziv = data.predmeti?.[0]?.predmet?.naziv ?? '';
                        termin.tipNastaveNaziv = data.tipNastave?.naziv ?? '';
                      },
                      error: (err) => {
                        console.error(`Greška pri dohvatanju naziva za RP ID ${termin.realizacijaPredmeta?.id}:`, err);
                      }
                    });
                }
              });
            } else {
              this.termini = [];
              this.error = 'Nema pronađenih termina nastave za ovog nastavnika.';
            }
          },
          error: (err) => {
            console.error('Greška pri dohvatanju kalendara:', err);
            this.error = err.status === 404
              ? 'Kalendar nije pronađen za datog nastavnika.'
              : 'Došlo je do greške prilikom dohvatanja kalendara.';
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
