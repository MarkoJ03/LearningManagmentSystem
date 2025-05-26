import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-table',
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

  onEdit(item: T) {
    this.edit.emit(item);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  extractDisplayValue(value: any): string {
    if (!value) return '-';
    if (Array.isArray(value)) {
      return value.map(v => v.naziv || v.id).join(', ');
    }
    return value.ime || value.naziv || value.brojRacuna || value.id || '[objekat]';
  }
}
