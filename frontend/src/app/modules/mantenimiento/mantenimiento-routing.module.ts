import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioComponent} from "@modules/mantenimiento/pages/usuarios/usuario.component";
import { ProcesarEjecucionComponent } from './pages/procesar-ejecucion/procesar-ejecucion.component';

const routes: Routes = [
    {
        path: 'usuarios',
        component: UsuarioComponent,
        title: 'Usuarios | MOPLAN',
    },
    {
        path: 'procesar-ejecucion',
        component: ProcesarEjecucionComponent,
        title: 'Procesar-Ejecución | MOPLAN',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class MantenimientoRoutingModule {
}
