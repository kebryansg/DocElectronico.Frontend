import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListDocComponent } from './components/list-doc/list-doc.component';
import { UploadComponent } from './components/upload/upload.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './layout/admin/admin.component';
import { ProveedorPendienteComponent } from './components/proveedor-pendiente/proveedor-pendiente.component';
import { TitlePagComponent } from './shared/components/title-pag/title-pag.component';

@NgModule({
  declarations: [
    AppComponent,
    ListDocComponent,
    UploadComponent,
    AdminComponent,
    ProveedorPendienteComponent,
    TitlePagComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
