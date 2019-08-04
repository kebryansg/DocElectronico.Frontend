import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../shared/services/crud.service';

@Component({
  selector: 'app-proveedor-pendiente',
  templateUrl: './proveedor-pendiente.component.html',
  styleUrls: ['./proveedor-pendiente.component.scss']
})
export class ProveedorPendienteComponent implements OnInit {

  lsProveedor: any[];

  constructor(private crudService: CrudService) {
  }

  async ngOnInit() {
    await this.getItems();
  }

  async getItems() {
    this.lsProveedor = <any[]>await this.crudService.get('documentos/pendiente-proveedor');
  }

}
