import {Component, ElementRef, ViewChild} from '@angular/core';
import {Modal} from "bootstrap";
import {finalize} from "rxjs";
import {PerfilService} from "@services/mantenimiento/perfil.service";
import {IListaPerfil, IListaPerfilParams} from "@interfaces/mantenimiento/perfil.interface";
import { RegistroActividadesService } from '@services/ceplan/registro-actividades.service';
import { ProcesarEjecucionService } from '@services/mantenimiento/procesar-ejecucion.service';
import {
    errorAlertaValidacion,
    successAlerta,
    warningAlerta,
  } from "@shared/utils";
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
  public departamento: string = "";
  public servicio: string = "";

  public departamentos :any[]=[]
  public servicios:any[]=[]


  perfiles: IListaPerfil[] = [];

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
      this.listarDepartamentos()
      this.listarActividadOperativa()       
  }

  closeModal() {
     this.limpiarCampos()
      this.modal.hide();

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
      this.mes=''
      this.departamento='';
      this.servicio='';
      this.actividad=''
      this.tipo='';
      this.tipoEjec=''
  }

  ngOnDestroy() {
      this.modal.dispose();
  }


  public listarDepartamentos(){
    this.loading = true;
    this.ActividadesService$.listarDepartamentos()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ estado, datos }) => {
        this.departamentos = datos;
      });
  }
  changeUnidad(){
    let departamento= this.departamento
    if (departamento.length > 0) {
      this.listarServicios(departamento)
      this.servicio=""
      this.actividad=''
    } else {
      warningAlerta('Atención!', 'Elija primero un Departamento ')
    }
  }
  public listarServicios(depar:string){
    this.loading = true;
    this.ActividadesService$.listarServicios(depar)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ estado, datos }) => {
        this.servicios = datos;
      });
  }
  public changeServicio(){
    let servicio= this.servicio
    if (servicio.length > 0) {
        this.listarActividadOperativa(servicio)
        this.actividad=''
      } else {
        warningAlerta('Atención!', 'Elija primero un Departamento ')
      }
  }
}
