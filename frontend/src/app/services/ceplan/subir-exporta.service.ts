import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponseApi } from '@interfaces/http.interface';

@Injectable({
    providedIn: 'root',
})
export class SubirExportaService {
    constructor(private http: HttpClient) {}

    cargarArchivo(archivo: any, fecha: any,tipo:any) {
        const formData = new FormData();
        formData.append('fecha', JSON.stringify(fecha));
        formData.append('archivo', archivo);
        formData.append('tipo', tipo);
        return this.http.post<HttpResponseApi>(
            '/api/ceplan/cargar-excelExporta',
            formData,
            { responseType: 'json' }
        );
    }
  
}
