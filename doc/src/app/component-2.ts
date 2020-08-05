import { Component as NgComponent, ChangeDetectionStrategy } from '@angular/core';



@NgComponent({
  template: `
    Child
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component2 { }
