import { EventEmitter } from '@angular/core';
import { YueUiModalContent, YueUiModalTypes, YueUiModalFooter, YueUiModalHeader } from './interfaces';



export class YueUiModalOptions<C> {

  public header?: YueUiModalHeader<any>;

  public content?: YueUiModalContent<C>;

  public footer?: YueUiModalFooter<any>;

  public backdropClass?: string = ``;

  public type?: YueUiModalTypes = `default`;

  public componentParams?: Partial<C> = {};

  public onOk?: EventEmitter<any> | ((content: C) => any) = () => void 0;

  public onCancel?: EventEmitter<any> | ((content: C) => any) = () => void 0;

  public showMask?: boolean = true;

  public maskClosable?: boolean = true;

  public keyboard?: boolean = true;

  public disposeOnNavigation?: boolean = true;

  public closable?: boolean = true;

}
