import { Component } from '@angular/core';
import { AboutHeadComponent } from '../about-head/about-head.component';
import { TestmonialsComponent } from "../testmonials/testmonials.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutHeadComponent, TestmonialsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
