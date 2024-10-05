import { IProduct } from './../../core/interfaces/iproduct';
import { ICategories } from './../../core/interfaces/icategoris';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from "../card/card.component";
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit , OnDestroy{ 
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly spinner = inject(NgxSpinnerService)
  products:IProduct[]=[]
  categories:ICategories[]=[]
  unsub!: Subscription;
  unsubC!: Subscription;
  



  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayHoverPause:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

ngOnInit(): void {
  this.unsub = this._ProductsService.getAllProducts().subscribe({
    next:(res:any)=>{
      console.log(res.data);
      this.products = res.data
    },
    error:(err)=>{
      console.log(err);
    }
  })

 this.unsubC =  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categories = res.data
    },
    error:(err)=>{
      console.log(err);
    }
  })

}

ngOnDestroy(): void {
  this.unsub?.unsubscribe()
  this.unsubC?.unsubscribe()
}


}
