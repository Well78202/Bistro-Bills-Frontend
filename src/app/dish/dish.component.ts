import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishesService } from '../dishes.service';
import { Iproduct } from '../iproduct';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-dish',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css'
})
export class DishComponent {
  product: Iproduct | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private _DishesService: DishesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // الحصول على الـ ID من المسار
    if (id) {
      this.loading = true;
      this._DishesService.getProductById(id).subscribe({
        next: (res) => {
          this.product = res;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load product details.';
          this.loading = false;
        }
      });
    }
  }
}
