import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroActividadesService } from '@services/ceplan/registro-actividades.service';
import { rutaBreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { errorAlertaValidacion, successAlerta } from '@shared/utils';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-actividad-oper',
    templateUrl: './actividad-oper.component.html',
    styleUrl: './actividad-oper.component.scss'
})
export class ActividadOperComponent implements OnInit {
    loading: boolean = false;
    rutas: rutaBreadCrumb[] = [{ nombre: 'ceplan' }];
    @ViewChildren('ejecutado') inputs!:QueryList <ElementRef>;
    @ViewChildren('ejecutado_pr') inputs_pr!:QueryList <ElementRef>;
    @ViewChildren('ejecutado_sr') inputs_sr!:QueryList <ElementRef>;
    public actividades: any[] = [];
    public detalles: any[] = [];
    public detalles_pr: any[] = [];
    public detalles_sr: any[] = [];
    public actividad:string=''
    public nro_registro_poi:string=''
    public accion_estrategico:string=''
    public actividad_presupuestal:string=''
    public actividad_operativa:string=''
    public unidad_medida:string=''
    public objetivo_estrategico:string=''
    public ejecutado:string=''
    public ejecutado_rp1:string=''
    public ejecutado_rp2:string=''
    public motivo:string=''
    public oei:string=''
    public aei:string=''
    public departamento:string=''
    public servicio: any = '';
    public categoria_presupuestal:string=''
    public actividad_operativa_id:string=''
    public trazadora:string =''
    public default:string=''
    constructor(private ActividadesService$: RegistroActividadesService,public router: Router) {}
    ngOnInit() {  this.listarActividadOperativa(this.servicio); }
    ngAfterViewInit() {  
        setTimeout(() => {
            const currentDate = new Date();
            const month = currentDate.getMonth()-1;
            let especifico
            if(this.detalles.length!=0 && this.detalles_pr.length==0 && this.detalles_sr.length==0) especifico=this.inputs.toArray()[month];
            else if(this.detalles_pr.length!=0 && this.detalles_sr.length==0)especifico=this.inputs_pr.toArray()[month];
            else especifico=this.inputs_sr.toArray()[month];
            console.log(especifico)
            if (especifico) {
              especifico.nativeElement.focus();
              especifico.nativeElement.classList.add('input-activo');
            }
          }, 1500);
     }  

    public setProgramado(data: any) {
       this.nro_registro_poi=data[0].ACTIVIDAD_OPERATIVA_ID
       this.accion_estrategico=data[0].ACCION_ESTRATEGICA
       this.actividad_operativa=data[0].ACTIVIDAD_OPERATIVA
       this.actividad_presupuestal=data[0].ACTIVIDAD_PRESUPUESTAL
       this.objetivo_estrategico=data[0].OBJETIVO_ESTRATEGICO
       this.unidad_medida=data[0].UNIDAD_MEDIDA    
       this.oei=data[0].OEI 
       this.aei=data[0].AEI 
       this.categoria_presupuestal=data[0].CATEGORIA
       this.actividad_operativa_id=data[0].ACTIVIDAD_OPERATIVA_ID
       this.trazadora=data[0].TRAZADORA_TAREA
       this.departamento=data[0].DEPARTAMENTO
       this.servicio=data[0].SERVICIO
    }
    public listarActividadOperativa(servicio: any) {
        this.ActividadesService$.listarActividadesOperativas(servicio)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe(({ estado, datos }) => {
                this.actividades = datos;
                this.actividad=datos[0].act
                this.listarDetalles(this.actividad)
                this.listar_encabezado(this.actividad)
            });
    }
    public listarDetalles(actividad: string) {
        this.ActividadesService$.listarInformacion(actividad)
            .pipe(
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe(({ estado, datos }) => {
                this.detalles = datos['PI'];
                this.detalles_pr = datos['PR'];
                this.detalles_sr = datos['SR']; 
           
            });
    }
    public cambioActividad() {
        if (this.actividad != '') {
            this.listarDetalles(this.actividad);
            this.listar_encabezado(this.actividad);
        }
    }
    public listar_encabezado(actividad:string){
        this.ActividadesService$.listarEncabezado(actividad)
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
        return pg !== 0 ? (fs / pg) * 100 : 0;
    }
    
    public changeProgress(fs: any, pg: any): string {
        const progressValue = this.calculatePercentage(fs, pg);
        return `width: ${isNaN(progressValue) ? 0 : progressValue}%;`;
    }
    
    public porcentaje(fs: any, pg: any): string {
        const resultado = this.calculatePercentage(fs, pg);
        return `${isNaN(resultado) ? 0 : parseFloat(resultado.toFixed(2))}%`;
    }
    
    public changeStade(fs: any, pg: any): string {
        const valor = this.calculatePercentage(fs, pg);
        if (isNaN(valor) || valor === 0) return '';
    
        if (valor <= 85) return 'DEFICIENTE';
        if (valor <= 90) return 'REGULAR';
        if (valor <= 120) return 'BUENO';
        return 'EXCESO';
    }
    
    public changeColor(fs: any, pg: any): string {
        const resultado = this.calculatePercentage(fs, pg);
        if (isNaN(resultado) || resultado === 0) return '';
    
        let color = '';
        if (resultado <= 85) color = '#C93B5F';
        else if (resultado <= 90) color = '#D6A419';
        else if (resultado <= 120) color = '#00D8B1';
        else color = '#4E8783';
    
        return `height:20px;background-color:${color};`;
    }
    public guardar(fs:any,mt:any,id:any){       
        Swal.fire({
            icon: 'warning',
            title: ` ¿ Desea continuar con el registro ?`,
            showDenyButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed){
                switch (id) {
                    case 1: id='ENERO'  
                    break;
                    case 2: id='FEBRERO'  
                    break;
                    case 3: id='MARZO'  
                    break;
                    case 4:id= 'ABRIL'  
                    break;
                    case 5: id='MAYO'  
                    break;
                    case 6: id='JUNIO'  
                    break;
                    case 7: id='JULIO'  
                    break;
                    case 8: id='AGOSTO'  
                    break;
                    case 9: id='SETIEMBRE'  
                    break;    
                    case 10: id='OCTUBRE'  
                    break;
                    case 11: id='NOVIEMBRE'  
                    break;

                    case 12: id='DICIEMBRE'  
                    break;
                    default:
                        break;
                }  
                this.ActividadesService$.registrarPoi(fs,mt,id,this.actividad_operativa)
                 .pipe(
                     finalize(() => {
                        this.loading = false;
                     })
                 )
                 .subscribe(({ estado, datos,mensaje }) => {
                     if (!estado && datos) {   
                         errorAlertaValidacion(mensaje, datos);
                        return;
                    }

                     successAlerta('Éxito', 'Datos registrados correctamente');
                     this.listarDetalles(this.actividad_operativa)                   
                });
            }            
        })
       
    }
  



  public cerrar_ejecutado(valor:any){
    const currentDate = new Date();
    const month = currentDate.getMonth() ;
    const day=currentDate.getDate();
  
    // console.log('valor enviado:' + valor)
    // console.log('mes:' + month)
    // console.log('day:' + day)
     if(valor==month ){
        return false
     }else{
        return true
    }

   
  }
}
