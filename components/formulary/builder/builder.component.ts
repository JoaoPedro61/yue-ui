import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver,
  ComponentRef,
  SimpleChanges
} from '@angular/core';

import { differenceBy } from 'lodash';

import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { takeUntil, delayWhen } from 'rxjs/operators';

import { YueUiGridDirective } from '@joaopedro61/yue-ui/grid';
import { setHiddenProp } from '@joaopedro61/yue-ui/core/utils';

import { WrapperComponent } from './extends/wrapper.component';

import { FormularySource } from './formulary-builder';

import {
  GeneratedLinearFormularyMetadata,
  StaircaseFormularyStepStruct,
  GeneratedFieldMetadata,
  ParentTypes,
  GeneratedButtonMetadata,
  ButtonsAlign,
} from './modifiers';





@Component({
  selector: 'yue-ui-formulary',
  template: `
    <ng-container *ngIf="isStepped && showStepLabels">
      <div class="formulary-steps-labels-wrap">
        <div class="formulary-steps-labels-wrap-inner">
          <ng-container *ngFor="let item of steps; index as index">
            <div class="formulary-steps-label-item-wrap" (click)="goto(index);" [class.activated]="index === activatedStepIndex">
              <div class="formulary-steps-label-item-wrap-inner">
                <span [innerText]="item.label || item.identifier"></span>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </ng-container>
    <div yueUiGrid [yueUiGridGutter]="gutters">
      <ng-container #fields></ng-container>
    </div>
    <ng-container #buttons *ngIf="(buttons$ | async) as buttons">
      <ng-container *ngIf="buttons.length">
        <div class="formulary-footer-wrap">
          <div class="formulary-footer-wrap-inner" [style.justifyContent]="buttonsAlignment">
            <ng-container *ngFor="let btn of buttons">
              <button
                yueUiButton
                [yueUiButtonBlock]="btn.struct.block"
                [yueUiButtonDashed]="btn.struct.dashed"
                [yueUiButtonDisable]="btn.struct.disabled"
                [yueUiButtonGhost]="btn.struct.ghost"
                [yueUiButtonLoading]="btn.struct.loading"
                [yueUiButtonRounded]="btn.struct.rounded"
                [yueUiButtonSize]="btn.struct.size"
                [yueUiButtonType]="btn.struct.type"
                (click)="clickedOnButton(btn);"
              >
                <ng-container *ngIf="btn.struct.icon && !btn.struct.loading">
                  <i
                    yueUiIcon
                    [yueUiIconType]="btn.struct.icon"
                    [yueUiIconSpin]="btn.struct.loading"

                    aria-hidden="true"
                  ></i>
                </ng-container>
                <yue-ui-smart-render
                  [yueUiSmartRender]="btn.struct.label"
                  [yueUiSmartRenderContext]="{}"
                >
                </yue-ui-smart-render>
              </button>
            </ng-container>
          </div>
        </div>
      </ng-container>
    </ng-container>
  `,
  styleUrls: [`./styles/builder.component.less`],
  preserveWhitespaces: false,
  exportAs: 'formularyRef',
  host: {
    '[class.yue-ui-formulary]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormularyComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  // [attr.cdkFocusInitial]="config.autofocus === 'cancel' || null"

  private readonly untilDestroy$: Subject<void> = new Subject();

  private readonly viewInit$: Subject<boolean> = new Subject();

  @ViewChild(`fields`, { static: false, read: ViewContainerRef })
  private _vcr!: ViewContainerRef;

  @ViewChild(YueUiGridDirective, { static: false })
  private grid!: YueUiGridDirective;

  private _old: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata = null as any;

  private _oldFields: GeneratedFieldMetadata[] = [];

  private _current: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata = null as any;

  private _currentFields: GeneratedFieldMetadata[] = [];

  private _fieldComponentRefs: { [x: string]: ComponentRef<WrapperComponent> } = {};

  private source!: FormularySource;

  private sourceSubscription!: Subscription;

  private sourceButtonsSubscription!: Subscription;

  private sourceUnknownChangesSubscription!: Subscription;

  public alignment: ButtonsAlign = `center`;

  public get buttonsAlignment(): string {
    if (this.alignment !== `center`) {
      return `flex-${this.alignment}`;
    }
    return `center`;
  }

  public readonly buttons$: BehaviorSubject<GeneratedButtonMetadata[]> = new BehaviorSubject<GeneratedButtonMetadata[]>([]);

  public get gutters(): [number, number] {
    return [
      10,
      0
    ];
  }

  public get showStepLabels(): boolean {
    if (this.source) {
      return this.source.showStepsLabels;
    }
    return false;
  }

  public get isStepped(): boolean {
    if (this.source) {
      return this.source.isStepped;
    }
    return false;
  }

  public get activatedStepIndex(): number {
    if (this.source) {
      return this.source.activatedStepIndex;
    }
    return 0;
  }

  public get steps(): any[] {
    if (this.source) {
      return this.source.steps;
    }
    return [];
  }

  @Input()
  public yueUiFormularySource!: FormularySource;

  constructor(private readonly _cdr: ChangeDetectorRef, private readonly _cfr: ComponentFactoryResolver) { }

  private _clearView(): void {
    this._vcr.clear();
    this._fieldComponentRefs = {};
  }

  private _findFields(): void {
    this._oldFields = this._currentFields.concat();
    if (this._current) {
      if (this._current.metadataType === ParentTypes.LinearFormulary) {
        this._currentFields = this._current.struct.children.concat();
      } else if (this._current.metadataType === ParentTypes.StaircaseFormulary) {
        this._currentFields = this._current.children.concat();
      } else {
        throw new Error(`Invalid formulary type!`);
      }
    } else {
      this._currentFields = [];
    }
  }

  private _createField(field: GeneratedFieldMetadata, index?: number): void {
    if (field.identifier) {
      const factory = this._cfr.resolveComponentFactory(WrapperComponent);
      const ref = this._vcr.createComponent(factory, typeof index === `number` ? index : undefined);
      ref.instance.formulary = this.source;
      ref.instance.struct = field;
      (ref.instance as any).grid = this.grid;
      setHiddenProp(ref.instance, `parent`, this);
      this._fieldComponentRefs[field.identifier] = ref;
      ref.changeDetectorRef.markForCheck();
    }
  }

  private _createFields(): void {
    this._clearView();
    for (let i = 0, l = this._currentFields.length; i < l; i++) {
      if (this._currentFields[i].identifier) {
        this._createField(this._currentFields[i]);
      }
    }
  }

  private _excludeFields(fields: string[]): void {
    for (let i = 0, l = fields.length; i < l; i++) {
      if (this._fieldComponentRefs.hasOwnProperty(fields[i])) {
        this._fieldComponentRefs[fields[i]].destroy();
        delete this._fieldComponentRefs[fields[i]];
      }
    }
  }

  private _hideField(identifier: string): void {
    if (this._fieldComponentRefs[identifier]) {
      const ref = this._fieldComponentRefs[identifier];
      if (ref) {
        const idx = this._vcr.indexOf(ref.hostView);
        if (idx > -1) {
          this._vcr.detach(idx);
        }
      }
    }
  }

  public _showField(identifier: string): void {
    if (this._fieldComponentRefs[identifier]) {
      const ref = this._fieldComponentRefs[identifier];
      if (ref) {
        this._vcr.insert(ref.hostView);
      }
    }
  }

  public hideFields(fields: string[]): void {
    if (fields.length) {
      for (let i = 0, l = fields.length; i < l; i++) {
        if (fields[i]) {
          this._hideField(fields[i]);
        }
      }
    }
  }

  public showFields(fields: string[]): void {
    if (fields.length) {
      for (let i = 0, l = fields.length; i < l; i++) {
        if (fields[i]) {
          this._showField(fields[i]);
        }
      }
    }
  }

  private _addFields(fields: { index: number; field: GeneratedFieldMetadata; }[]): void {
    if (fields.length) {
      for (let i = 0, l = fields.length; i < l; i++) {
        if (fields[i].field.identifier) {
          this._createField(fields[i].field, fields[i].index);
        }
      }
    }
  }

  private _recreateFields(): void {
    const toAdd = differenceBy(this._currentFields, this._oldFields, `identifier`);
    const toRemove = differenceBy(this._oldFields, this._currentFields, `identifier`);
    const excludeFields: string[] = [];
    const addFields: { index: number; field: GeneratedFieldMetadata; }[] = [];
    for (let i = 0, l = toRemove.length; i < l; i++) {
      if (toRemove[i].identifier) {
        excludeFields.push(toRemove[i].identifier);
      }
    }
    if (toAdd.length) {
      for (let j = 0, k = toAdd.length; j < k; j++) {
        for (let i = 0, l = this._currentFields.length; i < l; i++) {
          if (this._currentFields[i].identifier) {
            if (toAdd[j].identifier) {
              if (this._currentFields[i].identifier === toAdd[j].identifier) {
                addFields.push({
                  index: i,
                  field: toAdd[j],
                });
                break;
              }
            }
          }
        }
      }
    }
    if (excludeFields.length) {
      this._excludeFields(excludeFields);
    }
    if (addFields.length) {
      this._addFields(addFields);
    }
    for (const component in this._fieldComponentRefs) {
      if (this._fieldComponentRefs.hasOwnProperty(component)) {
        if ((this._fieldComponentRefs as any)[component].instance) {
          (this._fieldComponentRefs as any)[component].instance.checkWrapperTree();
        }
      }
    }
  }

  private _should(): void {
    const shouldCreate = (!this._old
      && !!this._current)
      || (
        (!this._oldFields ||
          !this._oldFields.length)
        && (this._oldFields
          && this._oldFields.length))
      || (
        !!this._old && !!this._current
          ? this._old.identifier !== this._current.identifier
          : false
      );
    if (shouldCreate) {
      this._findFields();
      this._createFields();
    } else {
      this._findFields();
      this._recreateFields();
    }
    this._old = Object.assign({}, { ...this._current });
    setTimeout(() => this._cdr.markForCheck());
  }

  private _override(): void {
    if (this.sourceSubscription) {
      this.sourceSubscription.unsubscribe();
      this.buttons$.next([]);
      this._clearView();

      this._old = null as any;
      this._oldFields = null as any;

      this._current = null as any;
      this._currentFields = [];
    }
    if (this.sourceButtonsSubscription) {
      this.sourceButtonsSubscription.unsubscribe();
    }
    if (this.sourceUnknownChangesSubscription) {
      this.sourceUnknownChangesSubscription.unsubscribe();
    }
    if (this.yueUiFormularySource) {
      this.source = this.yueUiFormularySource;

      this.sourceSubscription = this.source
        .schematicFieldsChange$
        .pipe(takeUntil(this.untilDestroy$), delayWhen(() => this.viewInit$))
        .subscribe({
          next: () => {
            if (this.sourceSubscription) {
              this.sourceSubscription.unsubscribe();
            }
            if (this.sourceButtonsSubscription) {
              this.sourceButtonsSubscription.unsubscribe();
            }
            this.sourceSubscription = this.source
              .schematicFieldsChange$
              .pipe(takeUntil(this.untilDestroy$))
              .subscribe({
                next: (currentScheme: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata) => {
                  this._current = currentScheme;
                  this._should();
                }
              });

            this.sourceButtonsSubscription = this.source
              .schematicButtonsChange$
              .pipe(takeUntil(this.untilDestroy$))
              .subscribe({
                next: (currentScheme: GeneratedButtonMetadata[]) => {
                  this.buttons$.next(currentScheme);
                }
              });

            this.sourceUnknownChangesSubscription = this.source
              .unknownChanges$
              .pipe(takeUntil(this.untilDestroy$))
              .subscribe({
                next: (changes) => {
                  if (changes && typeof changes === `object` && !Array.isArray(changes)) {
                    const { buttonsAlignment } = changes ?? {};
                    if (buttonsAlignment) {
                      this.alignment = buttonsAlignment;
                      this._cdr.markForCheck();
                    }
                  }
                }
              });
          }
        });
    }
  }

  public goto(index: number): void {
    if (this.source) {
      this.source.staircase().step(index);
    }
  }

  public clickedOnButton(btn: GeneratedButtonMetadata): void {
    if (btn && btn.struct) {
      if (btn.struct.click && typeof btn.struct.click === `function`) {
        btn.struct.click(this.yueUiFormularySource, btn);
      }
      this.yueUiFormularySource.clickedAtButton(btn);
    }
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.viewInit$.next(true);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiFormularySource } = changes;
    if (yueUiFormularySource) {
      this._override();
    }
  }

  public ngOnDestroy(): void {
    this.untilDestroy$.next();
    this.untilDestroy$.complete();
    this.buttons$.next([]);
    this.buttons$.complete();

    this.viewInit$.complete();
  }

}
