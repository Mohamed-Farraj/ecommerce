import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { IProduct } from '../../core/interfaces/iproduct';
import { IPData } from '../../core/interfaces/ipdata';
import { CartService } from '../../core/services/cart.service';
import { updatecartnumber } from '../../core/environments/environment';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import Aos from 'aos';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-hcard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './hcard.component.html',
  styleUrl: './hcard.component.scss'
})
export class HcardComponent {

      @Input() cardtype:string="";
      @Input() productData!:any;
      @Output() notifyParent: EventEmitter<void> = new EventEmitter();
      spin:boolean = true
      isLoading:boolean = false
      wloading:boolean = false

      private readonly _CartService = inject(CartService)
      private readonly _WishlistService = inject(WishlistService)
      private readonly _ToastrService = inject(ToastrService)

      ngOnInit(): void {
        Aos.init({once:true})
        console.log(this.productData);
      }

      ngAfterViewInit(): void {
        Aos.refresh()
      }
      plus(id:string)
      {
        this.spin = false
        console.log(this.productData.product.id);
        let newCount = this.productData.count +1
        this._CartService.updateCart(id,newCount.toString()).subscribe({
          next:(res)=>{
            console.log(res);
            this.notifyParent.emit()
            this.spin = true
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
      minus(id:string)
      {
        this.spin = false
        console.log(this.productData.product.id);
        let newCount = this.productData.count - 1
        if(newCount == 0)
        {
          updatecartnumber("-")
        }
        this._CartService.updateCart(id,newCount.toString()).subscribe({
          next:(res:any)=>{
            console.log(res);
            this.spin = true
            this._CartService.numberCartItems.next(res.numOfCartItems)
            this.notifyParent.emit()
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }


      removeItem(id:string){
        this.wloading = true
        this._CartService.removeFromCart(id).subscribe({
          next:(res:any)=>{
            console.log("removal result",res);
            updatecartnumber("-")
            this.notifyParent.emit()
            this._ToastrService.success(res.status)
            this._CartService.numberCartItems.next(res.numOfCartItems)
            this.wloading = false
          },
          error:(err)=>{
            console.log(err);
            this._ToastrService.error(err.status)
            this.wloading = false
          }
        })
      }
      removeItemw(id:string){
        this.wloading = true
        this._WishlistService.removeWishlist(id).subscribe({
          next:(res:any)=>{
            console.log("removal result",res);
            this.notifyParent.emit();
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

      addToCart(id:string){
        this.isLoading = true
        this._CartService.addToCart(id).subscribe({
          next:(res:any)=>{
            this.isLoading = false
            console.log(res);
            this._CartService.numberCartItems.next(res.numOfCartItems)
            updatecartnumber("+")
            this._ToastrService.success(res.message)            
          },
          error:(err)=>{
            console.log(err);
            this._ToastrService.error(err.message)
          }
        })
       }


}
