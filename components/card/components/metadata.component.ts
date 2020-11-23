import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { YueUiSmartRenderType } from "@joaopedro61/yue-ui/smart-render";



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-card-metadata',
  template: `
    <div class="yue-ui-card-metadata-wrapper">
      <ng-container *ngIf="avatar">
        <div class="yue-ui-card-metadata-wrapper-avatar">
          <yue-ui-smart-render [yueUiSmartRender]="avatar"></yue-ui-smart-render>
        </div>
      </ng-container>
      <div class="yue-ui-card-metadata-wrapper-content">
        <ng-container *ngIf="title">
          <div class="yue-ui-card-metadata-wrapper-content-title">
            <yue-ui-smart-render [yueUiSmartRender]="title"></yue-ui-smart-render>
          </div>
        </ng-container>
        <ng-container *ngIf="description">
          <div class="yue-ui-card-metadata-wrapper-content-description">
            <yue-ui-smart-render [yueUiSmartRender]="description"></yue-ui-smart-render>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  host: {
    '[class.yue-ui-card-metadata]': `true`
  },
  preserveWhitespaces: false,
  exportAs: 'yueUiCardMetadataRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCardMetadataComponent {

  @Input('yueUiCardMetadataTitle')
  public title!: YueUiSmartRenderType;

  @Input('yueUiCardMetadataDescription')
  public description!: YueUiSmartRenderType;

  @Input('yueUiCardMetadataAvatar')
  public avatar!: YueUiSmartRenderType;

}
