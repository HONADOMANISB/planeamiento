import { Component } from '@angular/core';
import { rutaBreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  selector: 'app-actividad-oper',
  templateUrl: './actividad-oper.component.html',
  styleUrl: './actividad-oper.component.scss'
})
export class ActividadOperComponent {
  loading: boolean = false;
  rutas: rutaBreadCrumb[] = [{ nombre: 'ceplan' }];
}
