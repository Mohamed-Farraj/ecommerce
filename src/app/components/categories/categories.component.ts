import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategoris';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  private readonly _CategoriesService= inject(CategoriesService)
  categories:ICategories[] = []

  ngOnInit(): void {
   
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
        console.log(res.data);
        this.categories = res.data
      },
      error:(err)=>{
        console.log(err);
      }
    })  
  }

}
