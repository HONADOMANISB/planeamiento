import {Component, ElementRef, ViewChild} from '@angular/core';
import {Modal} from "bootstrap";
import {finalize} from "rxjs";
import { RegistroActividadesService } from '@services/ceplan/registro-actividades.service';
import { ProcesarEjecucionService } from '@services/mantenimiento/procesar-ejecucion.service';

@Component({
  selector: 'app-modal-reporte-invalidados',
  templateUrl: './modal-reporte-invalidados.component.html',
  styleUrl: './modal-reporte-invalidados.component.scss'
})
export class ModalReporteInvalidadosComponent {
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


  constructor(private ActividadesService$: RegistroActividadesService,private ProcesarEjecucionService$:ProcesarEjecucionService) {
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
  reporteExcel(){
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
            a.download = 'reporte.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
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
