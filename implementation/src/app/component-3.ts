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
  fieldMask,
  enumerable,
  fieldListeners,
  fieldEnable,
} from '@joaopedro61/yue-ui/formulary/builder';




@NgComponent({
  template: `
    <yue-ui-formulary [yueUiFormularySource]="formulary"></yue-ui-formulary>
    <button *ngIf="formulary" (click)="formulary.staircase().previews()" [disabled]="!formulary.staircase().isValidToPreviews()">
      Previus
    </button>
    <button *ngIf="formulary" (click)="formulary.staircase().next()" [disabled]="!formulary.staircase().isValidToNext()">
      Next
    </button>
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
      .shouldUseGridSystem(false)
      .shouldHideDescriptors(true)
      .shouldHideLabels(true)
      .shouldHideStepLabels(true)
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
              fieldValidators([`required`]),
              fieldMask(`macaddress`),
              fieldEnable(false),
            ]),
            writable([
              fieldIdentifier('name_djf3'),
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
              fieldOptions(() => {
                return [
                  { label: 'Male', value: 'male' },
                  { label: 'Femalé', value: 'female' },
                  { label: 'Tank', value: 'tank' },
                ]
              }),
              fieldListeners({
                search: (_, search, component) => {
                  component.updateOptions([search]);
                },
              })
            ]),
            enumerable([
              fieldIdentifier('name_12312'),
              fieldLabel('Age'),
              fieldPlaceholder('Type your age'),
              fieldWidth(24),
              fieldValidators(['min:0', 'max:100', 'required'])
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
      ]))
      .setButtonsAlignment(`end`)
      .listen()
      .subscribe({
        next: (e) => {
          if (e.type === `clickedAtFooterButton`) {
            console.log(`Cliked At Button: `, e.data);
          } else if (e.type === `modelChanged`) {
            console.log(`Model Changed: `, e.data);
          }
        }
      });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.formulary.updateField(`name`, [
        fieldEnable(true),
      ]);
    }, 1000);
  }

  public ngOnDestroy(): void {
    this.formulary
      .destroy();
  }

}
