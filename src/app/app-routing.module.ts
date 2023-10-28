import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WeatherReportComponent } from './weather-report/weather-report.component';
import { SportsComponent } from './sports/sports.component';


const routes: Routes = [
  { path: 'weather', component: WeatherReportComponent },
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: 'sports', component: SportsComponent }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
