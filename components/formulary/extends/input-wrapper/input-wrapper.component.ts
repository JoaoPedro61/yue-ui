import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy, ComponentFactoryResolver, ChangeDetectorRef, ElementRef, RendererFactory2, Renderer2, ComponentFactory, ComponentRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { YueInputEncapsulationComponent } from '../input-encapsulation/input-encapsulation.component';



@Component({
  selector: 'yue-deep-input-wrapper',
  template: `
    <div class="input-wrapper--">
      <ng-container *ngIf="field.template">
        <div [class]="'field-template ' + (templateIsString ? 'content-string' : 'content-template-ref')">
          <ng-container *ngIf="templateIsString">
            <div class="field-content" [innerHTML]="templateString"></div>
          </ng-container>
          <ng-container *ngIf="!templateIsString">
            <div class="field-content">
              <ng-container *ngTemplateOutlet="templateTemplate;context:templateContext"></ng-container>
            </div>
          </ng-container>
        </div>
      </ng-container>
      <ng-container #vhFieldWrapper></ng-container>
      <ng-container *ngIf="field.wrapper">
        <div class="sub-fields-container flex-grid-container">
          <ng-container *ngFor="let subField of field.wrapper">
            <yue-deep-input-wrapper
              [class]="'u-w-' + ( (subField.width || 5) * 10)"
              [field]="subField"
              [formGroup]="formGroup"
              [formulary]="formulary"
              [model]="model"
              [options]="options">
            </yue-deep-input-wrapper>
          </ng-container>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./input-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueInputWrapperComponent<T = any> implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('vhFieldWrapper', { read: ViewContainerRef, static: false }) private viewRefField!: ViewContainerRef;

  @Input() public formGroup!: FormGroup;

  @Input() public field!: any;

  @Input() public model!: Observable<any>;

  @Input() public options!: Observable<any>;

  @Input() public formulary!: any;

  private subscription$!: Subscription;

  private renderer!: Renderer2;

  private componentFactory!: ComponentFactory<YueInputEncapsulationComponent>;

  private componentRef!: ComponentRef<YueInputEncapsulationComponent>;

  public get templateIsString(): boolean {
    if ('string' === typeof this.field.template || 'function' === typeof this.field.template) {
      return true;
    }
    return false;
  }

  public get template(): string | TemplateRef<any> {
    if (this.templateIsString) {
      if ('function' === typeof this.field.template) {
        return this.field.template(this.field, this.model, this.formGroup, this.options);
      }
      return this.field.template;
    } else if (this.field.template instanceof TemplateRef) {
      return this.field.template;
    }
    return '';
  }

  public get templateString(): string {
    if (this.templateIsString) {
      if ('function' === typeof this.field.template) {
        const value = this.field.template(this.field, this.model, this.formGroup, this.options);
        if (`string` === typeof value) {
          return value;
        }
        return ``;
      }
      return this.field.template as string;
    }
    return '';
  }

  public get templateTemplate(): TemplateRef<any> {
    return (this.field.template as any) as TemplateRef<any>;
  }

  public get templateContext(): object {
    return {
      field: this.field,
      model: this.model,
      formGroup: this.formGroup,
      options: this.options
    };
  }

  constructor(private readonly detector: ChangeDetectorRef, private readonly cfr: ComponentFactoryResolver, private readonly el: ElementRef, private readonly factory: RendererFactory2) {
    this.renderer = this.factory.createRenderer(null, null);
  }

  public ngAfterViewInit(): void {
    if (this.el && this.renderer) {
      this.renderer.addClass(this.el.nativeElement, `u-w-${(this.field.width || 5) * 10}`);
    }
    this.subscription$ = this.formGroup
      .valueChanges.subscribe(() => {
        this.detector.detectChanges();
      });
    if (!this.field.key && (!this.field.wrapper && !this.field.template)) {
      throw new Error('Sorry, but the inputs that haven\'t the property "key", must be have the property "wrapper" or "template".');
    }
    if (this.field.key && !this.field.type) {
      throw new Error('Sorry, but the inputs that have a property "key", must be have the property "type".');
    }
    if (this.field.type && !this.field.key) {
      throw new Error('Sorry, but the inputs that have a property "type", must be have the property "key".');
    }
    if (this.field.key && this.field.type) {
      this.componentFactory = this.cfr.resolveComponentFactory(YueInputEncapsulationComponent);
      this.componentRef = this.viewRefField.createComponent(this.componentFactory);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.formGroup = this.formGroup;
      this.componentRef.instance.options = this.options;
      this.componentRef.instance.model = this.model;
      this.componentRef.instance.formulary = this.formulary;
      this.componentRef.changeDetectorRef.markForCheck();
    }
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
