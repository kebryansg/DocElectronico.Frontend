import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  lsNav: any[];

  constructor() {
  }

  ngOnInit() {
    this.lsNav = [
      {Descripcion: 'Proveedores Pendientes', href: 'proveedor-pendiente'},
      {Descripcion: 'Facturas', href: 'documentos'},
      {Descripcion: 'Subir XML', href: 'upload'},
    ];
  }

}
