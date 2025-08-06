import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BookingComponent } from './booking.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: BookingComponent }
    ])
  ]
})
export class BookingModule { }
