import { Type, TemplateRef } from '@angular/core';


export type YueUiModalContent<C = any> = Type<C> | TemplateRef<C> | string;

export type YueUiModalHeader<C = any> = Type<C> | TemplateRef<C> | string;

export type YueUiModalFooter<C = any> = Type<C> | TemplateRef<C> | string;

export type YueUiModalTypes = 'default' | 'confirm';

export type YueUiConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning';
