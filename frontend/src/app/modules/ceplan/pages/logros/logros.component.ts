import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import { LogrosService } from "@services/ceplan/logros.service";
import { RegistroActividadesService } from "@services/ceplan/registro-actividades.service";
import { rutaBreadCrumb } from "@shared/components/breadcrumb/breadcrumb.component";
import {
  errorAlertaValidacion,
  successAlerta,
  warningAlerta,
} from "@shared/utils";
import { finalize } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrl: './logros.component.scss'
})
export class LogrosComponent {
loading: boolean = false;
  rutas: rutaBreadCrumb[] = [{ nombre: "ceplan" }];
 
  public cb_trimestre:any=Math.ceil((new Date().getMonth() + 1)/3);
  public cb_year: any = (new Date().getMonth()==0)? new Date().getFullYear()-1:new Date().getFullYear();
  public actividades: any[] = [];
  public detalles: any[] = [];
  public detalles_pr: any[] = [];
  public detalles_sr: any[] = [];
  public departamentos :any[]=[]
  public servicios:any[]=[]
  public motivos:any[]=[]
  public actividad: string = "";
  public nro_registro_poi: string = "";
  public accion_estrategico: string = "";
  public actividad_presupuestal: string = "";
  public actividad_operativa: string = "";
  public unidad_medida: string = "";
  public objetivo_estrategico: string = "";
  public ejecutado: string = "";
  public motivo: string = "";
  public oei: string = "";
  public aei: string = "";
  public departamento: string = "";
  public servicio: string = "";
  public actividad_operativa_id: string = "";
  public default: string = "";
  public codigo_ppr: string = "";
  public insert: string = "";
  public tipo_usuario = "";
  public servicio_ls = "";
  public estado = "";
  public perfil="";
  public departamento_info: string = "";
  public est_depart:boolean=true
  public mes: any = "";
  public year_actual = (new Date().getMonth()==0)? new Date().getFullYear()-1:new Date().getFullYear();
  public  logro:string =""
  public  dificultad:string =""
  public  accion_mejora:string =""
  public  accion_correctiva:string =""
  public logros:any= []

  constructor(
    private ActividadesService$: RegistroActividadesService,
    private Logros$: LogrosService,
    public router: Router
  ) {}
  ngOnInit() {
     this.obtenerValorLocalStorage(); 
     this.listarDepartamentos()
     this.listarServicios(this.departamento)
     this.listarActividadOperativa(this.servicio_ls, this.year_actual);
     
     
 
  }
  obtenerValorLocalStorage(): void {
    this.tipo_usuario = localStorage.getItem("usuario") || "";
    this.servicio_ls = localStorage.getItem("servicio") || "";
    this.departamento = localStorage.getItem("departamento") || "";
    this.perfil = localStorage.getItem("perfil") || "";
    if(this.perfil=='ADMIN' || this.perfil=='ADM_GLB'){
        this.est_depart =false;
    }

  }

  public listarActividadOperativa(servicio: any, year: any) {
    this.loading = true;
    this.Logros$.listarActividadesOperativas(servicio, year)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ estado, datos }) => {
        if (datos.length != 0) {
          this.actividades = datos;
          this.actividad = datos[0].codigo_ppr;
         // this.listarDetalles(this.actividad);
          this.listar_encabezado(this.actividad);
          this.listarLogros()

        } else {
          warningAlerta(
            "Advertencia",
            `No existen actividades reegistradas en el año ${year}`
          );
          this.cb_year = this.year_actual;
          this.cambioActividad();

        }
      });
  }
  public setProgramado(data: any) {

    this.nro_registro_poi = data[0].ACTIVIDAD_OPERATIVA_ID;
    this.accion_estrategico = data[0].ACCION_ESTRATEGICA;
    this.actividad_operativa = data[0].ACTIVIDAD_OPERATIVA;
    this.actividad_presupuestal = data[0].ACTIVIDAD_PRESUPUESTAL;
    this.objetivo_estrategico = data[0].OBJETIVO_ESTRATEGICO;
    this.oei = data[0].OEI;
    this.aei = data[0].AEI;
    this.departamento_info = data[0].DEPARTAMENTO;
    this.servicio=data[0].SERVICIO;
    this.codigo_ppr = data[0].CODIGO_PPR.trim();
  }

  public listarLogros() {
    this.loading = true;
    this.Logros$.listarLogros(this.cb_trimestre,this.cb_year,this.actividad)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ estado, datos }) => {        
         console.log(datos)
          this.logros = datos;
          this.logro=datos[0]?.LOGRO
          this.dificultad=datos[0]?.DIFICULTAD
          this.accion_mejora=datos[0]?.ACCION_MEJORA
          this.accion_correctiva=datos[0]?.ACCION_CORRECTIVA
        
      });
  }
  public cambioActividad() {
    if (this.actividad != "") {
      this.listar_encabezado(this.actividad);
      this.listarLogros()
    }
  }
  public cambioYear() {
    this.listarActividadOperativa(this.servicio_ls, this.cb_year);
    this.listarLogros()
    //this.listarDetalles(this.actividad);
   // this.listar_encabezado(this.actividad);
  }
  public cambioMes() {
    this.listarLogros()
   // this.listarActividadOperativa(this.servicio_ls, this.cb_year);
  }

  public listar_encabezado(actividad: string) {
    this.loading = true;
    this.ActividadesService$.listarEncabezado(actividad, this.cb_year)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ estado, datos }) => {
            this.setProgramado(datos);
      });
  }
 

 
  public registrarLogro() {
    this.loading = true;
    this.Logros$.registrarLogros(this.logro,this.dificultad,this.accion_correctiva,this.accion_mejora,this.cb_trimestre,this.cb_year,this.actividad)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ estado, datos }) => {
        if(estado){  successAlerta("Éxito", "Información registrada");}
        this.listarLogros()
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
  changeUnidad(){
    let departamento= this.departamento
    if (departamento.length > 0) {
      this.listarServicios(departamento)
      this.servicio_ls=""
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
    let servicio= this.servicio_ls
    if (servicio.length > 0) {
        this.listarActividadOperativa(servicio,this.cb_year)
        this.actividad=''
      } else {
        warningAlerta('Atención!', 'Elija primero un Departamento ')
      }
  }

  
}
