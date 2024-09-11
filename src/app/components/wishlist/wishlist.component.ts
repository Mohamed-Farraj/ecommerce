import { WishlistService } from './../../core/services/wishlist.service';
import { Component, inject } from '@angular/core';
import { HcardComponent } from "../hcard/hcard.component";
import { IProduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [HcardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  private readonly _WishlistService = inject(WishlistService)
  ProductData:IProduct[] =[] 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   this.display()
  }

  display(){
    this._WishlistService.getWishlist().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.ProductData = res.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
}
