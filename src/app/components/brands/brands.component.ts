import { Component, inject } from '@angular/core';
import { ICategories } from '../../core/interfaces/icategoris';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  private readonly _CategoriesService= inject(CategoriesService)
  brands:any = []


  

  ngOnInit(): void {
   
    this._CategoriesService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res);
        console.log(res.data);
        this.brands = res.data
      },
      error:(err)=>{
        console.log(err);
      }
    })  
  }

}
