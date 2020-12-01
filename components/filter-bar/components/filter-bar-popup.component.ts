import { Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, AfterViewInit } from '@angular/core';
import { fieldIdentifier, fieldLabel, fieldPlaceholder, fieldWidth, formularyFields, formularyIdentifier, FormularySource, linearFormulary, writable } from '@joaopedro61/yue-ui/formulary/builder';
import { YueUiModalRef } from '@joaopedro61/yue-ui/modal';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-filter-bar-popup`,
  template: `
    <yue-ui-formulary [yueUiFormularySource]="source"></yue-ui-formulary>
    <ng-template *yueUiModalFooter>
      <div>
        This is a modal footer
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiFilterBarPopupRef',
  host: {
    '[class.yue-ui-filter-bar-popup]': `true`,
  },
})
export class YueUiFilterBarPopupComponent implements AfterViewInit {

  public readonly source: FormularySource = new FormularySource();

  public get insideInTheModal(): boolean {
    return !!this.modalRef;
  }

  constructor(@Optional() private readonly modalRef: YueUiModalRef<YueUiFilterBarPopupComponent>) {
    this.source
      .shouldUseGridSystem(true)
      .shouldUseInitialFocus(true)
      .setup(linearFormulary([
        formularyIdentifier('noop'),
        formularyFields([
          writable([
            fieldLabel('Lastname'),
            fieldPlaceholder('Search by lastname....'),
            fieldIdentifier('lastname'),
            fieldWidth(24),
          ]),
          writable([
            fieldLabel('E-mail'),
            fieldPlaceholder('Search by e-mail....'),
            fieldIdentifier('email'),
            fieldWidth(12),
          ]),
          writable([
            fieldLabel('Address'),
            fieldPlaceholder('Search by address....'),
            fieldIdentifier('address'),
            fieldWidth(12),
          ]),
        ]),
      ]));
  }

  public ngAfterViewInit(): void { }

}
