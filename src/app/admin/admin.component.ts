import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Iproduct } from '../iproduct';
import { DishesService } from '../dishes.service';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, RouterLink, NavComponent, AdminNavComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  products: Iproduct[] = [];
  errorMessage: string | null = null;
  loading: boolean = false;
  currentCategory: string = 'All';  

  constructor(
    private _DishesService: DishesService,
    public _AuthService: AuthService 
  ) {}

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

  deleteProduct(id: number): void {
    this._AuthService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product._id !== (id));
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.errorMessage = 'Failed to delete product. Please try again later.';
      }
    });
  }

  confirmDelete(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct(productId);
    }
  }
}
