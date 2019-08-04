import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title-pag',
  templateUrl: './title-pag.component.html',
  styleUrls: ['./title-pag.component.scss']
})
export class TitlePagComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
