import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import {
  Formulary,
  Modifiers
} from './../fix-ralacional';


@Component({
  template: `Wrapper`,
  styleUrls: ['./../styles/wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.wrapper]': 'true'
  }
})
export class WrapperComponent implements OnInit, AfterViewInit, OnDestroy {

  public formulary!: Formulary;

  public struct!: Modifiers.GeneratedFieldMetadata;
  
  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    console.log(this);
  }

  public ngOnDestroy(): void {
  }
  
}
