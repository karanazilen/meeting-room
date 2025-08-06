import { Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  template: `
    <div class="access-denied-container">
      <mat-card>
        <mat-card-content>
          <mat-icon color="warn" style="font-size: 64px;">block</mat-icon>
          <h1>Access Denied</h1>
          <p>You don't have permission to access this resource.</p>
          <button mat-raised-button color="primary" routerLink="/dashboard">
            Go to Dashboard
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .access-denied-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 64px);
      padding: 24px;
    }
    mat-card {
      text-align: center;
      max-width: 400px;
    }
    mat-card-content {
      padding: 48px 32px;
    }
    h1 {
      margin: 16px 0;
      color: #333;
    }
    p {
      margin: 16px 0 32px 0;
      color: #666;
    }
  `],
  standalone: false
})
export class AccessDeniedComponent { }
