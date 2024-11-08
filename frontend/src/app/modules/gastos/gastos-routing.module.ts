import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PowerBiComponent } from './pages/power-bi/power-bi.component';



const routes: Routes = [
    {path: 'ejecucion', component: PowerBiComponent, title: 'Gastos| MOPLAN'},
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GastosRoutingModule {
}
