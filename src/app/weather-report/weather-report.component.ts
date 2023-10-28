import { Component, OnInit, Output } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {
  currData: any;
  dailyData: any;
  isLoading: boolean = false;
  currentPosition: string = '';

  constructor(private weatherService: WeatherService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.weatherService.currWeatherData.subscribe(data => {
      if (Object.keys(data).length != 0) {
        this.currData = data;
      }
    });
    this.weatherService.dailyWeatherData.subscribe(data => {
      this.dailyData = data;
    });
    this.weatherService.isLoading.subscribe(data => this.isLoading = data);
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.currentPosition = `${position.coords.latitude},${position.coords.longitude}`;
        this.weatherService.getCurrentWeather(this.currentPosition);
        this.weatherService.getDailyWeather(this.currentPosition);
      },
      (error) => {
        if (error.code == 1)
          this.toastr.warning(
            `${error.message}.
            Click on info icon in address bar to Enable or Disable location access. 
        `, 'Access Denied', { timeOut: 5000, progressBar: true });
      }
    )
  }

}
