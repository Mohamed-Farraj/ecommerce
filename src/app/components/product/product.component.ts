import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Aos from 'aos';
import { NgIf } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardComponent,FormsModule,NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit,OnDestroy {

  private readonly _productsService = inject(ProductsService);
  private readonly _WishlistService = inject(WishlistService);
  products: IProduct[] = [];
  public wish: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  unsub!: Subscription;
  isWish:boolean = false
  test:boolean = true

  changtest(e:any){
    this.test =!this.test;
    console.log("test changed",e);
    if(e[1])
    {
      this.wish.push(this.products.find(p => p._id === e[0])!) 
    }
    else{
      this.wish = this.wish.filter(p => p._id!== e[0])
    }

  }


  searchQuery: string = '';  


  isInWishlist(productId: string): boolean {
    return this.wish.some(product => product._id === productId);
  }

  
  onSearchChange(query: string) {
    console.log('Search query:', query);
    this.searchQuery = query;
    this.filterProducts();
  }

  filterProducts() {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products]; // If no search, reset to all products
    }
  }
  

  ngOnInit(): void {
  Aos.init({
          once:false,
          offset: 180,
          duration:800,
  })


  this._WishlistService.getWishlist().subscribe({
    next:(res:any)=>{
      console.log("wish is here",res.data);
      this.wish = res.data
    },
    error:(err)=>{
      console.log(err);
    }
  })


    this._productsService.getAllProducts().subscribe({
      next:(res:any)=>{
        console.log(res.data);
        this.products = res.data
        this.filteredProducts = this.products
      },
      error:(err)=>{
        console.log(err);
      }
    })
  
  }
  ngAfterViewInit(): void {
     Aos.refresh(); 
    setTimeout(() => {
      Aos.refresh(); 
    }, 2500);
  }

  ngOnDestroy(): void {
    this.unsub?.unsubscribe()
  }
}
