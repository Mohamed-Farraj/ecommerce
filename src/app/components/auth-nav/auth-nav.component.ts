import { Component, OnInit } from '@angular/core';
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

  constructor(private _FlowbiteService:FlowbiteService) { }

ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(()=>{})
}



}
