import {Component, ElementRef, ViewChild} from '@angular/core';
import {Modal} from "bootstrap";
import {finalize} from "rxjs";
import {PerfilService} from "@services/mantenimiento/perfil.service";
import {IListaPerfil, IListaPerfilParams} from "@interfaces/mantenimiento/perfil.interface";
import { RegistroActividadesService } from '@services/ceplan/registro-actividades.service';
import { ProcesarEjecucionService } from '@services/mantenimiento/procesar-ejecucion.service';
import { successAlerta } from '@shared/utils';

@Component({
  selector: 'app-modal-procesar',
  templateUrl: './modal-procesar.component.html',
  styleUrl: './modal-procesar.component.scss'
})
export class ModalProcesarComponent {
  @ViewChild('modalProcesar') modalEl?: any;
  @ViewChild('inpFocus') inpFocus!: ElementRef;
  modal: any;
  resolve: any;
  reject: any;

  loading: boolean = false;
  pagina: number = 1;
  longitud: number = 10;

  public actividades=[]
  public actividad:string=''
  public visible:boolean=false
  public tipoEjec:any
  public year:any=new Date().getFullYear()
  public mes:any
  public tipo:any
  public ppr:any
  filtro = {
      codigo: '',
      descripcion: '',
      estado: '1'
  }

  perfiles: IListaPerfil[] = [];

  constructor(private PerfilService$: PerfilService,private ActividadesService$: RegistroActividadesService,private ProcesarEjecucionService$:ProcesarEjecucionService) {
  }

  ngAfterViewInit() {
      this.modal = new Modal(this.modalEl.nativeElement, {
          backdrop: 'static',
          keyboard: false
      });
   
  }

  openModal(){
      this.modal.show();  
      this.listarActividadOperativa()       
  }

  closeModal() {
      this.modal.hide();
      this.resolve();
      this.resetModal();
  }
  public listarActividadOperativa(servicio?: any) {
    this.loading = true;
    this.ActividadesService$.listarActividadesOperativas(servicio,this.year)
        .pipe(
            finalize(() => {
                this.loading = false;
            })
        )
        .subscribe(({ estado, datos }) => {
            this.actividades = datos;

        });
}
cambioTipo(){
  if(this.tipoEjec=='todos'){
    this.visible=false
    this.actividad=''
  }else{
    this.visible=true   
  }
}

  procesar(){
    const año=this.year
    const mes=this.mes
    const tipo=this.tipo
    const ppr=this.tipoEjec=='todos'?'todos':this.actividad
    this.loading=true
    this.ProcesarEjecucionService$.ProcesarEjecucion(año,mes,tipo,ppr)
    .pipe(
      finalize(() => {
          this.loading = false;
      })
  )
  .subscribe(({ estado,datos }) => {
     if(estado){
            console.log('alerta mostrada')
        successAlerta('Exito','Se proceso corrrectamente')
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
