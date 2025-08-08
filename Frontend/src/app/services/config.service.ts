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
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Try to get from meta tag (set by build process)
      const metaTag = document.querySelector('meta[name="backend-url"]');
      if (metaTag && metaTag.getAttribute('content')) {
        return `${metaTag.getAttribute('content')}/api`;
      }
      
      // Try to get from window object (set by build process)
      if ((window as any).__BACKEND_URL__) {
        return `${(window as any).__BACKEND_URL__}/api`;
      }
    }
    
    // Fallback to relative path
    return '/api';
  }
}
