import { Observable } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';

export type YueUiSmartRenderType = string
 | Observable<string>
 | TemplateRef<any>
 | Type<any>
 | null
 | undefined;

export type YueUiStringTemplateRefRenderType = string
 | Type<any>
 | TemplateRef<any>
 | null
 | undefined;
