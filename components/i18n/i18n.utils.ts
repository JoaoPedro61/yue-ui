import { InjectionToken } from '@angular/core';
import { YueUiI18nDictionary, YueUiI18nComponentsDictionary, YueUiI18nLanguage, YueUiI18nDefaultLanguage, YueUiI18nNotFoundHandler } from './i18n.intefaces';


/**
 * Injection token for sharing the dictionary
 *
 * @usageNotes
 * Import the Inject decorator from angular core
 *
 * ```typescript
 * ...
 *
 *  constructor(Inject(YUE_UI_I18N_DICTIONARY) private readonly dictionary: YueUiI18nDictionary) { }
 *
 * ...
 * ```
 *
 * @export
 * @type {InjectionToken<YueUiI18nDictionary>} InjectionToken<YueUiI18nDictionary>
 */
export const YUE_UI_I18N_DICTIONARY: InjectionToken<YueUiI18nDictionary> = new InjectionToken('YUE_UI_I18N_DICTIONARY');

/**
 * Injection token for sharing the dictionary of components
 *
 * @usageNotes
 * Import the Inject decorator from angular core
 *
 * ```typescript
 * ...
 *
 *  constructor(Inject(YUE_UI_I18N_COMPONENTS_DICTIONARY) private readonly dictionary: YueUiI18nComponentsDictionary) { }
 *
 * ...
 * ```
 *
 * @export
 * @type {InjectionToken<YueUiI18nComponentsDictionary>} InjectionToken<YueUiI18nComponentsDictionary>
 */
export const YUE_UI_I18N_COMPONENTS_DICTIONARY: InjectionToken<YueUiI18nComponentsDictionary> = new InjectionToken('YUE_UI_I18N_COMPONENTS_DICTIONARY');

/**
 * Injection token for sharing the language of the dictionary
 *
 * @usageNotes
 * Import the Inject decorator from angular core
 *
 * ```typescript
 * ...
 *
 *  constructor(Inject(YUE_UI_I18N_LANGUAGE) private readonly currentLanguage: YueUiI18nLanguage) { }
 *
 * ...
 * ```
 *
 * @export
 * @type {InjectionToken<YueUiI18nLanguage>} InjectionToken<YueUiI18nLanguage>
 */
export const YUE_UI_I18N_LANGUAGE: InjectionToken<YueUiI18nLanguage> = new InjectionToken('YUE_UI_I18N_LANGUAGE');

/**
 * Injection token for sharing the default language of the dictionary
 *
 * @usageNotes
 * Import the Inject decorator from angular core
 *
 * ```typescript
 * ...
 *
 *  constructor(Inject(YUE_UI_I18N_DEFAULT_LANGUAGE) private readonly defaultLanguage: YueUiI18nDefaultLanguage) { }
 *
 * ...
 * ```
 *
 * @export
 * @type {InjectionToken<YueUiI18nDefaultLanguage>} InjectionToken<YueUiI18nDefaultLanguage>
 */
export const YUE_UI_I18N_DEFAULT_LANGUAGE: InjectionToken<YueUiI18nDefaultLanguage> = new InjectionToken('YUE_UI_I18N_LANGUAGE');

/**
 * Injection token to get translation handler not found
 *
 * @usageNotes
 * Import the Inject decorator from angular core
 *
 * ```typescript
 * ...
 *
 *  constructor(Inject(YUE_UI_I18N_NOT_FOUND_HANDLER) private readonly notFoundHandler: YueUiI18nNotFoundHandler) { }
 *
 * ...
 * ```
 *
 * @export
 * @type {InjectionToken<YueUiI18nNotFoundHandler>} InjectionToken<YueUiI18nNotFoundHandler>
 */
export const YUE_UI_I18N_NOT_FOUND_HANDLER: InjectionToken<YueUiI18nNotFoundHandler> = new InjectionToken('YUE_UI_I18N_NOT_FOUND_HANDLER');
