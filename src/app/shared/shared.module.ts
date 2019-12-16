import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TitlePagComponent} from './components/title-pag/title-pag.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DateRangeSelectionComponent } from './components/date-range-selection/date-range-selection.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from './services/data.service';
import {CrudService} from './services/crud.service';
import { FechaRangePipe } from './pipes/fecha-range.pipe';

@NgModule({
  declarations: [TitlePagComponent, FilterPipe, DateRangeSelectionComponent, FechaRangePipe],
  exports: [TitlePagComponent, FilterPipe, DateRangeSelectionComponent, FechaRangePipe],
  imports: [
    CommonModule,
    NgbDatepickerModule
  ],
  providers: [
    DataService,
    CrudService
  ]
})
export class SharedModule { }
