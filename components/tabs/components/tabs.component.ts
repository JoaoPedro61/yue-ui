import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-tabs`,
  template: ``,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [`yue-ui-tabs`]: `true`
  },
})
export class YueUiTabsComponent {

}
