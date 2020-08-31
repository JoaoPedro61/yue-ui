import { Component as NgComponent, ChangeDetectionStrategy } from '@angular/core';


import {
  FormularySource,
  linearFormulary,
  writable,
  fieldIdentifier,
  fieldLabel,
  fieldPlaceholder,
  fieldWidth,
  selectable,
  formularyFields,
  fieldOptions,
  formularyIdentifier
} from '@JoaoPedro61/yue-ui/formulary/builder';


@NgComponent({
  template: `
    <yue-ui-formulary [yueUiFormularySource]="formulary"></yue-ui-formulary>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component3 {

  public formulary: FormularySource = new FormularySource<any>();

  constructor() {
    this.setup();
  }

  private setup(): void {
    this.formulary
      .setModel({
        name: 'Peter',
        gender: `tank`,
      })
      .setup(linearFormulary([
        formularyIdentifier('inserting_model_register'),
        formularyFields([
          writable([
            fieldIdentifier('name'),
            fieldLabel('Name'),
            fieldPlaceholder('Type your name'),
            fieldWidth(10)
          ]),
          selectable([
            fieldIdentifier('gender'),
            fieldLabel('Gender'),
            fieldPlaceholder('Select yout gender'),
            fieldWidth(10),
            fieldOptions(() => [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ])
          ])
        ])
      ]));

    setTimeout(() => {
      this.formulary.updateField(`gender`, [
        fieldOptions(() => [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Tank', value: 'tank' },
        ])
      ]);
    }, 6000);
  }

  public ngAfterViewInit(): void { }

}
