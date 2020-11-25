import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { YueUiCardMetadata } from '../utils/types';

import { YueUiCardContentComponent } from './content.component';
import { YueUiCardCoverComponent } from './cover.component';
import { YueUiCardFooterComponent } from './footer.component';
import { YueUiCardHeaderComponent } from './header.component';
import { YueUiCardMetadataComponent } from './metadata.component';
import { YueUiCardActionsComponent } from './actions.component';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-card',
  template: `
    <div class="yue-ui-card-wrapper">

      <ng-container *ngIf="header || headerComponent">
        <div class="yue-ui-card-wrapper-header">
          <ng-container *ngIf="headerComponent; else noHeaderComponent">
            <ng-content select="yue-ui-card-header"></ng-content>
          </ng-container>
          <ng-template #noHeaderComponent>
            <yue-ui-card-header>
              <yue-ui-smart-render [yueUiSmartRender]="header"></yue-ui-smart-render>
            </yue-ui-card-header>
          </ng-template>
        </div>
      </ng-container>

      <ng-container *ngIf="cover || coverComponent">
        <div class="yue-ui-card-wrapper-cover">
          <ng-container *ngIf="coverComponent; else noCoverComponent">
            <ng-content select="yue-ui-card-cover"></ng-content>
          </ng-container>
          <ng-template #noCoverComponent>
            <yue-ui-card-cover>
              <yue-ui-smart-render [yueUiSmartRender]="cover"></yue-ui-smart-render>
            </yue-ui-card-cover>
          </ng-template>
        </div>
      </ng-container>

      <ng-container *ngIf="content || contentComponent">
        <div class="yue-ui-card-wrapper-content">
          <ng-container *ngIf="contentComponent; else noContentComponent">
            <ng-content select="yue-ui-card-content"></ng-content>
          </ng-container>
          <ng-template #noContentComponent>
            <yue-ui-card-content>
              <yue-ui-smart-render [yueUiSmartRender]="content"></yue-ui-smart-render>
            </yue-ui-card-content>
          </ng-template>
        </div>
      </ng-container>

      <ng-container *ngIf="metadata || metadataComponent">
        <div class="yue-ui-card-wrapper-metadata">
          <ng-container *ngIf="metadataComponent; else noMetadataComponent">
            <ng-content select="yue-ui-card-metadata"></ng-content>
          </ng-container>
          <ng-template #noMetadataComponent>
            <yue-ui-card-metadata
              [yueUiCardMetadataAvatar]="$any(metadata).avatar"
              [yueUiCardMetadataTitle]="$any(metadata).title"
              [yueUiCardMetadataDescription]="$any(metadata).description"
            ></yue-ui-card-metadata>
          </ng-template>
        </div>
      </ng-container>

      <ng-container *ngIf="footer || footerComponent">
        <div class="yue-ui-card-wrapper-footer">
          <ng-container *ngIf="footerComponent; else noFooterComponent">
            <ng-content select="yue-ui-card-footer"></ng-content>
          </ng-container>
          <ng-template #noFooterComponent>
            <yue-ui-card-footer>
              <yue-ui-smart-render [yueUiSmartRender]="footer"></yue-ui-smart-render>
            </yue-ui-card-footer>
          </ng-template>
        </div>
      </ng-container>

      <ng-container *ngIf="(actions && $any(actions).length) || actionsComponent">
        <div class="yue-ui-card-wrapper-actions">
          <ng-container *ngIf="actionsComponent; else noActionsComponent">
            <ng-content select="yue-ui-card-actions"></ng-content>
          </ng-container>
          <ng-template #noActionsComponent>
            <yue-ui-card-actions>
              <yue-ui-card-action *ngFor="let action of actions">
                <yue-ui-smart-render [yueUiSmartRender]="action"></yue-ui-smart-render>
              </yue-ui-card-action>
            </yue-ui-card-actions>
          </ng-template>
        </div>
      </ng-container>
    </div>
  `,
  host: {
    '[class.yue-ui-card]': `true`,
    '[class.yue-ui-card--header]': `header || headerComponent`,
    '[class.yue-ui-card--content]': `content || contentComponent`,
    '[class.yue-ui-card--footer]': `footer || footerComponent`,
    '[class.yue-ui-card--cover]': `cover || coverComponent`,
    '[class.yue-ui-card--metadata]': `metadata || metadataComponent`,
    '[class.yue-ui-card--shadow-effect]': `shadowEffect`,
    '[class.yue-ui-card--actions]': `(actions || $any(actions).length) || actionsComponent`,
  },
  preserveWhitespaces: false,
  exportAs: 'yueUiCardRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCardComponent {

  @ContentChild(YueUiCardHeaderComponent, { static: true })
  public headerComponent!: YueUiCardHeaderComponent;

  @ContentChild(YueUiCardContentComponent, { static: true })
  public contentComponent!: YueUiCardContentComponent;

  @ContentChild(YueUiCardFooterComponent, { static: true })
  public footerComponent!: YueUiCardFooterComponent;

  @ContentChild(YueUiCardCoverComponent, { static: true })
  public coverComponent!: YueUiCardCoverComponent;

  @ContentChild(YueUiCardMetadataComponent, { static: true })
  public metadataComponent!: YueUiCardMetadataComponent;

  @ContentChild(YueUiCardActionsComponent, { static: true })
  public actionsComponent!: YueUiCardActionsComponent;







  @Input(`yueUiCardHeader`)
  public header!: YueUiSmartRenderType;

  @Input(`yueUiCardContent`)
  public content!: YueUiSmartRenderType;

  @Input(`yueUiCardFooter`)
  public footer!: YueUiSmartRenderType;

  @Input(`yueUiCardCover`)
  public cover!: YueUiSmartRenderType;

  @Input(`yueUiCardActions`)
  public actions: YueUiSmartRenderType[] = [];

  @Input(`yueUiCardMetadata`)
  public metadata!: YueUiCardMetadata;

  @Input(`yueUiCardShadowEffect`)
  public shadowEffect = true;

}
