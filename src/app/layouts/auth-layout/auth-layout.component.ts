import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavComponent } from "../../auth-nav/auth-nav.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [ RouterOutlet, AuthNavComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
