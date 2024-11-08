import {Component, ElementRef, ViewChild} from '@angular/core';
import {Modal} from "bootstrap";
import {finalize} from "rxjs";
import { RegistroActividadesService } from '@services/ceplan/registro-actividades.service';
import { ProcesarEjecucionService } from '@services/mantenimiento/procesar-ejecucion.service';

@Component({
  selector: 'app-modal-informacion-bloqueo',
  templateUrl: './modal-informacion-bloqueo.component.html',
  styleUrl: './modal-informacion-bloqueo.component.scss'
})
export class ModalInformacionBloqueoComponent {
  @ViewChild('modalListarBloqueos') modalEl?: any;
  @ViewChild('inpFocus') inpFocus!: ElementRef;
  modal: any;
  resolve: any;
  reject: any;

  loading: boolean = false;
  pagina: number = 1;
  longitud: number = 10;

  bloqueos:any=[]
  filtro = {
      codigo: '',
      descripcion: '',
      estado: '1'
  }


  constructor(private ProcesarEjecucionService$:ProcesarEjecucionService) {
  }

  ngAfterViewInit() {
      this.modal = new Modal(this.modalEl.nativeElement, {
          backdrop: 'static',
          keyboard: false
      });
  }
  
  openModal(){
      this.modal.show();  
      this.listarBloqueos()       
  }

  closeModal() {
      this.modal.hide();
      this.resolve();
      this.resetModal();
  }
  public listarBloqueos() {
    this.loading = true;
    this.ProcesarEjecucionService$.listarBloqueo()
        .pipe(
            finalize(() => {
                this.loading = false;
            })
        )
        .subscribe(({datos}) => {
           this.bloqueos=datos
        });
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
