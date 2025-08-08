import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _apiUrl: string;

  constructor() {
    this._apiUrl = this.getApiUrl();
    console.log('🔧 ConfigService initialized with API URL:', this._apiUrl);
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  private getApiUrl(): string {
    // Static backend URL for production
    return 'https://restartict-618223024788.europe-west1.run.app/api';
  }
}
