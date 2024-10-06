import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DishesService } from '../dishes.service';
import { Iproduct } from '../iproduct';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  products: Iproduct[] = [];
  errorMessage: string | null = null;
  loading: boolean = false;
  currentCategory: string = 'All';  

  constructor(private _DishesService: DishesService) { }

  ngOnInit(): void {
    this.loading = true; // Start with loading true
    this._DishesService.getMenu().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false; // Stop loading when data is received
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = error.error?.message || 'Failed to load products. Please try again later.';
        this.loading = false; // Stop loading even in case of error
      }
    });
  }

  fetchCategory(category: string): void {
    this.loading = true; // Set loading to true when fetching
    this._DishesService.getCategories(category).subscribe({
      next: (data: any) => {
        this.products = data;  // Update products based on category
        this.currentCategory = category;  // Update the current category
        this.loading = false; // Stop loading when data is received
      },
      error: (error) => {
        console.error('Error fetching category products:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.loading = false; // Stop loading even in case of error
      }
    });
  }
}
