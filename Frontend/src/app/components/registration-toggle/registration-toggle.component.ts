import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, RegistrationStatus, ToggleRegistrationResponse } from '../../services/admin.service';

@Component({
  selector: 'app-registration-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-toggle.component.html',
  styleUrl: './registration-toggle.component.css'
})
export class RegistrationToggleComponent implements OnInit {
  isRegistrationEnabled = false;
  isUpdating = false;
  lastUpdated: Date | null = null;
  isLoading = true;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadRegistrationStatus();
  }

  loadRegistrationStatus() {
    this.isLoading = true;
    this.error = '';
    
    this.adminService.getRegistrationStatus().subscribe({
      next: (response: RegistrationStatus) => {
        this.isRegistrationEnabled = response.enabled;
        this.lastUpdated = new Date(response.lastUpdated);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading registration status:', error);
        this.error = 'Failed to load registration status';
        this.isLoading = false;
      }
    });
  }

  toggleRegistration() {
    this.isUpdating = true;
    this.error = '';
    
    this.adminService.toggleRegistration().subscribe({
      next: (response: ToggleRegistrationResponse) => {
        this.isRegistrationEnabled = response.enabled;
        this.lastUpdated = new Date();
        this.isUpdating = false;
        console.log('Registration status changed to:', this.isRegistrationEnabled);
      },
      error: (error) => {
        console.error('Error toggling registration:', error);
        this.error = error.error?.message || 'Failed to toggle registration status';
        this.isUpdating = false;
      }
    });
  }

  getStatusColor(): string {
    return this.isRegistrationEnabled ? 'text-green-600' : 'text-red-600';
  }

  getStatusBgColor(): string {
    return this.isRegistrationEnabled ? 'bg-green-100' : 'bg-red-100';
  }

  getStatusText(): string {
    return this.isRegistrationEnabled ? 'Enabled' : 'Disabled';
  }

  getStatusIcon(): string {
    return this.isRegistrationEnabled ? 'check-circle' : 'x-circle';
  }
}
