import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../register/alert/alert.component";
import { AuthServiceService } from '../../core/services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {
isLoading: boolean = false;
errMsg: any;
step:number = 1;
errorMsg: any;
    constructor(private _flow: FlowbiteService) {}

    private readonly _AuthServiceService = inject(AuthServiceService)
    private readonly _Router = inject(Router)

    ngOnInit(): void {
      this._flow.loadFlowbite(() => {})
    }

    fem:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email])
    })
    forgotEmail(){
      this.isLoading=true
      this._AuthServiceService.forgotPassword(this.fem.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading=false
          if (res.statusMsg=== "success") {
            this.step=2
          }
        },
        error:(err)=>{
          this.isLoading=false
          this.errMsg="not found"
        }
      })
    }

    pin:FormGroup=new FormGroup({
      resetCode:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(6)])
    })
verifyCode(){
  this.isLoading=true
 this.errMsg=null
this._AuthServiceService.verifyResetCode(this.pin.value).subscribe({
  next:(res)=>{
    this.isLoading=false
    console.log(res);
    if (res.status=== "Success") {
      this.step=3
    }
    else
    {
      this.isLoading=false
      this.errMsg= res.status
    }
  },
  error:(err)=>{
    console.log(err);
    this.isLoading=false
    this.errMsg=err.error.message
  }
})
}

log:FormGroup= new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required,Validators.minLength(6)])
})

finishReset(){
  console.log(this.log.value);
  this.isLoading=true
this._AuthServiceService.resetPassword(this.log.value).subscribe({
  next:(res)=>{

      this.isLoading=false
      console.log("success");
    this._Router.navigate(['/login']);

    
  },
  error:(err)=>{
    console.log(err);
    this.isLoading=false
    this.errMsg=err.error.message
   }})
}
  
  }
