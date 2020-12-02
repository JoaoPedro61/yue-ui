import { FormularySource, ListenEvent } from '@joaopedro61/yue-ui/formulary/builder';
import { deepMerge, deepTypeChecker, equals } from '@joaopedro61/yue-ui/core/utils';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { YueUiFilterBarEvent } from './utils/types';



export class FilterBarSource<M = any> {

  private readonly destroy$: Subject<void> = new Subject();

  private readonly events$: Subject<YueUiFilterBarEvent> = new Subject();

  private readonly _sourceFormulary: FormularySource<Partial<M>> = new FormularySource();

  private readonly _sourceFormularyAdditional: FormularySource<Partial<M>> = new FormularySource();

  public get sourceFormulary(): FormularySource<Partial<M>> {
    return this._sourceFormulary;
  }

  public get sourceFormularyAdditional(): FormularySource<Partial<M>> {
    return this._sourceFormularyAdditional;
  }

  public get hasFieldInSourceFormularyAdditional(): boolean {
    return !!this._sourceFormularyAdditional.getFirstFieldIdentifier();
  }

  constructor() {
    this._sourceFormulary
      .shouldHideDescriptors(true)
      .shouldHideLabels(true)
      .shouldHideStepLabels(true)
      .shouldUseGridSystem(false)
      .shouldUseInitialFocus(true);

    const manageModelChange = (event: ListenEvent): void => {
      if (event.type === `modelChanged`) {
        const final = {};
        const sourceFormularyModel = this._sourceFormulary.getModel();
        const sourceFormularyAddtionalModel = this._sourceFormularyAdditional.getModel();

        deepMerge(final, deepMerge(Object.assign(sourceFormularyModel || {}), Object.assign(sourceFormularyAddtionalModel || {})));

        this.events$.next({
          type: `modelChanged`,
          data: final,
        });
      }
    };

    this._sourceFormulary.listen().pipe(takeUntil(this.destroy$)).subscribe({
      next: manageModelChange,
    });
    this._sourceFormularyAdditional.listen().pipe(takeUntil(this.destroy$)).subscribe({
      next: manageModelChange,
    });
  }

  public accessSourceFormulary(cb: (form: FormularySource<M>) => void): this {
    if (typeof cb === `function`) {
      cb.call(this, this._sourceFormulary);
    }
    return this;
  }

  public accessSourceAdditionalFormulary(cb: (form: FormularySource<M>) => void): this {
    if (typeof cb === `function`) {
      cb.call(this, this._sourceFormularyAdditional);
    }
    return this;
  }

  public clear(): void {
    this._sourceFormulary.clearModel();
    this._sourceFormularyAdditional.clearModel();
  }

  public search(): void {
    const final = {};
    const sourceFormularyModel = this._sourceFormulary.getModel();
    const sourceFormularyAddtionalModel = this._sourceFormularyAdditional.getModel();

    deepMerge(final, deepMerge(Object.assign(sourceFormularyModel || {}), Object.assign(sourceFormularyAddtionalModel || {})));

    this.events$.next({
      type: `search`,
      data: final,
    });
  }

  public setModel(model: Partial<M>): this {
    const sourceFormularyModel = this._sourceFormulary.getModel();
    if (deepTypeChecker(model) === `object` || deepTypeChecker(sourceFormularyModel) === `object`) {
      this._sourceFormulary.setModel(deepMerge(sourceFormularyModel, model));
    } else {
      this._sourceFormulary.setModel(model || {});
    }
    const sourceFormularyAddtionalModel = this._sourceFormularyAdditional.getModel();
    if (deepTypeChecker(model) === `object` || deepTypeChecker(sourceFormularyAddtionalModel) === `object`) {
      this._sourceFormularyAdditional.setModel(deepMerge(sourceFormularyAddtionalModel, model));
    } else {
      this._sourceFormularyAdditional.setModel(model || {});
    }
    return this;
  }

  public listen(): Observable<YueUiFilterBarEvent> {
    return this.events$.pipe(takeUntil(this.destroy$), distinctUntilChanged((x, y) => {
      if (y.type === `search`) {
        return false;
      }
      return equals(x, y);
    }), debounceTime(300));
  }

  public destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.events$.complete();

    this._sourceFormulary.destroy();
    this._sourceFormularyAdditional.destroy();
  }

}
