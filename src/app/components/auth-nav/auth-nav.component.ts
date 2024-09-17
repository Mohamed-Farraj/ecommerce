import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent implements OnInit {

  private readonly _FlowbiteService = inject(FlowbiteService);


ngOnInit(): void {
    
}

ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  this._FlowbiteService.loadFlowbite(()=>{})
}



}
