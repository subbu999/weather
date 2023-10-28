import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = "9ec84b61e91e487391f55453231810";
  apiUrl = "https://api.weatherapi.com/v1/";

  isLoadingSource = new BehaviorSubject(false);
  isLoading = this.isLoadingSource.asObservable();

  currWeatherDataSource = new BehaviorSubject({});
  currWeatherData = this.currWeatherDataSource.asObservable();

  dailyWeatherDataSource = new BehaviorSubject([]);
  dailyWeatherData = this.dailyWeatherDataSource.asObservable();

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  getCurrentWeather(currentPlace?: string) {
    this.isLoadingSource.next(true);
    this.http.get<any>(`${this.apiUrl}current.json?&key=${this.apiKey}&q=${currentPlace}`).subscribe(
      {
        next: (data) => {
          this.currWeatherDataSource.next(data);
          this.isLoadingSource.next(false);

        },
        error: (error) => {
          this.toastrService.error(error.error.error.message, 'Error');
          this.isLoadingSource.next(false);
        }
      }
    );
  }

  getDailyWeather(currentPlace?: string) {
    this.http.get<any>(`${this.apiUrl}forecast.json?&key=${this.apiKey}&q=${currentPlace}&days=5`).subscribe(
      {
        next: (data) => {
          this.dailyWeatherDataSource.next(data.forecast.forecastday)
        }
      }

    )
  }
}

