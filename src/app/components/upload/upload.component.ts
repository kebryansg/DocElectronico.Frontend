import { Component, OnInit } from '@angular/core';
import {Proveedor} from '../../interfaces/Documentos';
import {NgxXml2jsonService} from 'ngx-xml2json';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  resultJSON: any[];
  lsProveedor: Proveedor[] = [];
  lsFactCompra: any[] = [];

  constructor(private ngxXml2jsonService: NgxXml2jsonService) {
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {

    if (event.target.files && event.target.files.length > 0) {

      for (let file of event.target.files) {
        // let file: File = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          // this.nameFile = file.name;
          let result: string = this.formatterXML(<string>reader.result);
          // Validar que sea Factura
          if (result.indexOf('<factura>') != -1) {
            result = result.substring(result.indexOf('<factura'), result.indexOf('factura>')) + 'factura>';
            let comprobanteJSON = this.ngxXml2jsonService.xmlToJson(this.parseXML(result));
            this.processDocument(comprobanteJSON);
          }
        };
      }
    }
  }

  parseXML(value: string) {
    const parser = new DOMParser();
    return parser.parseFromString(value, 'text/xml');
  }

  processDocument(data: any) {
    let infoTributaria: any = data.factura.infoTributaria;
    let infoFactura: any = data.factura.infoFactura;

    this.addProveedor({
      RUC: infoTributaria.ruc,
      RazonSocial: infoTributaria.razonSocial,
      NombreComercial: infoTributaria.nombreComercial
    });

    this.lsFactCompra.push({
      Comprador: {
        Identificacion: infoFactura.identificacionComprador,
        RazonSocial: infoFactura.razonSocialComprador
      },
      Documento: {
        ProveedorRUC: infoTributaria.ruc,
        ProveedorRazonSocial: infoTributaria.razonSocial,
        FechaEmision: infoFactura.fechaEmision,
        ClaveAcceso: infoTributaria.claveAcceso,
        NumeroDocumento: `${infoTributaria.estab}-${infoTributaria.ptoEmi}-${infoTributaria.secuencial}`,
        TotalSinImpuesto: infoFactura.totalSinImpuestos,
        IVA: infoFactura.totalConImpuestos.totalImpuesto.valor,
        Total: infoFactura.importeTotal
      }
    });
  }

  formatterXML(xml: string): string {
    let chars = {
      '<': '&lt;',
      '>': '&gt;',
      '(': '&#40;',
      ')': '&#41;',
      '#': '&#35;',
      '&': '&amp;',
      '"': '&quot;',
      '\'': '&apos;'
    };
    let _return: string = xml;
    for (let key in chars) {
      // console.log('buscar: ', chars[key]);
      // console.log('reemplazar: ', key);
      // console.log(`[${chars[key]}] => `, _return.search(chars[key]));
      var re = new RegExp(chars[key], 'g');
      _return = _return.replace(re, key);
    }
    return _return;

  }

  addProveedor(proveedor: Proveedor) {
    if (this.lsProveedor.findIndex(prov => prov.RUC == proveedor.RUC) == -1) {
      this.lsProveedor.push(proveedor);
    }
  }

  viewFactura(proveedor: Proveedor) {
    this.resultJSON = this.lsFactCompra.filter(fact => fact.Documento.ProveedorRUC == proveedor.RUC);
  }



}
