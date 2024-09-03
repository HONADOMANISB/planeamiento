import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ActividadOperComponent } from './pages/actividad-oper/actividad-oper.component';
import { CargaExportaComponent } from './pages/carga-exporta/carga-exporta.component';

const routes: Routes = [
    {path: 'registro', component: ActividadOperComponent, title: 'MOPLAN| SISPLAN'},
    {path: 'cargar-exporta', component: CargaExportaComponent, title: 'MOPLAN| SISPLAN'},
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CeplanRoutingModule {
}
