import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DishesService } from '../dishes.service';
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { NgIf } from '@angular/common';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

@Component({
  selector: 'app-add-product',
  imports: [NgIf, ReactiveFormsModule, NavComponent, AdminNavComponent],
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  addProductForm: FormGroup;
  errorMessage: string | null = null;
  allowedCategories = ['Main Dishes', 'Desserts', 'Appetizers', 'Drinks'];

  constructor(
    private fb: FormBuilder,
    private dishesService: DishesService,
    private router: Router
  ) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', [Validators.required, this.categoryValidator.bind(this)]],
      image: ['', Validators.required]
    });
  }
  categoryValidator(control: any): { [key: string]: boolean } | null {
    if (!this.allowedCategories.includes(control.value)) {
      return { invalidCategory: true }; 
    }
    return null; 
  }
  addProduct(): void {
    if (this.addProductForm.valid) {
      this.dishesService.addProduct(this.addProductForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin']); // Redirect after successful addition
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.errorMessage = 'Failed to add product. Please try again later.';
        }
      });
    }
  }
}
