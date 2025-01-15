import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponseApi } from '@interfaces/http.interface';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogrosService {

  constructor(private http: HttpClient) {}


  listarActividadesOperativas(servicio: any,cb_year:string,cb_mes:any='') {
      return this.http.post<HttpResponseApi>(
          '/api/ceplan/listar-actividades-operativas-logros',
          { servicio,cb_year,cb_mes },
          { responseType: 'json' }
      );
  }
  listarLogros(cb_trimestre: any,cb_year:string,actividad:any) {
    return this.http.post<HttpResponseApi>(
        '/api/ceplan/listar-logros',
        { cb_trimestre,cb_year,actividad },
        { responseType: 'json' }
    );
}
  registrarLogros(logro: string,dificultad:string,accion_correctiva:string,accion_mejora:string,periodo:string,año:string,actividad:string) {
      return this.http.post<HttpResponseApi>(
          '/api/ceplan/registrar-logros',
          { logro,dificultad,accion_correctiva,accion_mejora,periodo,año,actividad},
          { responseType: 'json' }
      );
  }
}
