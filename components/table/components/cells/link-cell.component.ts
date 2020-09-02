import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from "@angular/core";
import { TableCellComponentAbstraction } from './abstract';



@Component({
  selector: `yue-ui-table-link-cell`,
  template: `
    <a [routerLink]="link">
      <span [innerText]="$any(value)"></span>
    </a>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: `yueUiTableLinkCellRef`,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-table-link-cell]': `true`,
  },
})
export class YueUiTableLinkCellComponent extends TableCellComponentAbstraction implements OnInit {

  constructor(public readonly cdr: ChangeDetectorRef) {
    super();
  }

  public get link(): string[] {
    if (this.header.additionalParameters) {
      if (this.header.additionalParameters.link) {
        const link: string = Array.isArray(this.header.additionalParameters.link)
          ? this.header.additionalParameters.link.join(`/`)
          : this.header.additionalParameters.link;
        
        const replaced: string = link.replace(/:\w+/gm, (substring: string) => {
          if (substring) {
            const sub: string = substring.substr(1);
            if (sub in this.full) {
              return this.full[sub];
            }
          }
          return substring;
        });
        return replaced.split('/');
      }
    }
    return ['.'];
  }

  public ngOnInit(): void { }

}
