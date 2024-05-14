import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ActividadOperComponent } from './pages/actividad-oper/actividad-oper.component';

const routes: Routes = [
    {path: 'registro', component: ActividadOperComponent, title: 'MOPLAN| SISPLAN'},
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CeplanRoutingModule {
}
