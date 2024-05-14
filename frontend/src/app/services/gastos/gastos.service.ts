import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponseApi } from '@interfaces/http.interface';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  constructor(private http: HttpClient) { }

  cargarArchivo(archivo:any,fecha:any ) {   
        const formData = new FormData();
        formData.append('fecha', JSON.stringify(fecha));
        formData.append('archivo',archivo );

    return this.http.post<HttpResponseApi>('/api/gastos/cargar-excelSiaf', formData,         
       {responseType: "json"} 
    );
}
}
