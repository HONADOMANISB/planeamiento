import { Component } from '@angular/core';
import { SubirExportaService } from '@services/ceplan/subir-exporta.service';
import { rutaBreadCrumb } from '@shared/components/breadcrumb/breadcrumb.component';
import { errorAlerta, errorAlertaValidacion, successAlerta, warningAlerta } from '@shared/utils';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-carga-exporta',
  templateUrl: './carga-exporta.component.html',
  styleUrl: './carga-exporta.component.scss'
})
export class CargaExportaComponent {
  constructor(private SubirExporta$:SubirExportaService){ }
  loading: boolean = false;
  rutas: rutaBreadCrumb[] = [{ nombre: 'Ceplan' }];

  public fecha: string = '';
  public tipo: string = '';
  selectedFile: File | null = null;


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  subirExcel(){ 
    this.loading = true;
     this.SubirExporta$.cargarArchivo(
     this.selectedFile,
     this.fecha,
     this.tipo

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
