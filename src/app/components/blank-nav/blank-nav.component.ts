import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth/auth-service.service';
import { cartItems, enverionment } from '../../core/environments/environment';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-blank-nav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf],
  templateUrl: './blank-nav.component.html',
  styleUrl: './blank-nav.component.scss'
})
export class BlankNavComponent implements OnInit {
  private readonly _AuthServiceService = inject(AuthServiceService)
  private readonly _FlowbiteService = inject(FlowbiteService);
  private readonly _Router= inject(Router)
  cartItemscounter!:number ;
  isMenuOpen: boolean = true;
  isMobile: boolean = window.innerWidth < 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 768;
    if (!this.isMobile) {
      this.isMenuOpen = true;
    }
    else{
      this.isMenuOpen = false;
    }
  }
  ngOnInit(): void {
    if (!this.isMobile) {
      this.isMenuOpen = true;
    }
    else{
      this.isMenuOpen = false;
    }
      
      this.cartItemscounter = cartItems;
      console.log("hello from blank nav",cartItems,this.cartItemscounter);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this._FlowbiteService.loadFlowbite(()=>{})
  }

  // ngAfterViewChecked(): void {
  //   //Called after every check of the component's view. Applies to components only.
  //   //Add 'implements AfterViewChecked' to the class.
  //   this.cartItemscounter = cartItems;
  //   console.log("hello from blank nav",cartItems,this.cartItemscounter);
  // }


  logout()
  {
    this._AuthServiceService.logout()
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

 
}
