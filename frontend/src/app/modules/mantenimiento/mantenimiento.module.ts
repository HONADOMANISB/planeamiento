import {NgModule} from '@angular/core';
import {MantenimientoRoutingModule} from './mantenimiento-routing.module';
import {SharedModule} from "@shared/shared.module";
import {BreadcrumbComponent} from "@shared/components/breadcrumb/breadcrumb.component";
import {LoadingComponent} from "@shared/components/loading/loading.component";
import {PaginacionComponent} from "@shared/components/paginacion/paginacion.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UsuarioComponent} from "@modules/mantenimiento/pages/usuarios/usuario.component";
import {ModalUsuarioComponent} from "@modules/mantenimiento/components/modal-usuario/modal-usuario.component";
import {ModalPerfilComponent} from "@modules/mantenimiento/components/modal-perfil/modal-perfil.component";
import { ProcesarEjecucionComponent } from './pages/procesar-ejecucion/procesar-ejecucion.component';
import { ModalProcesarComponent } from './components/modal-procesar/modal-procesar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalReporteInvalidadosComponent } from './components/modal-reporte-invalidados/modal-reporte-invalidados.component';
import { ModalBloquearComponent } from './components/modal-bloquear/modal-bloquear.component';
import { ModalInformacionBloqueoComponent } from './components/modal-informacion-bloqueo/modal-informacion-bloqueo.component';



@NgModule({
    declarations: [
        UsuarioComponent,
        ProcesarEjecucionComponent,
        ModalUsuarioComponent,
        ModalPerfilComponent,
        ModalProcesarComponent,
        ModalReporteInvalidadosComponent,
        ModalBloquearComponent,
        ModalInformacionBloqueoComponent
    ],
    exports: [],
    imports: [
        SharedModule,
        BreadcrumbComponent,
        LoadingComponent,
        PaginacionComponent,
        MantenimientoRoutingModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
    providers: []
})
export class MantenimientoModule {

}
