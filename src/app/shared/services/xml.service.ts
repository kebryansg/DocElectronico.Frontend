import { Injectable } from '@angular/core';
import {NgxXml2jsonService} from 'ngx-xml2json';

@Injectable({
  providedIn: 'root'
})
export class XmlService {

  chars = {
    '<': '&lt;',
    '>': '&gt;',
    '(': '&#40;',
    ')': '&#41;',
    '#': '&#35;',
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&apos;'
  };

  constructor(private ngxXml2jsonService : NgxXml2jsonService) { }

  parseXML(value: string) {
    const parser = new DOMParser();
    return parser.parseFromString(value, 'text/xml');
  }

  formatterXML(xml: string): string {
    let _return: string = xml;
    for (let key in this.chars) {
      var re = new RegExp(this.chars[key], 'g');
      _return = _return.replace(re, key);
    }
    return _return;
  }

  parseJson(xml: string) {
    let result = xml.substring(xml.indexOf('<factura'), xml.indexOf('factura>')) + 'factura>';
    return this.ngxXml2jsonService.xmlToJson(this.parseXML(result));
  }
}
