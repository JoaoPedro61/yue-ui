import { EventEmitter } from '@angular/core';
import { YueUiButtonType, YueUiButtonSize } from '@JoaoPedro61/yue-ui/button';

import { YueUiModalContent, YueUiModalTypes, YueUiModalFooter, YueUiModalHeader, YueUiModalButtonContent, YueUiModalConfirmType } from './interfaces';



export class YueUiModalOptions<C> {

  public header?: YueUiModalHeader<any>;

  public content?: YueUiModalContent<C>;

  public footer?: YueUiModalFooter<any>;

  public backdropClass?: string = ``;

  public type?: YueUiModalTypes = `default`;

  public componentParams?: Partial<C> = {};

  public showMask?: boolean = true;

  public maskClosable?: boolean = true;

  public keyboard?: boolean = true;

  public disposeOnNavigation?: boolean = true;

  public closable?: boolean = true;

  public width?: number | string = 450;

  public height?: number | string = `auto`;

  public padding?: {
    header: string | number;
    body: string | number;
    footer: string | number;
  } = {
    header: `10px`,
    body: `10px`,
    footer: `10px`,
  };

  public autofocus?: string = `cancel`;

  public confirmType?: YueUiModalConfirmType = `confirm`;


  public okButtonText?: YueUiModalButtonContent = `OK`;

  public okButtonType?: YueUiButtonType = `primary`;

  public okButtonSize?: YueUiButtonSize = `default`;

  public okButtonLoading?: boolean = false;

  public okButtonDisabled?: boolean = false;

  public onButtonOk?: EventEmitter<any> | ((content: C) => any) = () => void 0;


  public cancelButtonText?: YueUiModalButtonContent = `Cancel`;

  public cancelButtonType?: YueUiButtonType = `default`;

  public cancelButtonSize?: YueUiButtonSize = `default`;

  public cancelButtonLoading?: boolean = false;

  public cancelButtonDisabled?: boolean = false;

  public onButtonCancel?: EventEmitter<any> | ((content: C) => any) = () => void 0;

}
