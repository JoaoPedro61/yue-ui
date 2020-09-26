import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';


export type YueUiNotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type YueUiNotificationType = 'success' | 'info' | 'warning' | 'error' | 'blank';

export interface YueUiNotificationOptions {
  type?: YueUiNotificationType;
  closable?: boolean;
  duration?: number;
  pauseOnHover?: boolean;
  placement?: YueUiNotificationPlacement;
  identifier?: string;
}

export type YueUiNotificationGlobalOptions = Pick<YueUiNotificationOptions, 'closable'
| 'duration'
| 'pauseOnHover'
| 'placement'>;

export interface YueUiNotificationData {
  messageId?: string;
  createdAt?: Date;
  title?: YueUiSmartRenderType;
  content?: YueUiSmartRenderType;
  options?: YueUiNotificationOptions;
}
