import { YueUiButtonSize, YueUiButtonType } from './interfaces';

export class YueUiButton {

  public size?: YueUiButtonSize = `default`;

  public type?: YueUiButtonType = `default`;

  public loading?: boolean = false;

  public disabled?: boolean = false;

  public ghost?: boolean = false;

  public block?: boolean = false;

  public dashed?: boolean = false;

  public rounded?: boolean = false;

}
