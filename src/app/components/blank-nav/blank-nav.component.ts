import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth/auth-service.service';
import { cartItems, enverionment } from '../../core/environments/environment';

@Component({
  selector: 'app-blank-nav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './blank-nav.component.html',
  styleUrl: './blank-nav.component.scss'
})
export class BlankNavComponent implements OnInit {
  private readonly _AuthServiceService = inject(AuthServiceService)

  constructor(private _FlowbiteService:FlowbiteService) { }
  cartItemscounter!:number ;
  ngOnInit(): void {
      this._FlowbiteService.loadFlowbite(()=>{})
      this.cartItemscounter = cartItems;
      console.log("hello from blank nav",cartItems,this.cartItemscounter);
  }

  // ngAfterViewChecked(): void {
  //   //Called after every check of the component's view. Applies to components only.
  //   //Add 'implements AfterViewChecked' to the class.
  //   this.cartItemscounter = cartItems;
  //   console.log("hello from blank nav",cartItems,this.cartItemscounter);
  // }

  private readonly _Router= inject(Router)

  logout()
  {
    this._AuthServiceService.logout()
  }
 
}
