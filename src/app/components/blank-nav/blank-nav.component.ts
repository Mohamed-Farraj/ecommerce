import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-blank-nav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './blank-nav.component.html',
  styleUrl: './blank-nav.component.scss'
})
export class BlankNavComponent implements OnInit {

  constructor(private _FlowbiteService:FlowbiteService) { }

  ngOnInit(): void {
      this._FlowbiteService.loadFlowbite(()=>{})
  }

  private readonly _Router= inject(Router)

  logout()
  {
    sessionStorage.removeItem("token")
    this._Router.navigate(['/login'])
  }

}
