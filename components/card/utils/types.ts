import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';
import { YueUiCardMetadataComponent } from '../components/metadata.component';



export interface YueUiCardMetadataConfig {
  title: YueUiSmartRenderType;
  description: YueUiSmartRenderType;
  avatar: YueUiSmartRenderType;
}

export type YueUiCardMetadata = YueUiSmartRenderType | YueUiCardMetadataComponent;
