import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './layout/admin/admin.component';
import { ProveedorPendienteComponent } from './components/proveedor-pendiente/proveedor-pendiente.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    AdminComponent,
    ProveedorPendienteComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
