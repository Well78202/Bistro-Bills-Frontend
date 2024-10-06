import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy{
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  private setRegistrationFormSub!:Subscription

  isLoading:boolean=false
  msgSuccess:boolean=false
  errorMsg: string = '';

  registerForm:FormGroup = this._FormBuilder.group({
  name:[null,[ Validators.required , Validators.minLength(3) , Validators.maxLength(20) ]],
  email:[null,[ Validators.required , Validators.email ]],
  phone:[null,[ Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) ]],
  password:[null,[ Validators.required , Validators.pattern(/^([a-zA-Z]{1}[a-zA-Z0-9]{5,9})$/) ]],
  })

  submitRegistrationForm() {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading=true
      this.errorMsg = '';
      this.setRegistrationFormSub=this._AuthService.setRegistrationForm(this.registerForm.value).subscribe({
        next:(res)=>{
          
            this.msgSuccess=true
            this.isLoading=false
            setTimeout(()=>{
              this._Router.navigate(['/login'])
            },1000)
          
        },
        error:(err:HttpErrorResponse)=> {
          this.isLoading = false
          if (err.status === 400) {  
            this.errorMsg = 'Email already exists';
          }
        },
      })
    }
    else{
      this.registerForm.markAllAsTouched()
    }
  }
  ngOnDestroy(): void {
    this.setRegistrationFormSub?.unsubscribe()
  }
}
