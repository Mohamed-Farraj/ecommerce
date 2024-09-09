import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

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

 getGradient(value: number){
  const percentage = (value / 5) * 100; // Convert to percentage based on max 5 stars
    return `linear-gradient(90deg, #FFC107 ${percentage}%, #E0E0E0 ${percentage}%)`;
 }


}
