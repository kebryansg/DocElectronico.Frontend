import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../shared/services/data.service';
import {CrudService} from '../../../shared/services/crud.service';
import * as moment from 'moment';
import {Fechas} from '../../../shared/constantes/formats';
import {Workbook} from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  defaultFrom = new Date();
  defaultTo = new Date();

  itemForm: FormGroup;
  lsEstadosTime: any[];

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private crudService: CrudService) {
  }

  ngOnInit() {
    this.buildForm();
    this.lsEstadosTime = this.dataService.getTimeOptions();
  }

  buildForm() {
    this.itemForm = this.fb.group({
      TipoFecha: ['', Validators.required],
      Fechas: ['', Validators.required]
    });
    this.registerEvents();
  }

  registerEvents() {
    this.itemForm.controls['TipoFecha'].valueChanges
      .subscribe(value => {
        let valueFechas = null;
        switch (value) {
          case 'HY':
            valueFechas = {
              FIni: moment().format(Fechas.default),
              FFin: moment().format(Fechas.default)
            };
            break;
          case 'UD':
            valueFechas = {
              FIni: moment().subtract(7, 'days').format(Fechas.default),
              FFin: moment().format(Fechas.default)
            };
            break;
          case 'MA':
            valueFechas = {
              FIni: moment().startOf('month').format(Fechas.default),
              FFin: moment().endOf('month').format(Fechas.default)
            };
            break;
          case 'MP':
            const mesPasado = moment().subtract(1, 'month');
            valueFechas = {
              FIni: mesPasado.startOf('month').format(Fechas.default),
              FFin: mesPasado.endOf('month').format(Fechas.default)
            };
            break;
        }
        this.itemForm.controls['Fechas'].setValue(valueFechas);
      });
  }

  submitFacturaCompra() {
    const data = this.itemForm.getRawValue();
    this.crudService.post('documentos/factura', {
      FInicio: data.Fechas.FIni,
      FFin: data.Fechas.FFin
    }).subscribe((response: any[]) => {
      this.export(response);
    });

  }

  export(dataExcel: any[]) {
    let oWorkbook = new Workbook();
    let oHeaderRow = null;
    let lsRowsHeaderSheet = [];
    let oWorksheet = oWorkbook.addWorksheet('DATOS');
    let oTitleRow = oWorksheet.addRow(['FACTURA COMPRAS']);
    let sFileName: string = 'Factura Compras [' + moment().format(Fechas.default) + '].xlsx';

    // Cabecera
    oWorksheet.addRow([]);
    oHeaderRow = oWorksheet.addRow([
      'FC_Fecha',
      'FC_Autorizacion',
      'FC_Numero',
      'FC_SubtotalIVA',
      'FC_SubtotalIVA0',
      'FC_Subtotal',
      'FC_IVA',
      'FC_Total',
      'PV_CEDRUC',
      'PV_Nombre',
      'RC_NumeroRetencion',
      'RC_ValorRetencion',
      'RC_ValorRetencionRenta',
      'NPD_autorizacionsri',
      'ValorRetencionIva',
    ]);
    lsRowsHeaderSheet.push(oHeaderRow);

    oWorksheet.getColumn('A').width = 14;
    oWorksheet.getColumn('B').width = 55;
    oWorksheet.getColumn('N').width = 55;
    oWorksheet.getColumn('C').width = 19;
    oWorksheet.getColumn('K').width = 19;
    oWorksheet.getColumn('I').width = 19;
    oWorksheet.getColumn('J').width = 60;

    ['D', 'E', 'F', 'G', 'H', 'L', 'M', 'O'].forEach(key => oWorksheet.getColumn(key).width = 17);

    oWorksheet.addRows(
      dataExcel.map(row => this.dataService.getParseObject({
        ...row,
        FC_Fecha: moment(row.FC_Fecha).format(Fechas.default),
      }))
    );

    for (let row of lsRowsHeaderSheet) {
      row.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: '902676'},
          bgColor: {argb: 'FFFFFF'}
        };

        cell.style.font = {name: 'Arial', family: 4, size: 10, bold: true, color: {argb: 'FFFFFF'}};
        cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
      });
    }


    oWorkbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, sFileName);
    });

  }

  public onDateRangeSelection(range: { from: Date, to: Date }) {
    this.itemForm.controls['Fechas'].setValue({
      FIni: moment(range.from).format(Fechas.default),
      FFin: moment(range.to).format(Fechas.default),
    });
    console.log(`Selected range: ${range.from} - ${range.to}`);
  }
}
