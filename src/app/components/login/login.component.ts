import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../register/alert/alert.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{

  private readonly _Router = inject(Router)
  private readonly _AuthServiceService = inject(AuthServiceService)
  private readonly _FormBuilder = inject(FormBuilder)
  isLoading:boolean=false
  errMsg:string="";
  unsub!:Subscription

  log:FormGroup = this._FormBuilder.group({
    email:[null,[Validators.email,Validators.required]],
    password:[null,[Validators.required]]
  })

  handleLogin(){
    this.isLoading= true
    this._AuthServiceService.login(this.log.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoading=false
        if(res.message == "success")
        {
          sessionStorage.setItem("token",res.token)
          this._AuthServiceService.deJWT();
          this._Router.navigate(['/home'])
        }
      },
      error:(err)=>{
        console.log(err)
        this.errMsg = err.error.message
        this.isLoading=false
      }
    })
    
  }
  ngOnDestroy(): void {
    this.unsub?.unsubscribe()
  }
}
