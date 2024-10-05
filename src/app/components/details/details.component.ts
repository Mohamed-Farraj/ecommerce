import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDetails } from '../../core/interfaces/idetails';
import { NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { cartItems, updatecartnumber } from '../../core/environments/environment';
import Aos from 'aos';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements OnInit,OnDestroy{

  private readonly _ProductsService = inject(ProductsService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService)

  id: string | null = ""
  slds:number= 3;
  detail!:IDetails 
  unsubParams!:Subscription
  unsubDetails!:Subscription
  hero:string = ""
  
  ngOnInit(): void {
    Aos.init()
      this.unsubParams = this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          console.log(params.get('id'));
          this.id = params.get('id')
          this.unsubDetails = this._ProductsService.getSpecificProduct(this.id!).subscribe(
        {
          next:(res:any)=>{
            console.log(res);
            this.detail = res.data
            this.hero = this.detail.imageCover
          }
        }
      )
        }
      })
      
  }

  ngAfterViewInit(): void {

    Aos.refresh()
  }

  
  ngOnDestroy(): void {
    this.unsubParams.unsubscribe()
    this.unsubDetails.unsubscribe()
  }


  getGradient(value: number){
    const percentage = (value / 5) * 100; // Convert to percentage based on max 5 stars
      return `linear-gradient(90deg, #FFC107 ${percentage}%, #E0E0E0 ${percentage}%)`;
   }

   add(){
    this._CartService.addToCart(this.id!).subscribe({
      next:(res:any)=>{
        console.log(res);
        this._CartService.numberCartItems.next(res.numOfCartItems)
        console.log(cartItems);
        this._ToastrService.success(res.message)
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error(err.message)
      }
    })
   }
 

}
