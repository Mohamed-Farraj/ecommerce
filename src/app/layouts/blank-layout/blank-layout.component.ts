import { Component } from '@angular/core';
import { BlankNavComponent } from "../../components/blank-nav/blank-nav.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [BlankNavComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

}
