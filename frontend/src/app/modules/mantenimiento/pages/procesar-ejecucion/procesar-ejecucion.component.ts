import {Component, ElementRef, ViewChild} from '@angular/core';
import {rutaBreadCrumb} from "@shared/components/breadcrumb/breadcrumb.component";
import {finalize} from "rxjs";
import { CabeceraTabla } from '@shared/components/tabla/tabla.component';
import Swal from "sweetalert2";
import {errorAlerta, successAlerta} from "@shared/utils";
import { ModalProcesarComponent } from '@modules/mantenimiento/components/modal-procesar/modal-procesar.component';
import { ProcesarEjecucionService } from '@services/mantenimiento/procesar-ejecucion.service';
import { ModalReporteInvalidadosComponent } from '@modules/mantenimiento/components/modal-reporte-invalidados/modal-reporte-invalidados.component';
import { ModalBloquearComponent } from '@modules/mantenimiento/components/modal-bloquear/modal-bloquear.component';

@Component({
  selector: 'app-procesar-ejecucion',
  templateUrl: './procesar-ejecucion.component.html',
  styleUrl: './procesar-ejecucion.component.scss'
})
export class ProcesarEjecucionComponent {
  @ViewChild('inpFocus') inpFocus!: ElementRef<HTMLInputElement>;
  @ViewChild(ModalProcesarComponent) modalProcesar!: ModalProcesarComponent;
  @ViewChild(ModalReporteInvalidadosComponent) modalReporte!: ModalReporteInvalidadosComponent;
  @ViewChild(ModalBloquearComponent) modalBloquear!: ModalBloquearComponent;
  rutas: rutaBreadCrumb[] = [{
      nombre: 'Mantenimiento',
      ruta: '/mantenimiento/procesar-ejecucion'
  }, {nombre: 'Procesar Ejecución'}];
 constructor( private ProcesarEjecucionervice$: ProcesarEjecucionService){ 
    this.listarHistorial()
 }
  longitud: number = 15;
  pagina: number = 1;
  loading: boolean = false;
    public datos: any[] = [];
    public agregable: boolean = false;   

    public filtroNombre: string = '';
    public filtroCodUsuario: string = '';
    public filtroPerfil: string = '';
    public filtroEquipo: string = '';
    public filtroFecha: string = '';
    public filtroPPR: string = '';
    public archivoCmp:any

    public longitudes: number[] = [15, 20, 50, 100];

  cabeceras: CabeceraTabla[] = [
    {
        nombre: 'Acciones',
        estilo: 'width: 100px;min-width: 100px',
        clase: 'text-center',
    },
    {
        nombre: 'Codigo Usuario',
        estilo: 'width: 115px;min-width: 110px',
        clase: 'text-center',
    },
    {
        nombre: 'Apellidos y Nombres',
        estilo: 'width: 250px; min-width: 250px;',
        clase: 'text-center',
    },
    {
        nombre: 'Perfil',
        estilo: 'width: 150px; min-width: 115px',
        clase: 'text-center',
    },
    {
        nombre: 'Equipo',
        estilo: 'width: 200px; min-width: 50px;',
        clase: 'text-center',
    },
    {
        nombre: 'Fecha Proceso',
        estilo: 'width: 200px; min-width: 200px;',
        clase: 'text-center',
    },
   
    {
        nombre: 'PPR',
        estilo: 'width: 270px; min-width: 270px',
        clase: 'text-center',
    },
   
];


 listarHistorial(){
    this.loading = true;
    let datos:any = {         
        usuario: this.filtroCodUsuario,
        nombre: this.filtroNombre,        
        equipo: this.filtroEquipo,
        fecha:this.filtroFecha,
        perfil: this.filtroPerfil,
        ppr: this.filtroPPR,
        pagina: this.pagina,
        longitud: this.longitud,

    }
  this.ProcesarEjecucionervice$.listarHistorial(datos)
        .pipe(
               finalize(() => {
                this.loading = false;
            })
        )
        .subscribe(({estado, mensaje, datos}) => {
            console.log(datos)
            if (estado) {          
              this.datos = datos;
            } else {
                errorAlerta('Error', mensaje).then();
            }
        });

 }
filtrarEmpleado() {
    this.pagina = 1;
    this.listarHistorial();
}


cambioPagina(pagina: number) {
    this.pagina = pagina;
    this.listarHistorial();
}

limpiarCampos() {
    this.filtroCodUsuario = '';
    this.filtroNombre = '';
    this.filtroPerfil = '';
    this.filtroEquipo = '';
    this.filtroPPR = '';
    this.filtroFecha = '';
    this.pagina = 1;
    this.listarHistorial();
    this.inpFocus.nativeElement.focus();
}


  async abrirModalProcesar() {
    await this.modalProcesar.openModal();
  }

  async abrirModalBloquear() {
    await this.modalBloquear.openModal();
}
   async abrirModalReporte() {
    await this.modalReporte.openModal();
}

reporteConsolidado(){
    this.ProcesarEjecucionervice$.reporteExcelConsolidado()
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



}
