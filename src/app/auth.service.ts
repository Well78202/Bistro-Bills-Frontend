import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IRegistrationForm } from './iregistration-form';
import { IUserData } from './iuser-data';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient)
  private readonly _Router = inject(Router)

  userData:IUserData | null=null

  setRegistrationForm(data: IRegistrationForm): Observable<any> {
    return this._HttpClient.post(`http://localhost:5500/user/register`,data)
  }
  setLoginForm(data:object ): Observable<any> {
    return this._HttpClient.post(`http://localhost:5500/user/login`,data)
  }

  saveUserData():void{
    let token:string | null =localStorage.getItem('token')
    if (token !== null) {
      this.userData=jwtDecode(token)
    }
  }

  deleteProduct(id: number): Observable<any> {
    const url = `http://localhost:5500/products/${id}`;
    return this._HttpClient.delete(url)
  }

  logout():void{
    localStorage.removeItem('token')
    this.userData=null
    this._Router.navigate(['/login'])
    
  }
}
