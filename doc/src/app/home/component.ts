import { Component as NgComponent, ChangeDetectionStrategy } from '@angular/core';
import { Formulary, linearFormulary, formularyIdentifier, formularyFields, writable, fieldIdentifier, fieldLabel, fieldPlaceholder, fieldValidators, fieldDescription, fieldTemplate } from '@JoaoPedro61/yue-ui/formulary/builder';

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
          <a yueUiButton>
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
      <div style="display: flex;">
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
    formularyFields(
      ...new Array(5)
      .fill(null)
      .map((_, i) => {
        return writable([
          fieldIdentifier(`info.name_${i}`),
          fieldLabel(`Label`),
          fieldPlaceholder(`Type your name`),
          fieldValidators([`required`]),
          fieldDescription(`Simple field description`),
          fieldTemplate(`Simple template`)
        ]);
      })
    )
  ]);

  constructor(private readonly modal: YueUiModalService) {
    this.form.setup(this.formProvider);

    this.modal.success({
      header: `Keep calme`,
      content: `Are you sure?? Do you want continue?`,
    });

  }

}
