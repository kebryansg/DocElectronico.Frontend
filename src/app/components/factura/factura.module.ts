import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { PendienteRetencionComponent } from './pendiente-retencion/pendiente-retencion.component';
import { PendienteRegisterComponent } from './pendiente-register/pendiente-register.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [PendienteRetencionComponent, PendienteRegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    FacturaRoutingModule,
    FormsModule
  ]
})
export class FacturaModule { }
