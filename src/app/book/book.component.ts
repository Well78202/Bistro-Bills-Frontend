import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  bookingForm: FormGroup;
  successMessage: string | null = null;
  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone:[null,[ Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) ]],
      totalPerson: ['1', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      console.log('Form Data:', this.bookingForm.value);
      this.successMessage = "Your table has been booked successfully!"; // Confirmation message
      this.bookingForm.reset();
    } else {
      console.log('Form is invalid');
      this.successMessage = null; // Clear the confirmation message if the form is invalid
    }
  }

  // Method to check if the form control is valid and touched
  isFieldValid(field: string) {
    return !this.bookingForm.get(field)?.valid && this.bookingForm.get(field)?.touched;
  }
}
