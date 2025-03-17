import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadOperComponent } from './pages/actividad-oper/actividad-oper.component';
import { SharedModule } from '@shared/shared.module';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { TablaComponent } from '@shared/components/tabla/tabla.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { PaginacionComponent } from '@shared/components/paginacion/paginacion.component';
import { CeplanRoutingModule } from './ceplan-routing.module';
import { CargaExportaComponent } from './pages/carga-exporta/carga-exporta.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { LogrosComponent } from './pages/logros/logros.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CronogramaComponent } from './pages/cronograma/cronograma.component';



@NgModule({
  declarations: [
    ActividadOperComponent,
    CargaExportaComponent,
    ReportesComponent,
    LogrosComponent,
    CronogramaComponent,
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BreadcrumbComponent,
    TablaComponent,
    LoadingComponent,
    PaginacionComponent,
    CeplanRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule

  ]
})
export class CeplanModule { }
