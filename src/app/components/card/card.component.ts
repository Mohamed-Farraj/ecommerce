import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { cartItems, enverionment, updatecartnumber } from '../../core/environments/environment';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import * as AOS from 'aos';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle,RouterLink,NgIf,NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
 @Input() imgSrc:string = "https://flowbite.com/docs/images/products/apple-watch.png";
 @Input() category:string = "electronics";
 @Input() title:string = "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport";
 @Input() price:number = 0;
 @Input() rating:number = 0.0;
 @Input() productId:string = "";
 @Input() wish:boolean = false;
 @Output() favoriteClicked: EventEmitter<any> = new EventEmitter();

 ratingCiel:number = Math.ceil(this.rating);
 private readonly _CartService = inject(CartService)
 private readonly _WishlistService = inject(WishlistService)
 private readonly _ToastrService = inject(ToastrService)
 isLoading:boolean = false
 wloading:boolean = false

 

 getGradient(value: number){
  const percentage = (value / 5) * 100;
    return `linear-gradient(90deg, #FFC107 ${percentage}%, #E0E0E0 ${percentage}%)`;
 }

 addToCart(id:string){
  this.isLoading = true;
  this._CartService.addToCart(id).subscribe({
    next:(res:any)=>{
      this.isLoading = false;
      console.log(res);
      this._CartService.numberCartItems.next(res.numOfCartItems) 
      console.log(this._CartService.numberCartItems );
      updatecartnumber("+")
      console.log(cartItems);
      this._ToastrService.success(res.message)
    },
    error:(err)=>{
      console.log(err);
      this.isLoading = false;
      this._ToastrService.error(err.message)
    }
  })
 }

 addToWishlist(id:string){
  this.wloading = true;

  if(!this.wish)
  {

    this._WishlistService.addWishlist(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        
        this._ToastrService.success(res.message)
        this.favoriteClicked.emit([id,true]);
        this.wloading = false;

      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.message)
        this.wloading = false;
      }
    })
  }

  else{
    this._WishlistService.removeWishlist(id).subscribe({
      next:(res:any)=>{
        console.log("removal result",res);
        this.favoriteClicked.emit([id,false]);
        this._ToastrService.success(res.message)
        this.wloading = false;
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.message)
        this.wloading = false;
      }
    })
  }


 }


}
