import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../footer/footer.component";
import { NavComponent } from "../../nav/nav.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterOutlet, FooterComponent, NavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}