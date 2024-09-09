import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth/auth-service.service';

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

  ngOnInit(): void {
      this._FlowbiteService.loadFlowbite(()=>{})
  }

  private readonly _Router= inject(Router)

  logout()
  {
    this._AuthServiceService.logout()
  }
 
}
