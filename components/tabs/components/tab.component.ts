import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-tab`,
  template: ``,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [`yue-ui-tab`]: `true`
  },
})
export class YueUiTabComponent {

}
