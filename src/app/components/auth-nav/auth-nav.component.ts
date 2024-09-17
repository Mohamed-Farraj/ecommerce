import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent implements OnInit {

  private readonly _FlowbiteService = inject(FlowbiteService);
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
    this._FlowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }



}
