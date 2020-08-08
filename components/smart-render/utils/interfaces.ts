import { Observable } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';

export type YueUiSmartRenderType<Context = any> = string
 | Observable<string>
 | TemplateRef<Context>
 | Type<Context>
 | null
 | undefined;

export type YueUiSmartRenderComponentType<Context = any> = TemplateRef<Context> | Type<Context>;

export type YueUiStringTemplateRefRenderType<Context = any> = string
 | Type<Context>
 | TemplateRef<Context>
 | null
 | undefined;
