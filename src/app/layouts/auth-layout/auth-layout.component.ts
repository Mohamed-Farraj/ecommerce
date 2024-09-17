import { Component, inject } from '@angular/core';
import { AuthNavComponent } from "../../components/auth-nav/auth-nav.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { FlowbiteService } from '../../core/services/flowbite.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [AuthNavComponent, RouterOutlet, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

  private readonly _FlowbiteService = inject(FlowbiteService)
  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }

}
