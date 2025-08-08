import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-registered-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registered-users.component.html',
  styleUrl: './registered-users.component.css'
})
export class RegisteredUsersComponent implements OnInit {
  users: any[] = [];
  totalUsers = 0;
  activeUsers = 0;
  isLoading = false;
  error = '';
  lastUpdated = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.error = '';

    this.adminService.getRegisteredUsers().subscribe({
      next: (response) => {
        this.users = response.users;
        this.totalUsers = response.total;
        this.activeUsers = this.users.filter(user => user.isActive).length;
        this.lastUpdated = new Date().toLocaleString();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  refreshUsers() {
    this.loadUsers();
  }

  getStatusBadgeClass(user: any): string {
    return user.isActive 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  }

  getStatusText(user: any): string {
    return user.isActive ? 'Active' : 'Inactive';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  getUserInitial(user: any): string {
    return (user.firstName || user.username || 'U').charAt(0).toUpperCase();
  }
}
