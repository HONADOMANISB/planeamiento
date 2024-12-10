import { Component } from '@angular/core';
import { ProcesarEjecucionService } from '@services/mantenimiento/procesar-ejecucion.service';
import { rutaBreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { errorAlerta, errorAlertaValidacion, successAlerta, warningAlerta } from '@shared/utils';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  constructor(private ProcesarEjecucionService$:ProcesarEjecucionService){ 

  }
  loading: boolean = false;
  rutas: rutaBreadCrumb[] = [{ nombre: 'Ceplan' }];

  public year:any
  public tipo:any
  public periodo:any
  public rp:any
 
  public visible:boolean=false


changeTipoReporte() { 
    const perfil = localStorage.getItem('perfil'); 
    this.visible = ((this.rp == 'RC' && perfil =='ADMIN') || this.rp=='RI' || this.rp=='RM') ? true : false;
    console.log(this.visible)
  }


reportes(){
  console.log(this.rp)
  switch (this.rp) {
    case 'RC':
       this.reporteCierre()
      break;
    case 'RI':
      this.reporteInvalidados()
      break;
    case 'RM':
        this.reporteResumenMetas()
        break;
    default:
      break;
  }
}
  reporteInvalidados(){
    const periodo=this.periodo
    const year=this.year
    const tipo=this.tipo
    this.ProcesarEjecucionService$.reporteExcel(periodo,year,tipo)
        .pipe(
               finalize(() => {
                this.loading = false;
            })
        )
        .subscribe((response: Blob) => {
            const url = window.URL.createObjectURL(response);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Reporte de validación de metas físicas de actividades operativas del mes ${periodo}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
        });
}
reporteCierre(){
  const periodo=this.periodo
  const year=this.year
  const tipo=this.tipo
  this.ProcesarEjecucionService$.reporteCierre(periodo,year,tipo)
      .pipe(
             finalize(() => {
              this.loading = false;
          })
      )
      .subscribe((response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Reporte de cierre de metas físicas de actividades operativas del mes ${periodo}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
      });
}
reporteResumenMetas(){
  const periodo=this.periodo
  const year=this.year
  const tipo=this.tipo
  this.ProcesarEjecucionService$.reporteResumenMetas(periodo,year,tipo)
      .pipe(
             finalize(() => {
              this.loading = false;
          })
      )
      .subscribe((response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Reporte de cierre de metas físicas de actividades operativas del mes ${periodo}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
      });
}
}
