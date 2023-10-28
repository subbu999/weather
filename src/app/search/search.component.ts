import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchWord = '';
  @ViewChild('searchInput') searchInput: ElementRef | undefined;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {

  }
  onFormSubmit() {
    this.searchInput?.nativeElement.blur();
    this.weatherService.getCurrentWeather(this.searchWord);
    this.weatherService.getDailyWeather(this.searchWord);
  }
}
