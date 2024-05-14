import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerBiComponent } from './pages/power-bi/power-bi.component';
import { SharedModule } from '@shared/shared.module';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { TablaComponent } from '@shared/components/tabla/tabla.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { PaginacionComponent } from '@shared/components/paginacion/paginacion.component';
import { GastosRoutingModule } from './gastos-routing.module';



@NgModule({
  declarations: [
    PowerBiComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BreadcrumbComponent,
    TablaComponent,
    LoadingComponent,
    PaginacionComponent,
    GastosRoutingModule
  ]
})
export class GastosModule { }
