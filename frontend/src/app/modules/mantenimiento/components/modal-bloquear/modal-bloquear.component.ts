import {Component, ElementRef, ViewChild} from '@angular/core';
import {Modal} from "bootstrap";
import {finalize} from "rxjs";
import { RegistroActividadesService } from '@services/ceplan/registro-actividades.service';
import { ProcesarEjecucionService } from '@services/mantenimiento/procesar-ejecucion.service';
import { errorAlerta, successAlerta } from '@shared/utils';

@Component({
  selector: 'app-modal-bloquear',
  templateUrl: './modal-bloquear.component.html',
  styleUrl: './modal-bloquear.component.scss'
})
export class ModalBloquearComponent {
  @ViewChild('modalBloqueo') modalEl?: any;
  @ViewChild('inpFocus') inpFocus!: ElementRef;
  modal: any;
  resolve: any;
  reject: any;

  loading: boolean = false;
  pagina: number = 1;
  longitud: number = 10;


  public year:any= new Date().getFullYear()
  public visible:boolean=false
  public tipoEjec:any
  public periodo:any
  public fecha_limite:any
  filtro = {
      codigo: '',
      descripcion: '',
      estado: '1'
  }


  constructor(private ActividadesService$: RegistroActividadesService,private ProcesarEjecucionService$:ProcesarEjecucionService) {
  console.log(this.year)
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
  
   bloquear(){
     const year=this.year
     const periodo=this.periodo
     const fecha=this.fecha_limite
     this.loading=true
     this.ProcesarEjecucionService$.Bloquear(periodo,fecha,year)
     .pipe(
       finalize(() => {
           this.loading = false;
       })
   )
   .subscribe(({ estado,datos }) => {
      if(estado){
        successAlerta('Exito!!','Fecha de bloqueo actualizada')
        this.closeModal()
      }else{
        errorAlerta('Error','Ocurrio un error al actualizar la fecha')
        
      }
   });
   }

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
