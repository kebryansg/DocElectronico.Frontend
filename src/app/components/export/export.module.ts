import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportRoutingModule } from './export-routing.module';
import { FacturaComponent } from './factura/factura.component';
import {SharedModule} from '../../shared/shared.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [FacturaComponent],
  imports: [
    CommonModule,
    ExportRoutingModule,
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class ExportModule { }
