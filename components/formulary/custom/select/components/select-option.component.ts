import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  Optional,
  Host,
  OnDestroy,
  Input
} from '@angular/core';

import { YueUiSmartRenderType } from '@JoaoPedro61/yue-ui/smart-render';

import { YueUiSelectComponent } from './select.component';
import { YueUiSelectProperties } from './../utils/interfaces';




@Component({
  selector: 'yue-ui-select-option',
  template: ``,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiSelectOptionRef',
  host: {
    '[class.yue-ui-select-option]': 'true',
  }
})
export class YueUiSelectOptionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public yueUiSelectOptionValue!: any;

  @Input()
  public yueUiSelectOptionLabel?: YueUiSmartRenderType<any>;

  @Input()
  public yueUiSelectOptionPropertyLabel?: YueUiSelectProperties['label'];

  @Input()
  public yueUiSelectOptionPropertyValue?: YueUiSelectProperties['label'];

  public get value(): any {
    if (this.host) {
      if (typeof this.yueUiSelectOptionPropertyValue !== 'undefined') {
        if (!this.yueUiSelectOptionPropertyValue) {
          return this.yueUiSelectOptionValue;
        } else {
          if (this.yueUiSelectOptionValue && typeof this.yueUiSelectOptionValue === 'object') {
            return (this.yueUiSelectOptionValue as any)[(this.yueUiSelectOptionPropertyValue as any)] as any;
          }
          return this.yueUiSelectOptionValue;
        }
      } else {
        if (!this.host.yueUiSelectPropertyValue) {
          return this.yueUiSelectOptionValue;
        } else {
          if (this.yueUiSelectOptionValue && typeof this.yueUiSelectOptionValue === 'object') {
            return (this.yueUiSelectOptionValue as any)[(this.host.yueUiSelectPropertyValue as any)] as any;
          }
          return this.yueUiSelectOptionValue;
        }
      }
    }
    return this.yueUiSelectOptionValue;
  }

  public get label(): YueUiSmartRenderType<any> {
    if (this.host) {
      if (typeof this.yueUiSelectOptionPropertyLabel !== 'undefined') {
        if (this.yueUiSelectOptionLabel && typeof this.yueUiSelectOptionLabel === 'object') {
          if (!this.yueUiSelectOptionPropertyLabel) {
            return this.yueUiSelectOptionLabel;
          } else {
            if (this.yueUiSelectOptionLabel && typeof this.yueUiSelectOptionLabel === 'object') {
              return (this.yueUiSelectOptionLabel as any)[(this.yueUiSelectOptionPropertyLabel as any)] as any;
            }
            return this.yueUiSelectOptionValue;
          }
        } else {
          if (!this.yueUiSelectOptionPropertyLabel) {
            return this.yueUiSelectOptionValue;
          } else {
            if (this.yueUiSelectOptionValue && typeof this.yueUiSelectOptionValue === 'object') {
              return (this.yueUiSelectOptionValue as any)[(this.yueUiSelectOptionPropertyLabel as any)] as any;
            }
            return this.yueUiSelectOptionValue;
          }
        }
      } else {
        if (this.yueUiSelectOptionLabel && typeof this.yueUiSelectOptionLabel === 'object') {
          if (!this.host.yueUiSelectPropertyLabel) {
            return this.yueUiSelectOptionLabel;
          } else {
            if (this.yueUiSelectOptionLabel && typeof this.yueUiSelectOptionLabel === 'object') {
              return (this.yueUiSelectOptionLabel as any)[(this.host.yueUiSelectPropertyLabel as any)] as any;
            }
            return this.yueUiSelectOptionLabel;
          }
        } else {
          if (!Array.isArray(this.yueUiSelectOptionLabel) && !(typeof this.yueUiSelectOptionLabel === `object`)) {
            return this.yueUiSelectOptionLabel;
          } else if (!this.host.yueUiSelectPropertyLabel) {
            return this.yueUiSelectOptionValue;
          } else {
            if (this.yueUiSelectOptionValue && typeof this.yueUiSelectOptionValue === 'object') {
              return (this.yueUiSelectOptionValue as any)[(this.host.yueUiSelectPropertyLabel as any)] as any;
            }
            return this.yueUiSelectOptionValue;
          }
        }
      }
    }
    return this.yueUiSelectOptionValue;
  }

  public get isActivated(): boolean {
    if (this.host) {
      return this.host.optionIsActivated(this.value);
    }
    return false;
  }

  constructor(public readonly cdr: ChangeDetectorRef, @Optional() @Host() private readonly host?: YueUiSelectComponent) { }

  public selectThis(): void {
    if (this.host) {
     this.host.selectOption(this.value, this);
    }
  }

  public isSelected(): boolean {
    if (this.host) {
      return this.host.valueIsSelected(this.value);
    }
    return false;
  }

  public ngOnInit(): void {
    if (this.host) {
      this.host.addOption(this);
    }
  }

  public ngAfterViewInit(): void { }

  public ngOnDestroy(): void {
    if (this.host) {
      this.host.removeOption(this);
    }
  }

}
