import { Component, ChangeDetectionStrategy, ViewEncapsulation, ContentChild, SimpleChange } from '@angular/core';
import { YueUiMenuComponent } from '@joaopedro61/yue-ui/menu';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-navigation-menu-sider`,
  template: `
    <ng-content></ng-content>
  `,
  exportAs: 'yueUiNavigationMenuSiderRef',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiNavigationMenuSiderComponent {

  @ContentChild(YueUiMenuComponent, { static: false })
  private readonly menuRef!: YueUiMenuComponent;

  public updateMenuScheme(isMobile: boolean = false): void {
    console.log(this.menuRef);
    if (this.menuRef) {
      if (this.menuRef.actualMode !== 'inline') {
        (this.menuRef as any).___oldMode = this.menuRef.actualMode;
      }
      this.menuRef.yueUiMenuMode = isMobile ? 'inline' : (this.menuRef as any).___oldMode || 'inline';
      const yueUiMenuMode = new SimpleChange((this.menuRef as any).___oldMode, 'inline', false);
      this.menuRef.ngOnChanges({ yueUiMenuMode });
    }
  }

}
