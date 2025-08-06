import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PermissionService } from '../../core/services/permission.service';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: '[appHasRole]',
  standalone: false
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input() appHasRole!: string | string[];
  
  private destroy$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateView();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateView(): void {
    this.viewContainer.clear();
    
    if (this.hasRequiredRole()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private hasRequiredRole(): boolean {
    if (!this.appHasRole) return false;

    const user = this.authService.getCurrentUser();
    if (!user) return false;

    const roles = Array.isArray(this.appHasRole) ? this.appHasRole : [this.appHasRole];
    
    return roles.some(role => user.role === role);
  }
}
