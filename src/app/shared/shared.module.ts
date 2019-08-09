import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TitlePagComponent} from './components/title-pag/title-pag.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [TitlePagComponent, FilterPipe],
  exports: [TitlePagComponent, FilterPipe],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
