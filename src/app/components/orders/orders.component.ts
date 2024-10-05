import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../core/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import Aos from 'aos';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgStyle,ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  shippingSuccess:boolean= false
  private readonly _PaymentService = inject(PaymentService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _Router = inject(Router)
  private readonly _CartService = inject(CartService)
  cartId:string ="";



  ngOnInit(): void {
    Aos.init()
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        console.log(params.get('id'));
        this.cartId = params.get('id')!
        console.log(this.cartId);
      }
    })
  }

  ngAfterViewInit(): void {
    Aos.refresh()
  }


  shep:FormGroup = new FormGroup({
    details:new FormControl(null),
    phone:  new FormControl(null),
    city:   new FormControl(null)
  })

  payShipping(){
    this._PaymentService.payCash(this.shep.value,this.cartId).subscribe({
      next:(res:any)=>{
        console.log(res);
        if(res.status == "success")
        {
          this.shippingSuccess = true
          this._CartService.numberCartItems.next(0)
        }
        
      },
      error:(err)=>{
         alert("failed to place order")
      }
    })
  }

  payOnline(){
    this._PaymentService.payOnline(this.shep.value,this.cartId).subscribe({
      next:(res:any)=>{
        console.log(res);
        if(res.status == "success")
        {
          this._CartService.numberCartItems.next(0)

          window.open(res.session.url,'_self')

        }
        
      },
      error:(err)=>{
         alert("failed to place order")
      }
    })
  }


}
