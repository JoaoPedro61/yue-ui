import { Component as NgComponent, ChangeDetectionStrategy, OnDestroy } from '@angular/core';


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
  fieldTextMode,
  button,
  buttonIdentifier,
  buttonLabel,
} from '@joaopedro61/yue-ui/formulary/builder';


@NgComponent({
  template: `
    <yue-ui-formulary [yueUiFormularySource]="formulary"></yue-ui-formulary>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component3 implements OnDestroy {

  public formulary: FormularySource = new FormularySource<any>();

  constructor() {
    this.setup();
  }

  private setup(): void {
    this.formulary
      .setModel({
        name: `nasdfasdlfull`,
        gender: `tank`,
      })
      .insertButtons([
        button([
          buttonIdentifier(`cancel`),
          buttonLabel(`Cancel`),
        ])
      ])
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
              fieldWidth(12),
              fieldValidators([`required`])
            ]),
            selectable([
              fieldIdentifier('gender'),
              fieldLabel('Gender'),
              fieldPlaceholder('Select yout gender'),
              fieldWidth(12),
              fieldOptions(() => [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ])
            ]),
            writable([
              fieldIdentifier('name_te'),
              fieldLabel('Name'),
              fieldPlaceholder('Type your name'),
              fieldWidth(24),
              fieldValidators([`required`]),
              fieldTextMode(`textarea`),
            ]),
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
              fieldWidth(24)
            ]),
            selectable([
              fieldIdentifier('gender_!'),
              fieldLabel('Gender'),
              fieldPlaceholder('Select yout gender'),
              fieldWidth(24),
              fieldOptions(() => [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ])
            ])
          ])
        ])
      ]));
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.formulary.updateButton(`cancel`, [
        buttonLabel(`Changed label`),
      ]);
    },
    3000)
  }

  public ngOnDestroy(): void {
    this.formulary
      .destroy();
  }
  
}
