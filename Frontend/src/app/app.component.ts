import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BroadcastMessageFormComponent } from './components/broadcast-message-form/broadcast-message-form.component';
import { RegistrationToggleComponent } from './components/registration-toggle/registration-toggle.component';
import { RegisteredUsersComponent } from './components/registered-users/registered-users.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BroadcastMessageFormComponent, RegistrationToggleComponent, RegisteredUsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RICT';
}
