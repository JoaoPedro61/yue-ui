import { InjectionToken } from '@angular/core';
import { YueUiI18nDictionary, YueUiI18nComponentsDictionary, YueUiI18nLanguage, YueUiI18nDefaultLanguage, YueUiI18nNotFoundHandler } from './i18n.intefaces';
import { BehaviorSubject } from 'rxjs';



export const YUE_UI_I18N_DICTIONARY: InjectionToken<YueUiI18nDictionary> = new InjectionToken('YUE_UI_I18N_DICTIONARY');

export const YUE_UI_I18N_COMPONENTS_DICTIONARY: InjectionToken<YueUiI18nComponentsDictionary> = new InjectionToken('YUE_UI_I18N_COMPONENTS_DICTIONARY');

export const YUE_UI_I18N_LANGUAGE: InjectionToken<YueUiI18nLanguage> = new InjectionToken('YUE_UI_I18N_LANGUAGE');

export const YUE_UI_I18N_DEFAULT_LANGUAGE: InjectionToken<YueUiI18nDefaultLanguage> = new InjectionToken('YUE_UI_I18N_LANGUAGE');

export const YUE_UI_I18N_NOT_FOUND_HANDLER: InjectionToken<YueUiI18nNotFoundHandler> = new InjectionToken('YUE_UI_I18N_NOT_FOUND_HANDLER');

export const YUE_UI_I18N_COMPONENTS_DICTIONARY_BEHAVIOR = new BehaviorSubject({ });

export const YUE_UI_I18N_LANGUAGE_BEHAVIOR = new BehaviorSubject(null);

export const YUE_UI_I18N_DICTIONARY_BEHAVIOR = new BehaviorSubject(null);
