import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardComponent,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit,OnDestroy {

  private readonly _productsService = inject(ProductsService);
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  unsub!: Subscription;


  searchQuery: string = '';  

  
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

  ngOnDestroy(): void {
    this.unsub?.unsubscribe()
  }
}
