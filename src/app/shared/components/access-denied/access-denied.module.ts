import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { AccessDeniedComponent } from './access-denied.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AccessDeniedComponent }
    ])
  ]
})
export class AccessDeniedModule { }
