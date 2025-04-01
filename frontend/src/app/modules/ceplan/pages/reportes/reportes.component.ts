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
  public trimestre:string=''
  public rp:any
  public perfil = localStorage.getItem('perfil'); 
  public visible:boolean=false
  public visible_trimestre:boolean=false


changeTipoReporte() { 
    const perfil = localStorage.getItem('perfil'); 
    this.visible = ((this.rp == 'RC' && perfil =='ADMIN') || this.rp=='RI'|| this.rp=='RCD'|| this.rp=='RCO' || this.rp=='RCC'   ) ? true : false;
    this.visible_trimestre=this.rp=='RL'?true:false;
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
    case 'RCD':
          this.reporteConsolidadoDetallado()
          break;
    case 'RCO':
          this.reporteExcelConsolidado()
            break;
    case 'RL':
          this.reporteLogros()
            break;
    case 'RCC':
          this.reporteCentroCostos()
             break;
    default:
      break;
  }
}
  reporteInvalidados(){
    const periodo=this.periodo
    const year=this.year
    const tipo=this.tipo
    this.loading= true
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
  this.loading= true
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
  const year=this.year
  const tipo=this.tipo
  this.loading= true
  this.ProcesarEjecucionService$.reporteResumenMetas(year,tipo)
      .pipe(
             finalize(() => {
              this.loading = false;
          })
      )
      .subscribe((response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Reporte de Resumen de metas físicas de actividades operativas del año ${year}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
      });
}
reporteExcelConsolidado() {
  const periodo = this.periodo;
  const year = this.year;
  const tipo = this.tipo;
  this.loading= true
  this.ProcesarEjecucionService$.reporteExcelConsolidado(periodo, year, tipo)
      .pipe(finalize(() => {
          this.loading = false;
      }))
      .subscribe((response: Blob) => {
          successAlerta("Éxito", "Reporte Creado Correctamente");

          // Crear URL y enlace para descargar el archivo
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Reportes_de_Seguimiento_Evaluacion_de_Actividades_Operativas_Anexo_A1.xlsx';

          // Especificar el tipo MIME para el archivo
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          // Descargar el archivo
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
      }, error => {
          console.error('Error downloading the report', error);
      });
}
reporteConsolidadoDetallado(){
  const periodo=this.periodo
  const year=this.year
  const tipo=this.tipo
  this.loading= true
  this.ProcesarEjecucionService$.reporteConsolidadoDetallado(periodo,year,tipo)
      .pipe(
             finalize(() => {
              this.loading = false;
          })
      )
      .subscribe((response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Reporte de Detallado del año ${year}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
      });
}
reporteLogros(){
  const trimestre=this.trimestre
  const year=this.year
  const tipo=this.tipo
  this.loading= true
  this.ProcesarEjecucionService$.reporteLogros(trimestre,year,tipo)
      .pipe(
             finalize(() => {
              this.loading = false;
          })
      )
      .subscribe((response: Blob) => {
        console.log(this.trimestre)
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Reporte  de Logros del ${year} - ${this.trimestre}  trimestre.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
      });
}

reporteCentroCostos(){
  const periodo=this.periodo
  const year=this.year
  const tipo=this.tipo
  this.loading= true
  this.ProcesarEjecucionService$.reporteCentroCostos(periodo,year,tipo)
     .pipe(
             finalize(() => {
              this.loading = false;
          })
      )
      .subscribe((response: Blob) => {
        console.log(this.trimestre)
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
         a.href = url;
          a.download = `Reporte  de Centro de Csotos ${year}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
      });

}
}
