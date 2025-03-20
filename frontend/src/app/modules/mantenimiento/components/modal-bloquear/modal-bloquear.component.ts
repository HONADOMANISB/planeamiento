import {Component, ElementRef, ViewChild} from '@angular/core';
import {Modal} from "bootstrap";
import {finalize} from "rxjs";
import { RegistroActividadesService } from '@services/ceplan/registro-actividades.service';
import { ProcesarEjecucionService } from '@services/mantenimiento/procesar-ejecucion.service';
import {
  errorAlerta,
  successAlerta,
  warningAlerta,
} from "@shared/utils";
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
  public actividades=[]
  public actividad:string=''
  public departamento: string = "";
  public servicio: string = "";
  public tipo:any
  public departamentos :any[]=[]
  public servicios:any[]=[]
 


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
      this.listarDepartamentos()
      this.listarActividadOperativa()  
  }

  closeModal() {
      this.limpiarCampos()
      this.modal.hide();
      this.resolve();

  }
  
   bloquear(){
     const year=this.year
     const periodo=this.periodo
     const fecha=this.fecha_limite
     const tipo=this.tipoEjec
     const actividad=this.actividad
     this.loading=true
     this.ProcesarEjecucionService$.Bloquear(periodo,fecha,year,tipo,actividad)
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
   public listarActividadOperativa(servicio?: any) {
    this.loading = true;
    this.ActividadesService$.listarActividadesOperativas(servicio,this.year,this.periodo)
        .pipe(
            finalize(() => {
                this.loading = false;
            })
        )
        .subscribe(({ estado, datos }) => {
            this.actividades = datos;

        });
}

  limpiarCampos() {
    this.tipoEjec=''
    this.tipo=''
    this.departamento=''
    this.servicio=''
    this.periodo=''
  }

  ngOnDestroy() {
      this.modal.dispose();
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
  cambioTipo(){
    if(this.tipoEjec=='todos'){
      this.visible=false
      this.actividad=''
      this.departamento=''
      this.servicio=''
    }else{
      this.visible=true   
    }
  }
  
}
