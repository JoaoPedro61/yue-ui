import { Component as NgComponent, ChangeDetectionStrategy } from '@angular/core';
import {
  Formulary,
  linearFormulary,
  formularyIdentifier,
  formularyFields,
  fieldIdentifier,
  fieldLabel,
  fieldPlaceholder,
  fieldValidators,
  fieldDescription,
  checkable,
  fieldStyles,
  fieldSwitchMode,
  fieldOptions,
  writable,
  enumerable,
  touchable,
  fieldVstype
} from '@JoaoPedro61/yue-ui/formulary/builder';

import { YueUiModalService } from '@JoaoPedro61/yue-ui/modal';



@NgComponent({
  template: `
    <yue-ui-layout>
      <yue-ui-navigation-menu #navref="navMenuRef" [yueUiNavigationMenuOpened]="true">
        <yue-ui-navigation-menu-sider>
          Caralho
          <button yueUiButton>
            Hello
          </button>
          <a yueUiButton yueUiPopover="'kajsghdf'" yueUiPopoverContent="'sdkjfasdgf'">
            Hello
          </a>
          <yue-ui-button>
            Hello
          </yue-ui-button>
        </yue-ui-navigation-menu-sider>
        <yue-ui-navigation-menu-top>
          TOP
        </yue-ui-navigation-menu-top>
        <yue-ui-navigation-menu-bottom>
         BOT
        </yue-ui-navigation-menu-bottom>
      </yue-ui-navigation-menu>
      <div>
        <yue-ui-formulary [formulary]="form"></yue-ui-formulary>
      </div>
    </yue-ui-layout>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component {

  public form: Formulary = new Formulary();

  public formProvider = linearFormulary([
    formularyIdentifier(`dsfsd`),
    formularyFields([
      checkable([
        fieldIdentifier(`info.name_1`),
        fieldLabel(`Label`),
        fieldSwitchMode('indeterminate'),
        fieldPlaceholder(`Type your name`),
        fieldValidators([`required`]),
        fieldDescription(`Simple field description`),
        fieldOptions([
          { label: 'Hello 1', value: '1' },
          { label: 'Hello 2', value: '2' },
          { label: 'Hello 3', value: '3' },
          { label: 'Hello 4', value: '4' },
        ])
      ]),
      writable([
        fieldIdentifier(`info.name_2`),
        fieldLabel(`Type your name`),
        fieldPlaceholder(`Type your name`),
        fieldValidators([`required`]),
        fieldDescription(`Simple field description`),
      ]),
      enumerable([
        fieldIdentifier(`info.name_3`),
        fieldLabel(`Type your name`),
        fieldPlaceholder(`Type your name`),
        fieldValidators([`required`]),
        fieldDescription(`Simple field description`),
      ]),
      touchable([
        fieldIdentifier(`info.name_4`),
        fieldLabel(`Type your name`),
        fieldPlaceholder(`Type your name`),
        fieldDescription(`Simple field description`),
        fieldVstype('primary'),
        fieldStyles({
          textAlign: 'left'
        })
      ]),
    ])
  ]);

  constructor(private readonly modal: YueUiModalService) {
    this.form.setup(this.formProvider);
/* 
    this.modal.success({
      header: `Keep calme`,
      content: `Are you sure?? Do you want continue?`,
    });
 */
  }

}
