import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { AuthServiceService } from '../../core/services/auth/auth-service.service';
import { AbstractControl, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "./alert/alert.component";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit , OnDestroy{
  errMsg: any;
  unsub!:Subscription;

  constructor(private _FlowbiteService:FlowbiteService){}
  private readonly _AuthServiceService = inject(AuthServiceService)
  private readonly _Router = inject(Router)
  isLoading:boolean=false

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(()=>{})
}

reg:FormGroup = new FormGroup({
  name: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email: new FormControl(null, [Validators.required,Validators.email]),
  phone: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  password: new FormControl(null, [Validators.required,Validators.pattern(/^\w{6,}$/)]),
  rePassword: new FormControl(null),
},this.confirmPassword)

handleRegister(){
  console.log(this.reg.getError('mismatch'));
  console.log(this.reg);
  this.isLoading= true
  if (this.reg.valid) {
     this._AuthServiceService.setRegister(this.reg.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.isLoading= false
      if(res.message == "success")
      {
        this._Router.navigate(['/login'])
      }
    },
    error:(err)=>{
      console.log(err);
      this.isLoading= false
      this.errMsg=err.error.message
    }
  })
  }
 
}

confirmPassword(g:AbstractControl){
if(g.get('password')?.value === g.get('rePassword')?.value)
{
  return null
}
else{
  return {'mismatch':true}
}
}

  ngOnDestroy(){
    this.unsub?.unsubscribe()
  }

}
