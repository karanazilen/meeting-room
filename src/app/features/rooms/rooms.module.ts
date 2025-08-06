import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoomsComponent } from './rooms.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoomsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: RoomsComponent }
    ])
  ]
})
export class RoomsModule { }
