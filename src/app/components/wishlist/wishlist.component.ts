import { Component } from '@angular/core';
import { HcardComponent } from "../hcard/hcard.component";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [HcardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

}
