import { Type } from '@angular/core';
import { TableDataColumnItem } from '../../utils/interfaces';



export abstract class TableCellComponentAbstraction<T = any, C = any> {

  public cell!: Type<C>;

  public value!: any;

  public full!: Partial<T>;

  public header!: TableDataColumnItem<T>

  public identifier!: string;

  public new!: Partial<T>;

  public old!: Partial<T>;

}
