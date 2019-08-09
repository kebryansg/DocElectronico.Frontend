import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';

@Component({
  selector: 'app-pendiente-retencion',
  templateUrl: './pendiente-retencion.component.html',
  styles: []
})
export class PendienteRetencionComponent implements OnInit {

  rows: any[];
  search: string = '';

  constructor(private crud: CrudService) {
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.crud.get('documentos/pendiente-retencion', {
      search: this.search
    }).subscribe((rows: any[]) => this.rows = rows);
  }

}
