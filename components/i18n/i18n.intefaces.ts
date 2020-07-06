import { BehaviorSubject } from 'rxjs';
import { YueUiI18nService } from './i18n.fix';


/**
 * Injection interface of the injection token "YUE_UI_I18N_DICTIONARY"
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
 * @type {YueUiI18nDictionary} YueUiI18nDictionary
 */
export type YueUiI18nDictionary = BehaviorSubject<{[x: string]: string | object}>;

/**
 * Injection interface of the injection token "YUE_UI_I18N_COMPONENTS_DICTIONARY"
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
 * @type {YueUiI18nComponentsDictionary} YueUiI18nComponentsDictionary
 */
export type YueUiI18nComponentsDictionary = BehaviorSubject<{
  [componentName: string]: { [x: string]: any }
}>;

/**
 * Injection interface of the injection token "YUE_UI_I18N_LANGUAGE"
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
 * @type {YueUiI18nLanguage} YueUiI18nLanguage
 */
export type YueUiI18nLanguage = BehaviorSubject<string | null>;

/**
 * Injection interface of the injection token "YUE_UI_I18N_DEFAULT_LANGUAGE"
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
 * @type {YueUiI18nDefaultLanguage} YueUiI18nDefaultLanguage
 */
export type YueUiI18nDefaultLanguage = string | null;

/**
 * Class used for handling tokens that do not exist in the dictionary
 * 
 * ```typescript
 * In your module:
 * 
 * ...
 * providers: [
 *   {
 *     provide: ,
 *     usaClass: class implements YueUiI18nNotFoundHandler {
 *       public handle(token: string, parameters: Partial<any>, service: YueUiI18nService): any {
 *         return 'ANY VALUE TO REPLACE THE TOKEN';
 *       }
 *     }
 *   }
 * ]
 * ...
 * 
 * ```
 *
 * @export
 * @abstract
 * @class YueUiI18nNotFoundHandler
 */
export abstract class YueUiI18nNotFoundHandler {

  public abstract handle(token: string, parameters: Partial<any>, service: YueUiI18nService): any;

}
