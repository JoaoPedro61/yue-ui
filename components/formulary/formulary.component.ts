import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yue-formulary',
  template: `
    <p>
      formulary works!
    </p>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormularyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
