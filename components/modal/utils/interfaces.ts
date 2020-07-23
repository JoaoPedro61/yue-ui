import { Type, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';


export type YueUiModalContent<C = any> = Type<C> | TemplateRef<C> | string | Observable<string>;

export type YueUiModalHeader<C = any> = Type<C> | TemplateRef<C> | string | Observable<string>;

export type YueUiModalFooter<C = any> = Type<C> | TemplateRef<C> | string | Observable<string>;

export type YueUiModalButtonContent<C = any> = Type<C> | TemplateRef<C> | string | Observable<string>;

export type YueUiModalTypes = 'default' | 'confirm';

export type YueUiModalConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning';
