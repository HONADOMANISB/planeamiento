import { Component } from '@angular/core';
import { GastosService } from '@services/gastos/gastos.service';
import { rutaBreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { errorAlerta, errorAlertaValidacion, successAlerta, warningAlerta } from '@shared/utils';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-power-bi',
    templateUrl: './power-bi.component.html',
    styleUrl: './power-bi.component.scss',
})
export class PowerBiComponent {

   constructor(  private GastosService$: GastosService,){  }
    loading: boolean = false;
    rutas: rutaBreadCrumb[] = [{ nombre: 'Gastos' }];

    fecha: string = '';
    selectedFile: File | null = null;


    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
    subirExcel(){ 
      this.GastosService$.cargarArchivo(
       this.selectedFile,
       this.fecha
    )
        .pipe(
            finalize(() => {
                this.loading = false;
            })
        )
        .subscribe((respuesta) => {
            console.log(respuesta);
            const { estado, mensaje, datos } = respuesta;
            if (!estado && datos) {
                errorAlertaValidacion(mensaje, datos);
                return;
            } else if (datos == 2) {
                warningAlerta('Alerta', mensaje);
            } else if (datos == 1) {
                successAlerta('Éxito', mensaje);
            } else {
                errorAlerta('Error', mensaje);
            }
        });
    }
}
