import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Proveedor} from '../../../interfaces/Documentos';
import {CrudService} from '../../../shared/services/crud.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-pendiente-register',
  templateUrl: './pendiente-register.component.html',
  styles: []
})
export class PendienteRegisterComponent implements OnInit {

  @ViewChild('ProveedorSelect') ProveedorSelect: ElementRef;

  lsProveedor: any;
  lsFilterProveedor: any[];
  lsFactCompra: any[] = [];
  search: string = '';
  setAll = false;

  constructor(private crud: CrudService) {
    this.lsProveedor = this.crud.getAsync('proveedor/pendiente-registro-factura');
    // this.crud.get('proveedor/pendiente-registro-factura')
    //   .subscribe((rows: any[]) => {
    //     this.lsProveedor = rows;
    //     this.lsFilterProveedor = rows;
    //   });
  }

  ngOnInit() {

  }

  getDocs() {
    this.crud.getAsync('documentos').then((docs: any[]) => {
      this.lsFactCompra = docs;
    });
  }

  filterProveedor(event) {
    let value = event.target.value;
    this.lsFilterProveedor = this.lsProveedor.filter(rows => rows.RUC.includes(value));
  }

  selectAll() {
    this.setAll = !this.setAll;
    for (let fact of this.lsFactCompra)
      fact.select = this.setAll;
  }

  ignoreFacturas() {
    let envio = this.lsFactCompra.filter(row => row.select).map(row => row.ID);
    if (envio && envio.length > 0)
      this.crud.post('documentos/ignore', {facts: envio})
        .subscribe(
          results => {
            this.getDocs();
            AlertService.msgSuccess('Proceso ejecutado correctamente');
          },
          error => {
            AlertService.msgError('Problemas con los registros');
          }
        );
  }

  uploadFacturas() {
    let envio = this.lsFactCompra.filter(row => row.select).map(row => row.ID);
    if (envio && envio.length > 0)
      this.crud.post('documentos', {facts: envio})
        .subscribe(
          results => {
            this.getDocs();
            AlertService.msgSuccess('Facturas Registradas');
          },
          err => {
            AlertService.msgError('Problema con las facturas');
          }
        );
  }

  viewFactura(proveedor: Proveedor) {

    this.ProveedorSelect.nativeElement.innerHTML = `${proveedor.RUC} - ${proveedor.RazonSocial}`;

    this.crud.get('documentos/pendiente-proveedor', {RUC: proveedor.RUC})
      .subscribe((facts: any[]) => {
        this.lsFactCompra = facts;
        this.setAll = false;
      });
  }

}
