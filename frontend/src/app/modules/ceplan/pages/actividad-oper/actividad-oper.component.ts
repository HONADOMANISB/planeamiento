import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
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
  selector: "app-actividad-oper",
  templateUrl: "./actividad-oper.component.html",
  styleUrl: "./actividad-oper.component.scss",
})
export class ActividadOperComponent implements OnInit {
  loading: boolean = false;
  rutas: rutaBreadCrumb[] = [{ nombre: "ceplan" }];
  @ViewChildren("ejecutado") inputs!: QueryList<ElementRef>;
  @ViewChildren("ejecutado_pr") inputs_pr!: QueryList<ElementRef>;
  @ViewChildren("ejecutado_sr") inputs_sr!: QueryList<ElementRef>;
  public cb_year: any = new Date().getFullYear();
  public cb_mes:any = new Date().getMonth();
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
  public categoria_presupuestal: string = "";
  public actividad_operativa_id: string = "";
  public trazadora: string = "";
  public definicion_operacional: string = "";
  public default: string = "";
  public year: string = "";
  public codigo_ppr: string = "";
  public insert: string = "";
  public tipo_usuario = "";
  public servicio_ls = "";
  public estado = "";
  public perfil="";
  public departamento_info: string = "";
  public est_depart:boolean=true
  public mes: any = "";
  public tipoEstadoR=''
  public year_actual = new Date().getFullYear();
  public detalle_motivo=''
  constructor(
    private ActividadesService$: RegistroActividadesService,
    public router: Router
  ) {}
  ngOnInit() {
     this.obtenerValorLocalStorage(); 
     this.listarDepartamentos()
     this.listarServicios(this.departamento)
     this.listarActividadOperativa(this.servicio_ls, this.year_actual);
     this.listarMotivos()
 
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
  ngAfterViewInit() {
    setTimeout(() => {
      const currentDate = new Date();
      const month = currentDate.getMonth() - 1;
      let especifico;
      if ( this.detalles.length != 0 && this.detalles_pr.length == 0 && this.detalles_sr.length == 0)
               especifico = this.inputs.toArray()[month];
      else if (this.detalles_pr.length != 0 && this.detalles_sr.length == 0)
              especifico = this.inputs_pr.toArray()[month];
      else    especifico = this.inputs_sr.toArray()[month];

      if (especifico) {
        especifico.nativeElement.focus();
        especifico.nativeElement.classList.add("input-activo");
      }

    }, 2000);
   
  }

  public setProgramado(data: any) {

    this.nro_registro_poi = data[0].ACTIVIDAD_OPERATIVA_ID;
    this.accion_estrategico = data[0].ACCION_ESTRATEGICA;
    this.actividad_operativa = data[0].ACTIVIDAD_OPERATIVA;
    this.actividad_presupuestal = data[0].ACTIVIDAD_PRESUPUESTAL;
    this.objetivo_estrategico = data[0].OBJETIVO_ESTRATEGICO;
    this.unidad_medida = data[0].UNIDAD_MEDIDA;
    this.oei = data[0].OEI;
    this.aei = data[0].AEI;
    this.categoria_presupuestal = data[0].CATEGORIA;
    this.actividad_operativa_id = data[0].ACTIVIDAD_OPERATIVA_ID;
    this.trazadora = data[0].TRAZADORA_TAREA;
    this.departamento_info = data[0].DEPARTAMENTO;
    this.servicio=data[0].SERVICIO;
    this.year = data[0].YEAR;
    this.definicion_operacional = data[0].DEFINICION_OPERACIONAL;
    this.codigo_ppr = data[0].CODIGO_PPR.trim();
  }
  public listarActividadOperativa(servicio: any, year: any) {

    this.loading = true;
    this.ActividadesService$.listarActividadesOperativas(servicio, year,this.cb_mes)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ estado, datos }) => {
        if (datos.length != 0) {
          this.actividades = datos;
           this.actividad = datos[0].codigo_ppr;
          this.listarDetalles(this.actividad);
          this.listar_encabezado(this.actividad);
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
  public listarDetalles(actividad: string) {
    this.loading = true;
    this.ActividadesService$.listarInformacion(actividad, this.cb_year)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ estado, datos }) => {
        this.detalles = datos["PI"];
        this.detalles_pr = datos["PR"];
        this.detalles_sr = datos["SR"];
      });
  }
  public cambioActividad() {
    if (this.actividad != "") {
      this.listarDetalles(this.actividad);
      this.listar_encabezado(this.actividad);
    }
  }
  public cambioYear() {
    this.listarActividadOperativa(this.servicio_ls, this.cb_year);
    //this.listarDetalles(this.actividad);
   // this.listar_encabezado(this.actividad);
  }
  public cambioMes() {
    this.listarActividadOperativa(this.servicio_ls, this.cb_year);
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
  public calculatePercentage(fs: any, pg: any): number {
 
    const porcentaje = (fs / pg) * 100 ; 
    return isNaN(porcentaje) ? 0 : porcentaje;
  }

  public changeProgress(fs: any, pg: any): string {
    if(!fs){
      return ''
    }
    const progressValue = this.calculatePercentage(fs, pg);
    return `width: ${isNaN(progressValue) ? 0 : progressValue}%;`;
  }

  public porcentaje(fs: any, pg: any): string {
    if(!fs){
      return ''
    }
    const resultado = this.calculatePercentage(fs, pg);
    return `${isNaN(resultado) ? 0 : parseFloat(resultado.toFixed(2))}%`;
  }

  public changeStade(fs: any, pg: any): string {
    if(fs==null || fs==''){
      return ''
    }
    if(fs==0 && pg==0){
      return this.estado='NO PROGRAMADO'
    }
    const valor = this.calculatePercentage(fs, pg);
    if (isNaN(valor) ) return "";
   
    if (valor <= 85) return (this.estado = "DEFICIENTE");
    if (valor <= 90) return (this.estado = "REGULAR");
    if (valor <= 120) return (this.estado = "BUENO");
    if (valor > 120) return (this.estado = "EXCESO");
    return this.estado;
  }
  public changeColor(fs: any, pg: any): any {
    if (fs == null || fs === '') {
        return '';
    }
    if (fs == 0 && pg == 0) {
        return `height:20px;background-color:#a3abbd;`;
    }
    const resultado = this.calculatePercentage(fs, pg);
    if (isNaN(resultado)) {
        return '';
    }
    if (resultado <= 85) {
        return `height:20px;background-color:rgb(255,0,0);`;
    } else if (resultado <= 90) {
        return `height:20px;background-color:rgb(255,145,0);`;
    } else if (resultado <= 120) {
        return `height:20px;background-color:rgb(0,176,80);`;
    } else if (resultado > 120) {
        return `height:20px;background-color:rgb(230, 195, 48);`;
    }
    return '';
}


  public generarDetallePOI(mes: any, tipo: any) {
    this.loading = true;
    this.ActividadesService$.generarReportePOI(
      mes,
      this.year,
      this.codigo_ppr,
      tipo
    )
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((response: Blob) => {
        const fileURL = URL.createObjectURL(response);
        const downloadLink = document.createElement("a");
        downloadLink.href = fileURL;
        downloadLink.download = `REPORTE_${mes}${this.codigo_ppr}_${this.year}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
  public generarDetallePOIExcel(mes: any, tipo: any) {
    this.loading = true;
    this.ActividadesService$.generarReportePOIExcel(
      mes,
      this.year,
      this.codigo_ppr,
      tipo
    )
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((response: Blob) => {
  
        const fileURL = URL.createObjectURL(response);
        const downloadLink = document.createElement("a");
        downloadLink.href = fileURL;
        downloadLink.download = `REPORTE_${mes}${this.codigo_ppr}_${this.year}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
  public guardar(fs: any, id: any, mt: any, tipo: string,tipo_registro:string) {
  this.tipoEstadoR = tipo_registro === "BANCO DE DATOS" ? 'VALIDADO' : 'REGISTRADO';
  if(mt!='10'){ this.detalle_motivo=''}
    Swal.fire({
      icon: "warning",
      title: ` ¿ Desea continuar con el registro ?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
    }).then((result) => {
      if ((this.estado == "DEFICIENTE" || this.estado == "EXCESO") && !mt) {
        warningAlerta("Warning", "Es Obligatorio Ingresar el Motivo");
        return;
      }
      if (result.isConfirmed) {
        this.ActividadesService$.registrarPoi(fs, mt, id, this.actividad, tipo,this.tipoEstadoR,this.detalle_motivo)
          .pipe(
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe(({ estado, datos, mensaje }) => {
            if (!estado && datos) {
              errorAlertaValidacion(mensaje, datos);
              return;
            }
            this.cambioActividad()
            successAlerta("Éxito", "Datos registrados correctamente");
            //this.listarDetalles(this.actividad);
            this.detalle_motivo=''
  
          });
      }
    });
  }

  public invalidarEjecucion(ej: any, mt: any, mes: number, tipo: string) {
    Swal.fire({
      icon: "warning",
      title: ` ¿ Desea Invalidar La Ejecución ?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!mt) {
          warningAlerta("Warning", "Es Obligatorio Ingresar el Motivo");
          return;
        }
        this.ActividadesService$.invalidarPOI(
          ej,
          mt,
          mes,
          this.codigo_ppr,
          tipo
        )
          .pipe(
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe(({ estado, datos, mensaje }) => {
            if (!estado && datos) {
              errorAlertaValidacion(mensaje, datos);
              return;
            }
            successAlerta("Éxito", "Registro Invalidado");
           // this.listarDetalles(this.actividad);
            this.detalle_motivo=''
            this.listarActividadOperativa(this.servicio_ls, this.cb_year)
          });
      }
    });
  }
  public cerrarActividades() {
    const currentDate = new Date();
    const month = currentDate.getMonth() ;
    const year=this.year;
    Swal.fire({
      icon: "warning",
      title: ` ¿ Desea cerrar el registro de actividades ?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {     
        this.ActividadesService$.cerrarActividades(month,year)
          .pipe(
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe(({ estado, datos, mensaje }) => {
            if (!estado && datos) {
              errorAlertaValidacion(mensaje, datos);
              return;
            }
            successAlerta("Éxito", "Actividades Cerradas");
            this.listarDetalles(this.actividad);
          });
      }
    });
  }

  public cerrar_ejecutado(fecha_cierre: any) {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaActual.getDate()).padStart(2, "0");
    const fecha_ac = `${año}-${mes}-${dia}`;
    if (fecha_cierre < fecha_ac) {
      return true;
    } else {
      return false;
    }
  }

  public cerrar_registro(fecha_cierre: any, tipo_registro: any) {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaActual.getDate()).padStart(2, "0");
    const fecha_ac = `${año}-${mes}-${dia}`;
    if (tipo_registro == "BANCO DE DATOS" || fecha_cierre < fecha_ac) {
      return true;
    } else {
      return false;
    }
  }
  async alertaInfo() {

    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Definiciòn de la Actividad Operacional",
      inputValue: `${this.definicion_operacional}`,
      inputAttributes: {
        "aria-label": "Type your message here",
        readonly: "readonly",
        style: "color: #000; font-weight: 600; min-height: 300px;", // Ancho al 100% y alto automático
      },

      width: "600px",
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
  public listarMotivos(){
    this.loading = true;
    this.ActividadesService$.listarMotivos()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(({ estado, datos }) => {
        this.motivos = datos;
      });
  }

  public validarCierre(){
    const valor = this.actividades.some(item => item.estado == null || item.estado=='INVALIDADO')
    return valor
  }

  public changeMotivo(event:any){
    if(event.target.value=='10'){
         this.mostrarAlerta()
    }
  }

  async mostrarAlerta() { 
    const { value: text } = await 
    Swal.fire({ input: 'textarea', 
      inputLabel: 'Detalle Motivo', 
      inputPlaceholder: 'Escribir el motivo ...', 
      inputAttributes: { 
        'aria-label': 'Type your message here',
        'maxlength': '100' }, 
      showCancelButton: true });
       if (text) { 
        this.detalle_motivo = text; 
        Swal.fire({ title: 'Motivo', 
          text: this.detalle_motivo,
           icon: 'info', 
           confirmButtonText: 'Ok' }); } }
}
