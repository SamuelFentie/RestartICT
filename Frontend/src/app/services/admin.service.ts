import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BroadcastMessage {
  imageUrl?: string;
  title: string;
  body: string;
}

export interface RegistrationStatus {
  enabled: boolean;
  lastUpdated: Date;
}

export interface ToggleRegistrationResponse {
  enabled: boolean;
  message: string;
}

export interface BroadcastResponse {
  success: boolean;
  message: string;
  sentTo: number;
}

export interface User {
  telegramId: number;
  username: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  registeredAt: Date;
}

export interface UsersResponse {
  users: User[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Broadcast a message to all registered users
  broadcastMessage(message: BroadcastMessage): Observable<BroadcastResponse> {
    return this.http.post<BroadcastResponse>(`${this.apiUrl}/broadcast`, message);
  }

  // Get current registration status
  getRegistrationStatus(): Observable<RegistrationStatus> {
    return this.http.get<RegistrationStatus>(`${this.apiUrl}/registration/status`);
  }

  // Toggle registration on/off
  toggleRegistration(): Observable<ToggleRegistrationResponse> {
    return this.http.post<ToggleRegistrationResponse>(`${this.apiUrl}/registration/toggle`, {});
  }

  // Get all registered users
  getRegisteredUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`);
  }

  // Register a new user (called by Telegram bot)
  registerUser(userData: {
    telegramId: number;
    username: string;
    firstName?: string;
    lastName?: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/registration/register-user`, userData);
  }

  // Test if the bot is running
  testBot(): Observable<{ message: string; instructions: string[] }> {
    return this.http.get<{ message: string; instructions: string[] }>(`${this.apiUrl}/bot/test`);
  }
}
