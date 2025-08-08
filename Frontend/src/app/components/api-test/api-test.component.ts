import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-test.component.html',
  styleUrl: './api-test.component.css'
})
export class ApiTestComponent implements OnInit {
  testResults: any = {};
  isLoading = false;
  error = '';
  Object = Object; // Make Object available in template

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.runTests();
  }

  runTests() {
    this.isLoading = true;
    this.error = '';
    this.testResults = {};

    // Test 1: Check if bot is running
    this.adminService.testBot().subscribe({
      next: (response) => {
        this.testResults.botTest = {
          success: true,
          message: response.message,
          instructions: response.instructions
        };
        this.testRegistrationStatus();
      },
      error: (error) => {
        this.testResults.botTest = {
          success: false,
          error: error.message
        };
        this.isLoading = false;
        this.error = 'API connection failed. Make sure the backend is running.';
      }
    });
  }

  private testRegistrationStatus() {
    this.adminService.getRegistrationStatus().subscribe({
      next: (response) => {
        this.testResults.registrationStatus = {
          success: true,
          enabled: response.enabled,
          lastUpdated: response.lastUpdated
        };
        this.testUsers();
      },
      error: (error) => {
        this.testResults.registrationStatus = {
          success: false,
          error: error.message
        };
        this.isLoading = false;
      }
    });
  }

  private testUsers() {
    this.adminService.getRegisteredUsers().subscribe({
      next: (response) => {
        this.testResults.users = {
          success: true,
          total: response.total,
          users: response.users
        };
        this.isLoading = false;
      },
      error: (error) => {
        this.testResults.users = {
          success: false,
          error: error.message
        };
        this.isLoading = false;
      }
    });
  }

  retryTests() {
    this.runTests();
  }
}
