import { Component, OnInit, Input, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { hash } from './../../../../../commons/hash';
import { InputSelectInternOption } from '../interfaces';


export type CallBackRegister = (option: YueInputSelectOptionComponent) => void;


const AddSelectedGetter = (option: InputSelectInternOption, value: boolean = false) => {
  Object.defineProperties(option, {
    selected: {
      value,
      enumerable: false,
      writable: false
    }
  });
  return option as unknown as InputSelectInternOption;
};

@Component({
  selector: 'yue-input-select-option',
  template: `
    <div class="option-wrapper" [class.selected]="selectedHighLight">
      <span [innerText]="labelProped"></span>
    </div>
  `,
  styleUrls: ['./input-select-option.component.scss']
})
export class YueInputSelectOptionComponent implements OnInit {

  @Input() public value!: InputSelectInternOption;

  @Input() public propLabel: string | false = 'label';

  @Input() public propValue: string | false = 'value';

  @Input() public template: TemplateRef<any> | null = null;

  private registredCb!: CallBackRegister;

  public get selected(): boolean {
    if (this.value) {
      return this.value.selected;
    }
    return false;
  }

  public set selected(v: boolean) {
    if (this.value) {
      this.value = AddSelectedGetter(this.value, v);
    }
  }

  public get selectedHighLight(): boolean {
    if (this.value) {
      return this.value.selected;
    }
    return false;
  }

  public id: string = hash();

  public get labelProped(): any {
    if (this.value) {
      return this.value.labelProped;
    }
    return null;
  }

  public get valueProped(): any {
    if (this.value) {
      return this.value.valueProped;
    }
    return null;
  }

  constructor(public readonly changeDetectorRef: ChangeDetectorRef) { }

  private optionSelected(): void {
    if (`function` === typeof this.registredCb) {
      this.registredCb(this);
    }
    this.changeDetectorRef.markForCheck();
  }

  @HostListener('click')
  public selfClick() {
    this.optionSelected();
  }

  public regiterOnSelectOption(cb: CallBackRegister): void {
    this.registredCb = cb;
  }

  public select(): void {
    this.value = AddSelectedGetter(this.value, true);
    this.changeDetectorRef.markForCheck();
  }

  public unselect(): void {
    this.value = AddSelectedGetter(this.value, !true);
    this.changeDetectorRef.markForCheck();
  }

  public ngOnInit(): void { }

}
