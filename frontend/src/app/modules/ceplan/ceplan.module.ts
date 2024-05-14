import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadOperComponent } from './pages/actividad-oper/actividad-oper.component';
import { SharedModule } from '@shared/shared.module';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { TablaComponent } from '@shared/components/tabla/tabla.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { PaginacionComponent } from '@shared/components/paginacion/paginacion.component';
import { CeplanRoutingModule } from './ceplan-routing.module';



@NgModule({
  declarations: [
    ActividadOperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BreadcrumbComponent,
    TablaComponent,
    LoadingComponent,
    PaginacionComponent,
    CeplanRoutingModule
  ]
})
export class CeplanModule { }
