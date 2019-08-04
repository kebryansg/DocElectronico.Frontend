import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListDocComponent} from './components/list-doc/list-doc.component';
import {AdminComponent} from './layout/admin/admin.component';
import {UploadComponent} from './components/upload/upload.component';
import {ProveedorPendienteComponent} from './components/proveedor-pendiente/proveedor-pendiente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/documentos',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'documentos',
        component: ListDocComponent
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
