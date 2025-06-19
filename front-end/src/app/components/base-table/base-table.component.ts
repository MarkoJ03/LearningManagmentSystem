import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-table',
  standalone: true, // Dodato standalone: true
  imports: [CommonModule],
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.css'
})
export class BaseTableComponent<T extends { [key: string]: any }> {
  @Input() data: T[] = [];
  @Input() displayedColumns: string[] = [];

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<number>();
  @Output() details = new EventEmitter<number>();

  /**
   * Emituje događaj za izmenu stavke.
   * @param item Stavka koja se menja.
   */
  onEdit(item: T) {
    this.edit.emit(item);
  }

  /**
   * Emituje događaj za brisanje stavke po ID-u.
   * @param id ID stavke koja se briše.
   */
  onDelete(id: number) {
    this.delete.emit(id);
  }

  /**
   * Pomoćna metoda za ekstrakciju vrednosti za prikaz u tabeli.
   * Ova metoda rukuje različitim tipovima podataka, uključujući objekte i nizove.
   * Posebno je prilagođena za `bibliotekaKnjiga`, `studentskaSluzba` i `programi` kolone.
   * @param value Vrednost koja se prikazuje.
   * @param column Naziv kolone, koristi se za kontekstualno prikazivanje.
   * @returns String vrednost za prikaz.
   */
  extractDisplayValue(value: any, column: string): string {
    // If the value is null or undefined, return a dash.
    if (!value) {
      return '-';
    }

    // Specific logic for 'bibliotekaKnjiga' column
    if (column === 'bibliotekaKnjiga' && Array.isArray(value)) {
      // Iterates through the array of BibliotekaKnjiga objects and extracts the book name.
      // Uses '?.naziv' for safe access (optional chaining).
      // 'filter(Boolean)' removes any undefined/null values if knjiga.naziv does not exist.
      // 'join(', ')' concatenates book names into a single string.
      return value.map(item => item.knjiga?.naziv).filter(Boolean).join(', ');
    }

    // Specific logic for 'studentskaSluzba' column
    if (column === 'studentskaSluzba' && typeof value === 'object' && value.id !== undefined) {
      // For the 'studentskaSluzba' object, returns only its ID.
      return value.id.toString();
    }

    // Specific logic for 'programi' column
    if (column === 'programi' && Array.isArray(value)) {
      // Iterates through the array of Program objects and extracts program details.
      const programDetails = value.map((program: any) => { // Added type 'any' for 'program' parameter
        let detail = program.naziv;
        if (program.godineStudija && Array.isArray(program.godineStudija) && program.godineStudija.length > 0) {
          // Extracts year names and joins them in parentheses.
          // Added type 'any' for 'godina' parameter to resolve TS7006 error.
          const years = program.godineStudija.map((godina: any) => godina.godina).filter(Boolean).join(', ');
          if (years) {
            detail += ` (${years})`;
          }
        }
        return detail;
      }).filter(Boolean); // Filter out any empty strings if a program has no name.
      return programDetails.join(', '); // Join all program details into a single string.
    }

    // General handling for arrays (if there are other arrays besides bibliotekaKnjiga and programi)
    if (Array.isArray(value)) {
      // Recursively calls itself for each array element.
      return value.map(v => this.extractDisplayValue(v, column)).filter(Boolean).join(', ');
    }

    // General handling for objects
    if (typeof value === 'object') {
      // Tries to find common properties for displaying the object.
      // Priority: naziv, ime, prezime, brojRacuna, id.
      // If nothing is found, returns '[object]'.
      return value.naziv || value.ime || value.prezime || value.brojRacuna || value.id || '[objekat]';
    }

    // For all other types (string, number, boolean), returns the value as a string.
    return value.toString();
  }
}
