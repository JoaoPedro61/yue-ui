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

import { Subject } from 'rxjs';
import { takeUntil, delayWhen } from 'rxjs/operators';

import { setHiddenProp } from '@JoaoPedro61/yue-ui/core/utils';

import { WrapperComponent } from './extends/wrapper.component';

import { FormularySource } from './formulary-builder';

import {
  GeneratedLinearFormularyMetadata,
  StaircaseFormularyStepStruct,
  GeneratedFieldMetadata,
  ParentTypes,
} from './modifiers';




@Component({
  selector: 'yue-ui-formulary',
  template: `
    <ng-container #fields></ng-container>
    <ng-container #buttons></ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  preserveWhitespaces: false,
  exportAs: 'formularyRef',
  host: {
    '[class.yue-ui-formulary]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormularyComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  private readonly untilDestroy$: Subject<void> = new Subject();

  private readonly viewInit$: Subject<void> = new Subject();

  @ViewChild(`fields`, { static: false, read: ViewContainerRef })
  private _vcr!: ViewContainerRef;

  private _old: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata = null as any;

  private _oldFields: GeneratedFieldMetadata[] = [];

  private _current: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata = null as any;

  private _currentFields: GeneratedFieldMetadata[] = [];

  private _fieldComponentRefs: {[x: string]: ComponentRef<WrapperComponent>} = {};

  @Input()
  public source!: FormularySource;

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
    const shouldCreate = ( !this._old
      && !!this._current )
      || (
          ( !this._oldFields ||
            !this._oldFields.length )
          && ( this._oldFields
            && this._oldFields.length ) )
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

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.viewInit$.next();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { formulary } = changes;
    if (formulary) {
      if (formulary.isFirstChange()) {
        this.source
          .schematicFieldsChange$
            .pipe(takeUntil(this.untilDestroy$), delayWhen(() => this.viewInit$))
            .subscribe({
              next: (currentScheme: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata) => {
                this._current = currentScheme;
                this._should();
              }
            });
      }
    }
  }

  public ngOnDestroy(): void {
    this.untilDestroy$.next();
    this.untilDestroy$.complete();

    this.viewInit$.complete();
  }

}
