import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  Input,
  HostListener,
  HostBinding
} from '@angular/core';

import { YueUiSelectOptionComponent } from './select-option.component';



@Component({
  selector: 'yue-ui-select-option-renderer',
  template: `
    <yue-ui-smart-render
      [yueUiSmartRender]="label"
      [yueUiSmartRenderContext]="value"
    >
    </yue-ui-smart-render>
  `,
  styleUrls: [
    './../styles/select-option-renderer.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YueUiSelectOptionRendererComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public yueUiSelectOptionRendererOption!: YueUiSelectOptionComponent;

  public get label(): any {
    return this.yueUiSelectOptionRendererOption.label;
  }

  public get value(): any {
    return this.yueUiSelectOptionRendererOption.value;
  }

  constructor(public readonly cdr: ChangeDetectorRef) { }

  @HostBinding('class.is-selected')
  public get isSelected(): boolean {
    return this.yueUiSelectOptionRendererOption.isSelected();
  }

  @HostListener(`click`)
  public onClick(): void {
    this.yueUiSelectOptionRendererOption.selectThis();
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void { }

  public ngOnDestroy(): void { }

}
