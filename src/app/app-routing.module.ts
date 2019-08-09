import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {UploadComponent} from './components/upload/upload.component';
import {ProveedorPendienteComponent} from './components/proveedor-pendiente/proveedor-pendiente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/factura/registro',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'factura',
        loadChildren: './components/factura/factura.module#FacturaModule'
      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'proveedor-pendiente',
        component: ProveedorPendienteComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
