import { NgStyle } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { cartItems, enverionment, updatecartnumber } from '../../core/environments/environment';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle,RouterLink],
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

 ratingCiel:number = Math.ceil(this.rating);
 private readonly _CartService = inject(CartService)
 private readonly _WishlistService = inject(WishlistService)
 private readonly _ToastrService = inject(ToastrService)
 
 getGradient(value: number){
  const percentage = (value / 5) * 100; // Convert to percentage based on max 5 stars
    return `linear-gradient(90deg, #FFC107 ${percentage}%, #E0E0E0 ${percentage}%)`;
 }

 addToCart(id:string){
  this._CartService.addToCart(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      updatecartnumber("+")
      console.log(cartItems);
      this._ToastrService.success(res.message)
    },
    error:(err)=>{
      console.log(err);
      this._ToastrService.error(err.message)
    }
  })
 }

 addToWishlist(id:string){

  this._WishlistService.addWishlist(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this._ToastrService.success(res.message)
    },
    error:(err)=>{
      console.log(err);
      this._ToastrService.error(err.message)
    }
  })

 }


}
