import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout'
import { HighchartsChartModule } from 'highcharts-angular';
import { from } from 'rxjs';
import { DoughnutChartComponent } from './widgets/doughnut-chart/doughnut-chart.component';
import { BarHorizontalChartComponent } from './widgets/bar-horizontal-chart/bar-horizontal-chart.component';
import { BarVerticalChartComponent } from './widgets/bar-vertical-chart/bar-vertical-chart.component';
import { LineSingleAxisChartComponent } from './widgets/line-single-axis-chart/line-single-axis-chart.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DoughnutChartComponent,
    BarHorizontalChartComponent,
    BarVerticalChartComponent,
    LineSingleAxisChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DoughnutChartComponent,
    BarHorizontalChartComponent,
    BarVerticalChartComponent,
    LineSingleAxisChartComponent,
  ]
})
export class SharedModule { }
