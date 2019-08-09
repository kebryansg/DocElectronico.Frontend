import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PendienteRegisterComponent} from './pendiente-register/pendiente-register.component';
import {PendienteRetencionComponent} from './pendiente-retencion/pendiente-retencion.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registro',
        component: PendienteRegisterComponent
      },
      {
        path: 'retencion',
        component: PendienteRetencionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
