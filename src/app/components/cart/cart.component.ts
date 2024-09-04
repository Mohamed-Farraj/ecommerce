import { Component } from '@angular/core';
import { HcardComponent } from "../hcard/hcard.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HcardComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

}
