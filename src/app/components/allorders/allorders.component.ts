import { Component, inject } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { AuthServiceService } from '../../core/services/auth/auth-service.service';
import { IOrder } from '../../core/interfaces/iorder';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {

  private readonly _PaymentService = inject(PaymentService)
  private readonly _AuthServiceService = inject(AuthServiceService)
  userOrders:IOrder[] = []

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const uid = this._AuthServiceService.deJWT()
    console.log((uid as any)['id']);
    console.log((uid as any)['name']);
    this._PaymentService.getUserOrders((uid as any)['id']).subscribe({
      next:(res:any)=>{
        this.userOrders = res;
        this.userOrders.reverse()
        console.log(this.userOrders,"allorders");
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }





}
