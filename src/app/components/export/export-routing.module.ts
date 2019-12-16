import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FacturaComponent} from './factura/factura.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'factura',
        component: FacturaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportRoutingModule { }
