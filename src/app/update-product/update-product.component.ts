import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../iproduct';
import { DishesService } from '../dishes.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NavComponent, AdminNavComponent],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'] // Corrected from styleUrl to styleUrls
})
export class UpdateProductComponent implements OnInit {
  product: Iproduct | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;
  updateForm: FormGroup; // Declare the updateForm

  constructor(
    private _DishesService: DishesService,
    public _AuthService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _Router:Router
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this._DishesService.getProductById(id).subscribe({ // Convert id to number
        next: (res) => {
          this.product = res;
          this.fillUpdateForm(this.product); // Fill the form with product data
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load product details.';
          this.loading = false;
        }
      });
    }
  }

  fillUpdateForm(product: Iproduct): void {
    this.updateForm.patchValue({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    });
  }

  updateProduct(id: any): void { // Change id to number
    if (this.updateForm.valid) {
      this._DishesService.updateProduct(id, this.updateForm.value).subscribe({
        next: (updatedProduct) => {
          // Optionally, navigate back or show a success message
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.errorMessage = 'Failed to update product. Please try again later.';
        }
      });
    }
  }

  confirmUpdate(product: Iproduct): void {
    if (confirm('Are you sure you want to update this product?')) {
      this.updateProduct(product._id);
      this._Router.navigate(['/admin'])
    }
  }
}
