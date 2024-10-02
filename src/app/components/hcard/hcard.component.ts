import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { IProduct } from '../../core/interfaces/iproduct';
import { IPData } from '../../core/interfaces/ipdata';
import { CartService } from '../../core/services/cart.service';
import { updatecartnumber } from '../../core/environments/environment';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hcard',
  standalone: true,
  imports: [],
  templateUrl: './hcard.component.html',
  styleUrl: './hcard.component.scss'
})
export class HcardComponent {

      @Input() cardtype:string="";
      @Input() productData!:any;
      @Output() notifyParent: EventEmitter<void> = new EventEmitter();

      private readonly _CartService = inject(CartService)
      private readonly _WishlistService = inject(WishlistService)
      private readonly _ToastrService = inject(ToastrService)

      ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        console.log(this.productData);
      }

      plus(id:string)
      {
        console.log(this.productData.product.id);
        let newCount = this.productData.count +1
        this._CartService.updateCart(id,newCount.toString()).subscribe({
          next:(res)=>{
            console.log(res);
            this.notifyParent.emit()
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
      minus(id:string)
      {
        console.log(this.productData.product.id);
        let newCount = this.productData.count - 1
        if(newCount = 0)
        {
          updatecartnumber("-")
        }
        this._CartService.updateCart(id,newCount.toString()).subscribe({
          next:(res)=>{
            console.log(res);
            this.notifyParent.emit()
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }


      removeItem(id:string){
        this._CartService.removeFromCart(id).subscribe({
          next:(res:any)=>{
            console.log("removal result",res);
            updatecartnumber("-")
            this.notifyParent.emit()
            this._ToastrService.success(res.status)
          },
          error:(err)=>{
            console.log(err);
            this._ToastrService.error(err.status)
          }
        })
      }
      removeItemw(id:string){
        this._WishlistService.removeWishlist(id).subscribe({
          next:(res:any)=>{
            console.log("removal result",res);
            this.notifyParent.emit();
            this._ToastrService.success(res.message)
          },
          error:(err)=>{
            console.log(err);
            this._ToastrService.error(err.message)
          }
        })
      }

      addToCart(id:string){
        this._CartService.addToCart(id).subscribe({
          next:(res:any)=>{
            console.log(res);
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
