import { Pipe, PipeTransform } from '@angular/core';

import { YueUiI18nService } from './i18n.service';



@Pipe({
  name: 'yueUiI18n'
})
export class YueUiI18nPipe implements PipeTransform {

  constructor(private readonly i18n: YueUiI18nService) {}

  public transform(token: string, paramenters?: Partial<any>): string {
    return this.i18n.translate(token, paramenters || {});
  }

}
