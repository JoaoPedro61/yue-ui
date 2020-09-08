import { Component as NgComponent, ChangeDetectionStrategy } from '@angular/core';


import {
  FormularySource,
  writable,
  fieldIdentifier,
  fieldLabel,
  fieldPlaceholder,
  fieldWidth,
  selectable,
  formularyFields,
  fieldOptions,
  formularyIdentifier,
  staircaseFormulary,
  formularyStep,
  formularyStepName,
  fieldValidators,
  fieldMask,
  fieldTextMode,
} from '@joaopedro61/yue-ui/formulary/builder';


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
        name: null,
        gender: `tank`,
      })
      .setup(staircaseFormulary([
        formularyIdentifier(`steps`),
        formularyStep([
          formularyIdentifier(`step_1`),
          formularyStepName(`General`),
          formularyFields([
            writable([
              fieldIdentifier('name'),
              fieldLabel('Name'),
              fieldPlaceholder('Type your name'),
              fieldWidth(10),
              fieldValidators([`required`]),
              fieldMask(`ipaddress`)
            ]),
            writable([
              fieldIdentifier('name_te'),
              fieldLabel('Name'),
              fieldPlaceholder('Type your name'),
              fieldWidth(10),
              fieldValidators([`required`]),
              fieldTextMode(`textarea`),
            ]),
            /*
            writable([
              fieldIdentifier('pass'),
              fieldLabel('Password'),
              fieldPlaceholder('Type your password'),
              fieldWidth(10),
              fieldTextMode(`password`),
              fieldValidators([`required`]),
              fieldDescription(`This is a simple descriptionm!`)
            ]),
            */
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
        ]),
        formularyStep([
          formularyIdentifier(`step_2`),
          formularyStepName(`Net`),
          formularyFields([
            writable([
              fieldIdentifier('name_1'),
              fieldLabel('Name'),
              fieldPlaceholder('Type your name'),
              fieldWidth(10)
            ]),
            selectable([
              fieldIdentifier('gender_!'),
              fieldLabel('Gender'),
              fieldPlaceholder('Select yout gender'),
              fieldWidth(10),
              fieldOptions(() => [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ])
            ])
          ])
        ])
      ]));
  }

  public ngAfterViewInit(): void { }

}
