import {Injectable} from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  static msgSuccess(title: string, content?: string) {
    swal({
      title: title,
      text: content,
      type: 'success',
    });
  }

  static msgError(title: string, content?: string) {
    swal({
      title: title,
      text: content,
      type: 'error'
    });
  }
}
