import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../shared/services/crud.service';
import {Proveedor} from '../../interfaces/Documentos';

@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss']
})
export class ListDocComponent implements OnInit {

  resultJSON: any[] = [];
  lsProveedor: Proveedor[] = [];
  lsFactCompra: any[] = [];

  constructor(private crud: CrudService) {
  }

  ngOnInit() {
  }

  getDocs() {
    this.crud.get('documentos').then((docs: any[]) => {
      this.lsFactCompra = docs;
      this.resultJSON = [];
      this.lsProveedor = [];
      docs.forEach(doc => {
        this.addProveedor({
          RUC: doc.PVRUC,
          RazonSocial: doc.PVRAZONSOCIAL,
          NombreComercial: doc.PVNOMBRECOMERCIAL
        });
      });

    });
  }

  uploadFacturas() {
    if (this.resultJSON.length > 0) {
      let envio = this.resultJSON.map(row => row.ID);
      this.crud.post('documentos', {facts: envio}).subscribe(results => {
        this.getDocs();
      });
    }
  }

  viewFactura(proveedor: Proveedor) {
    this.resultJSON = this.lsFactCompra.filter(fact => fact.PVRUC == proveedor.RUC);
  }

  addProveedor(proveedor: Proveedor) {
    if (this.lsProveedor.findIndex(prov => prov.RUC == proveedor.RUC) == -1) {
      this.lsProveedor.push(proveedor);
    }
  }


}
