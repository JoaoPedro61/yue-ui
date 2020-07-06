import { Pipe, PipeTransform } from '@angular/core';

import { YueUiI18nService } from './i18n.service';



/**
 * Basic pipe for quick translation of inline tokens in your HTML binds
 *
 * @usageNotes
 * ```html
 * <span [innerText]="'TOKEN' | yueUiI18n"></span>
 * ```
 *
 * @export
 * @class YueUiI18nPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'yueUiI18n'
})
export class YueUiI18nPipe implements PipeTransform {

  /**
   * Creates an instance of YueUiI18nPipe.
   *
   * @param {YueUiI18nService} i18n Service of i18n
   * @memberof YueUiI18nPipe
   */
  constructor(private readonly i18n: YueUiI18nService) {}

  /**
   * Transform inpt values into translated labels
   *
   * @param {string} token Wanted token to translate
   * @returns {string} Returns a translated token
   * @memberof YueUiI18nPipe
   */
  public transform(token: string): string {
    return this.i18n.translate(token);
  }

}
