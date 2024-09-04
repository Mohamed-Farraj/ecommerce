import { Component, Input, input } from '@angular/core';
import { RequiredValidator } from '@angular/forms';

@Component({
  selector: 'app-hcard',
  standalone: true,
  imports: [],
  templateUrl: './hcard.component.html',
  styleUrl: './hcard.component.scss'
})
export class HcardComponent {

      @Input({required:true}) cardtype:string="";

}
