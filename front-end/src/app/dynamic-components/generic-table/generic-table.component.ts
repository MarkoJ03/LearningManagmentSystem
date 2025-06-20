import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  imports: [],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent implements OnChanges {
  
  @Input()
  data: any[] = [];
  
  columns : string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data && this.data.length > 0) {      
      this.columns = Object.keys(this.data[0]).filter(key => key !== "id");
    } else {
      console.warn("Podaci još nisu učitani ili su prazni.");
    }
  }

  getValue(row: any, column: string): any {
    const value = row[column];

    if (value && typeof value === 'object') {
      return value.naziv || '';
    }

    return value; 
  }

  @Output()
  removeEvent = new EventEmitter<number>();

  @Output()
  editEvent = new EventEmitter<any>();

  remove(id : number): void{
    console.log(id);
    this.removeEvent.emit(id);
  }

  update(data: any): void{
    this.editEvent.emit(data);
  }

  
}
