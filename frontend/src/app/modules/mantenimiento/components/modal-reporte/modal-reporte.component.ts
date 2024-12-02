import {Component, ElementRef, ViewChild} from '@angular/core';
import {Modal} from "bootstrap";
import {finalize} from "rxjs";
import { RegistroActividadesService } from '@services/ceplan/registro-actividades.service';
import { ProcesarEjecucionService } from '@services/mantenimiento/procesar-ejecucion.service';
import { successAlerta } from '@shared/utils';


@Component({
  selector: 'app-modal-reporte',
  templateUrl: './modal-reporte.component.html',
  styleUrl: './modal-reporte.component.scss'
})
export class ModalReporteComponent {
  @ViewChild('modalReporte') modalEl?: any;
  @ViewChild('inpFocus') inpFocus!: ElementRef;
  modal: any;
  resolve: any;
  reject: any;

  loading: boolean = false;
  pagina: number = 1;
  longitud: number = 10;

  public visible:boolean=false
  public year:any
  public tipo:any
  public periodo:any

  filtro = {
      codigo: '',
      descripcion: '',
      estado: '1'
  }


  constructor(private ActividadesService$: RegistroActividadesService,private ProcesarEjecucionService$:ProcesarEjecucionService,private ProcesarEjecucionervice$: ProcesarEjecucionService) {
  }

  ngAfterViewInit() {
      this.modal = new Modal(this.modalEl.nativeElement, {
          backdrop: 'static',
          keyboard: false
      });
   
  }

  openModal(){
      this.modal.show();  
    
  }

  closeModal() {
      this.modal.hide();
      this.resolve();
      this.resetModal();
  }
  reporteExcel() {
    const periodo = this.periodo;
    const year = this.year;
    const tipo = this.tipo;
    this.ProcesarEjecucionervice$.reporteExcelConsolidado(periodo, year, tipo)
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

  // procesar(){
  //   const año=this.year
  //   const tipo=this.tipo
  //   const ppr=this.tipoEjec=='todos'?'todos':this.actividad
  //   this.loading=true
  //   this.ProcesarEjecucionService$.ProcesarEjecucion(año,mes,tipo,ppr)
  //   .pipe(
  //     finalize(() => {
  //         this.loading = false;
  //     })
  // )
  // .subscribe(({ estado,datos }) => {
  //    console.log(datos)
  // });
  // }

  limpiarCampos() {
      this.filtro = {
          codigo: '',
          descripcion: '',
          estado: '1'
      };

  }

  ngOnDestroy() {
      this.modal.dispose();
  }

  private resetModal() {
      this.filtro = {
          codigo: '',
          descripcion: '',
          estado: '1'
      };
      this.pagina = 1;
  }
}
