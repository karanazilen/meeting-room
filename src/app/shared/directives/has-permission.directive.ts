import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PermissionService } from '../../core/services/permission.service';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: false
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  @Input() appHasPermission!: string | string[];
  
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
    
    if (this.hasRequiredPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private hasRequiredPermission(): boolean {
    if (!this.appHasPermission) return false;

    const permissions = Array.isArray(this.appHasPermission) ? this.appHasPermission : [this.appHasPermission];
    
    // User needs at least one of the specified permissions
    return permissions.some(permission => this.permissionService.hasPermission(permission));
  }
}
