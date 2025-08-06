import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UsersComponent }
    ])
  ]
})
export class UsersModule { }
