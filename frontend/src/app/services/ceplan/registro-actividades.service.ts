import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponseApi } from '@interfaces/http.interface';

@Injectable({
    providedIn: 'root',
})
export class RegistroActividadesService {
    constructor(private http: HttpClient) {}
    listarActividadesOperativas(servicio: any) {
        return this.http.post<HttpResponseApi>(
            '/api/ceplan/listar-actividades-operativas',
            { servicio },
            { responseType: 'json' }
        );
    }
    listarInformacion(actividad: string) {
        return this.http.post<HttpResponseApi>(
            '/api/ceplan/listar-informacion',
            { actividad },
            { responseType: 'json' }
        );
    }
    listarEncabezado(actividad: string) {
        return this.http.post<HttpResponseApi>(
            '/api/ceplan/listar-encabezado',
            { actividad },
            { responseType: 'json' }
        );
    }
    registrarPoi(ejecutado:string,motivo:any,id:any,actividad:any) {
      return this.http.post<HttpResponseApi>(
          '/api/ceplan/registrar-poi',
          {ejecutado,motivo,id,actividad},
          { responseType: 'json' }
      );
  } 
}
