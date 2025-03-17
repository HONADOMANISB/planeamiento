import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponseApi } from '@interfaces/http.interface';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  constructor(private http: HttpClient) {}
  listarEventos() {
    return this.http.post<HttpResponseApi>(
        '/api/ceplan/listar-eventos',
        { },
        { responseType: 'json' }
    );
}

}
