import { Directive } from "@angular/core";



@Directive({
  selector: `li[yueUiMenuItem], a[yueUiMenuItem]`,
  host: {
    '[class.yue-ui-menu-item]': 'true'
  },
})
export class YueUiMenuItemDirective { }
