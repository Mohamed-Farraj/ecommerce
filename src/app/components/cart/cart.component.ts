import { Component, inject, OnInit } from '@angular/core';
import { HcardComponent } from "../hcard/hcard.component";
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/services/cart.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { NgStyle } from '@angular/common';
import { cartItems, enverionment, updatecartnumber } from '../../core/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HcardComponent,NgStyle],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  private readonly _HttpClient = inject(HttpClient)
  private readonly _CartService = inject(CartService)
  private readonly _Router = inject(Router)
  numberOfItems:number=0;
  cartPrice:number=0;
  cartId:string=""
  products:IProduct[]=[]
  ngOnInit(): void {
    
    this.display()
    
  }


  display(){
    this._CartService.getCart().subscribe({
      next:(res:any)=>{
        if(res.status === "success")
        {
          this.numberOfItems = res.numOfCartItems;
          this.cartPrice = res.data.totalCartPrice;
          this.products = res.data.products;
          this.cartId = res.cartId
          updatecartnumber(this.numberOfItems)
          console.log(cartItems);
          console.log(res);
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  clearCart(){
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        updatecartnumber("*")
        this.display()
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

  checkout(){
    this._Router.navigate(["/orders",this.cartId])
  }
}
