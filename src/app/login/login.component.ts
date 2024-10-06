import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  private setLoginFormSub!:Subscription

  isLoading:boolean=false
  msgSuccess:boolean=false
  errorMsg: string = '';

  loginForm:FormGroup = this._FormBuilder.group({
  email:[null,[ Validators.required , Validators.email ]],
  password:[null,[ Validators.required , Validators.pattern(/^([a-zA-Z]{1}[a-zA-Z0-9]{5,9})$/) ]],
  })

  submitloginForm() {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading=true
      this.errorMsg = '';
      this.setLoginFormSub=this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          
            this.msgSuccess=true
            this.isLoading=false
            setTimeout(()=>{
              localStorage.setItem('token',res.token)
              this._AuthService.saveUserData()
              console.log(res)
              if(res.role == 'admin'){
                this._Router.navigate(['/admin'])
              }else{
                this._Router.navigate(['/home'])
              }
            },1000)
          
        },
        error:(err:HttpErrorResponse)=> {
          this.isLoading = false
          if (err.status === 400) {  
            this.errorMsg = 'Invalid email or password';
          }
        },
      })
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }

}
