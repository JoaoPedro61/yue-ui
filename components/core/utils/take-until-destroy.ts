// tslint:disable only-arrow-functions
import { Subject, Subscription, Observable } from 'rxjs';



/**
 * Generate a log error and return it
 *
 * @param {string} property Property that is wrong
 * @returns {string}
 */
function buildErrorDeclaration(property: string): string {
  const prefix = `private readonly `;
  const sufix = `\$: Subscription;`;
  const rows = [`${prefix}${property}${sufix}`];
  const lengthAtTarget = prefix.length + property.length;
  for (let space = 0, off = 2; space < off; space++) {
    let rowdashd = '';
    for (let i = 0, l = lengthAtTarget; i < l; i++) {
      if (i <= lengthAtTarget - space) {
        rowdashd += ' ';
      }
      if (i === lengthAtTarget - 1 - space) {
        rowdashd += '/';
      }
    }
    rows.push(rowdashd);
  }
  let row = '';
  for (let i = 0, l = lengthAtTarget; i < l; i++) {
    if (i <= 0) {
      row += '/';
    } else if (i <= lengthAtTarget - 3) {
      row += '-';
    }
    if (i === lengthAtTarget - 3) {
      row += '/';
    }
  }
  rows.push(row);
  rows.push(`|\n\\\n  -> Please add the "$" at the end to the "Subscription" variable declaration,\nas this is a good practice, helping to identify the type of variable when reading the code`);
  return rows.join('\n');
}

/**
 * Class decorator, used to automatically cancel observable subscriptions
 *
 * @usageNotes
 * ```typescript
 *
 * TakeUntilDestroy()
 * export class MyClass implements TakeUntilDeclareHandler {
 *
 *   constructor() {
 *     this.something.pipe(takeUntil(this.componentDestroy())).subscribe(...);
 *   }
 *
 *   public componentDestroy(): Observable<void> {
 *      return of();
 *   }
 *
 *   public ngOnDestroy(): void { }
 *
 * }
 * ```
 *
 * @export
 * @param {boolean} [alsoDestroyProppedSubscriptions=true] If true will destroy all properties that are Subscription
 * @param {string[]} [blacklist=[]] Properties that don't will be detroyed
 * @returns {Fucntion} Classe decorator
 */
export function TakeUntilDestroy(alsoDestroyProppedSubscriptions: boolean = true, blacklist: string[] = []) {
  /**
   * @ignore
   * @internal
   */
  return function(constructor: any) {
    const originalDestroy = constructor.prototype.ngOnDestroy;
    if (typeof originalDestroy !== `function`) {
      console.warn(`${constructor.name} is using @TakeUntilDestroy(${alsoDestroyProppedSubscriptions}, ${JSON.stringify(blacklist)}) but does not implement OnDestroy`);
    }
    constructor.prototype.componentDestroy = function () {
      this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
      return this._takeUntilDestroy$.asObservable();
    };
    constructor.prototype.ngOnDestroy = function () {
      if (alsoDestroyProppedSubscriptions) {
        for (const prop in this) {
          if (this[prop]) {
            const property = this[prop];
            if (!blacklist.includes(prop)) {
              if (property && (typeof property.unsubscribe === `function` && property instanceof Subscription)) {
                if (!/\$$/gm.test(prop)) {
                  console.warn(buildErrorDeclaration(prop));
                }
                if (!property.closed) {
                  property.unsubscribe();
                }
              }
            }
          }
        }
      }
      if (originalDestroy && typeof originalDestroy === `function`) {
        originalDestroy.apply(this, arguments);
      }
      if (this._takeUntilDestroy$) {
        this._takeUntilDestroy$.next();
        this._takeUntilDestroy$.complete();
      }
    };
  };
}

/**
 * Required implement method in you class
 *
 * @export
 * @interface TakeUntilDeclareHandler
 */
export interface TakeUntilDeclareHandler {


  /**
   * Required method
   *
   * @memberof TakeUntilDeclareHandler
   */
  readonly componentDestroy?: () => Observable<void>;
}

