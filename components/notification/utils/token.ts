import { InjectionToken } from '@angular/core';

import { YueUiNotificationGlobalOptions } from './interfaces';


export const YUE_UI_NOTIFICATION_GLOBAL_OPTIONS: InjectionToken<YueUiNotificationGlobalOptions> = new InjectionToken(`YUE_UI_NOTIFICATION`);

export const YUE_UI_NOTIFICATION_GLOBAL_OPTIONS_VALUE: YueUiNotificationGlobalOptions = {
  closable: true,
  duration: 4700,
  pauseOnHover: true,
  placement: `bottomRight`,
};
