import { NgModule } from "@angular/core";
import { LogoutOutline } from "@ant-design/icons-angular/icons";
import { YueUiIconModule, YUE_UI_ICONS } from "@joaopedro61/yue-ui/icon";



@NgModule({
  providers: [
    {
      provide: YUE_UI_ICONS,
      useValue: [
        LogoutOutline,
      ]
    }
  ],
  imports: [
    YueUiIconModule,
  ],
  exports: [
    YueUiIconModule,
  ],
})
export class IconsModule {

}
