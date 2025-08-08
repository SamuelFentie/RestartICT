import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService, BroadcastMessage } from '../../services/admin.service';

@Component({
  selector: 'app-broadcast-message-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './broadcast-message-form.component.html',
  styleUrl: './broadcast-message-form.component.css'
})
export class BroadcastMessageFormComponent {
  messageForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.messageForm = this.fb.group({
      imageUrl: ['', [Validators.pattern('https?://.+')]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.isSubmitting = true;
      this.submitError = '';
      this.submitSuccess = false;
      
      const messageData: BroadcastMessage = {
        imageUrl: this.messageForm.get('imageUrl')?.value || undefined,
        title: this.messageForm.get('title')?.value,
        body: this.messageForm.get('body')?.value
      };

      // Call admin service to broadcast message
      this.adminService.broadcastMessage(messageData).subscribe({
        next: (response) => {
          console.log('Broadcast message sent successfully:', response);
          this.submitSuccess = true;
          this.messageForm.reset();
          this.isSubmitting = false;
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error sending broadcast message:', error);
          this.submitError = error.error?.message || 'Failed to send broadcast message. Please try again.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.messageForm.controls).forEach(key => {
      const control = this.messageForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.messageForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      }
      if (control.errors['minlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return 'Please enter a valid URL starting with http:// or https://';
      }
    }
    return '';
  }
}
