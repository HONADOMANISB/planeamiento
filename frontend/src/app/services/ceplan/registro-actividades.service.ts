import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponseApi } from '@interfaces/http.interface';
import { shareReplay } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RegistroActividadesService {
    constructor(private http: HttpClient) {}
    listarActividadesOperativas(servicio: any,cb_year:string) {
        return this.http.post<HttpResponseApi>(
            '/api/ceplan/listar-actividades-operativas',
            { servicio,cb_year },
            { responseType: 'json' }
        );
    }
    listarInformacion(actividad: string,cb_year:string) {
        return this.http.post<HttpResponseApi>(
            '/api/ceplan/listar-informacion',
            { actividad ,cb_year},
            { responseType: 'json' }
        );
    }
    listarEncabezado(actividad: string,cb_year:string) {
        return this.http.post<HttpResponseApi>(
            '/api/ceplan/listar-encabezado',
            { actividad,cb_year },
            { responseType: 'json' }
        );
    }
    generarReportePOI(mes:any,year:any,ppr:any,tipo:any){
        return this.http
        .get('/api/ceplan/generar-reporte-detalle-poi', {
            params: {
               mes,
               year,
               ppr,
               tipo
            },
            responseType: 'blob',
        })
        .pipe(shareReplay(1));
    }
    invalidarPOI(ej:any,motivo:any,mes:any,actividad:any,tipo:string){
        return this.http.post<HttpResponseApi>(
            '/api/ceplan/invalidar-poi',
            {ej,motivo,mes,actividad,tipo},
            { responseType: 'json' }
        );
    }
    registrarPoi(ejecutado:string,motivo:any,mes:any,actividad:any,tipo:string) {
      return this.http.post<HttpResponseApi>(
          '/api/ceplan/registrar-poi',
          {ejecutado,motivo,mes,actividad,tipo},
          { responseType: 'json' }
      );
  } 
}
