import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ActividadOperComponent } from './pages/actividad-oper/actividad-oper.component';
import { CargaExportaComponent } from './pages/carga-exporta/carga-exporta.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { LogrosComponent } from './pages/logros/logros.component';

const routes: Routes = [
    {path: 'registro', component: ActividadOperComponent, title: 'MOPLAN| MOPLAN'},
    {path: 'cargar-exporta', component: CargaExportaComponent, title: 'MOPLAN| MOPLAN'},
    {path: 'reportes', component: ReportesComponent, title: 'MOPLAN| MOPLAN'},
    {path: 'logros', component: LogrosComponent, title: 'MOPLAN| MOPLAN'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CeplanRoutingModule {
}
