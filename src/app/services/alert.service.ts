import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  error(message: string, title: string = 'Oops....'): void {
    Swal.fire({
      icon: 'error',
      title,
      text: message
    });
  }
}
