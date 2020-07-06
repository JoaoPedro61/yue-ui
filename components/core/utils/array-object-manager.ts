import { BehaviorSubject, Observable } from 'rxjs';
import { hash } from './hash';



/**
 * @ignore
 *
 * @interface Existence
 */
interface Existence {
  [x: string]: boolean;
}

/**
 * @ignore
 *
 * @interface Indexs
 */
interface Indexs {
  [x: string]: number;
}

/**
 * @ignore
 *
 * @interface Hidded
 */
interface Hidded {
  [x: string]: ArrayObjectManagerConfig;
}

/**
 * @ignore
 *
 * @interface Showed
 */
interface Showed {
  [x: string]: ArrayObjectManagerConfig;
}

/**
 * @ignore
 *
 * @interface ArrayObjectManagerGetConfig
 */
interface ArrayObjectManagerGetConfig {
  showed: boolean;
  item: ArrayObjectManagerConfig;
}

/**
 * @ignore
 *
 * @export
 * @interface ArrayObjectManagerConfig
 */
export interface ArrayObjectManagerConfig {
  [x: string]: any;
}

/**
 * @ignore
 *
 * @export
 * @type {ArrayObjectsManagerConfig} Object type array
 */
export type ArrayObjectsManagerConfig = ArrayObjectManagerConfig[];

/**
 * Simple class for controlling and managing object arrays,
 * The manager makes the observable available to listeners
 *
 * @usageNotes
 * ```typescript
 * let manager = new ArrayObjectManager<any>();
 * manager.set({...});
 * ```
 * 
 * @export
 * @class ArrayObjectManager
 */
export class ArrayObjectManager {

  /**
   * Key that will be used in the condition to show or hide
   *
   * @ignore
   *
   * @private
   * @type {string}
   * @memberof ArrayObjectManager
   */
  private readonly showkey: string = hash();

  /**
   * Identifier to be used in multi-object comparison
   *
   * @ignore
   *
   * @private
   * @type {string}
   * @memberof ArrayObjectManager
   */
  private readonly identifier: string = 'identifier';

  /**
   * Observable
   *
   * @ignore
   *
   * @private
   * @type {BehaviorSubject<ArrayObjectsManagerConfig>}
   * @memberof ArrayObjectManager
   */
  private readonly behavior$: BehaviorSubject<ArrayObjectsManagerConfig> = new BehaviorSubject<ArrayObjectsManagerConfig>([]);

  /**
   * Currently active elements
   *
   * @private
   * @type {Showed}
   * @memberof ArrayObjectManager
   */
  private readonly isShowed: Showed = {};

  /**
   * Currently inactive elements
   *
   * @private
   * @type {Hidded}
   * @memberof ArrayObjectManager
   */
  private readonly isHidded: Hidded = {};

  /**
   * Currently existing elements
   *
   * @private
   * @type {Existence}
   * @memberof ArrayObjectManager
   */
  private readonly exists: Existence = {};

  /**
   * Indexed keys
   *
   * @private
   * @type {Indexs}
   * @memberof ArrayObjectManager
   */
  private readonly indexs: Indexs = {};

  /**
   * Raw data
   *
   * @ignore
   *
   * @private
   * @type {ArrayObjectsManagerConfig}
   * @memberof ArrayObjectManager
   */
  private objectsgross: ArrayObjectsManagerConfig = [];

  /**
   * Returns an observable
   *
   * @readonly
   * @type {Observable<ArrayObjectsManagerConfig>}
   * @memberof ArrayObjectManager
   */
  public get objects(): Observable<ArrayObjectsManagerConfig> {
    return this.behavior$.asObservable();
  }

  /**
   * Returns the main control behavior
   *
   * @readonly
   * @type {BehaviorSubject<ArrayObjectsManagerConfig>}
   * @memberof ArrayObjectManager
   */
  public get behavior(): BehaviorSubject<ArrayObjectsManagerConfig> {
    return this.behavior$;
  }

  /**
   * Creates an instance of ArrayObjectManager.
   *
   * @param {ArrayObjectsManagerConfig} [objects=[]] Initial data
   * @param {string} [identifier='identifier'] Duplicate data control key
   * @memberof ArrayObjectManager
   */
  constructor(objects: ArrayObjectsManagerConfig = [], identifier: string = 'identifier') {
    this.identifier = identifier;
    for (let i = 0, l = objects.length; i < l; i++) {
      if (!this.exists.hasOwnProperty(objects[i][this.identifier])) {
        objects[i][this.showkey] = true;
        this.isShowed[objects[i][this.identifier]] = objects[i];
        this.exists[objects[i][this.identifier]] = true;
        this.indexs[objects[i][this.identifier]] = i;
      } else {
        objects.splice(i, 1);
        l--;
        i--;
      }
    }
    this.objectsgross = objects;
    this.behavior$.next(this.objectsgross);
  }

  /**
   * Adds a collection or just an element to the data
   *
   * @param {(ArrayObjectsManagerConfig | ArrayObjectManagerConfig)} source Data to add
   * @returns {this} Returns the same instance for more actions
   * @memberof ArrayObjectManager
   */
  public set(source: ArrayObjectsManagerConfig | ArrayObjectManagerConfig): this {
    let modified: ArrayObjectsManagerConfig = [];
    if (source) {
      if (!Array.isArray(source)) {
        modified = [source];
      } else {
        modified = source;
      }
      for (let i = 0, l = modified.length; i < l; i++) {
        if (modified[i][this.identifier]) {
          if (!this.exists.hasOwnProperty(modified[i][this.identifier])) {
            this.objectsgross.push(Object.assign(modified[i], { [this.showkey]: true }) as unknown as ArrayObjectManagerConfig);
            this.isShowed[modified[i][this.identifier]] = modified[i];
            this.exists[modified[i][this.identifier]] = true;
            this.indexs[modified[i][this.identifier]] = this.objectsgross.length - 1;
          } else {
            if (this.objectsgross[this.indexs[modified[i][this.identifier]]]) {
              this.objectsgross[this.indexs[modified[i][this.identifier]]] = Object.assign(modified[i], { [this.showkey]: this.objectsgross[this.indexs[modified[i][this.identifier]]][this.showkey] }) as unknown as ArrayObjectManagerConfig;
            }
          }
        }
      }
      const newformation = [];
      for (let i = 0, l = this.objectsgross.length; i < l; i++) {
        if (this.objectsgross[i][this.showkey]) {
          newformation.push(this.objectsgross[i]);
        }
      }
      this.behavior$.next(newformation);
    }
    return this;
  }

  /**
   * Search the allocated record for the element in question and return it
   *
   * @param {string} identifier Identifier of element wanted
   * @returns {(ArrayObjectManagerGetConfig | null)} Matched element
   * @memberof ArrayObjectManager
   */
  public get(identifier: string): ArrayObjectManagerGetConfig | null {
    if (this.exists.hasOwnProperty(identifier)) {
      if (this.isShowed.hasOwnProperty(identifier)) {
        return {
          showed: true,
          item: this.isShowed[identifier],
        };
      } else if (this.isHidded.hasOwnProperty(identifier)) {
        return {
          showed: false,
          item: this.isHidded[identifier],
        };
      }
      return null;
    }
    return null;
  }

  /**
   * Removes elements with the identifiers in question
   *
   * @param {...string[]} identifiers Identificators
   * @returns {this} Returns the same instance for more actions
   * @memberof ArrayObjectManager
   */
  public remove(...identifiers: string[]): this {
    for (let i = 0, l = identifiers.length; i < l; i++) {
      if (Array.isArray(identifiers[i])) {
        this.remove(identifiers[i]);
      } else if (this.exists.hasOwnProperty(identifiers[i])) {
        if (this.indexs.hasOwnProperty(identifiers[i])) {
          delete this.isShowed[identifiers[i]];
          delete this.isHidded[identifiers[i]];
          delete this.indexs[identifiers[i]];
          delete this.exists[identifiers[i]];
          this.objectsgross.splice(this.indexs[identifiers[i]], 1);
        } else {
          console.warn(`Ops, Object not indexed!!!`);
        }
      }
    }
    const newformation = [];
    for (let i = 0, l = this.objectsgross.length; i < l; i++) {
      if (this.objectsgross[i][this.showkey]) {
        newformation.push(this.objectsgross[i]);
      }
    }
    this.behavior$.next(newformation);
    return this;
  }

  /**
   * Disables elements with the identifiers in question,
   * without removing them from the initial data
   *
   * @param {...string[]} identifiers Identificators
   * @returns {this} Returns the same instance for more actions
   * @memberof ArrayObjectManager
   */
  public hide(...identifiers: string[]): this {
    for (let i = 0, l = identifiers.length; i < l; i++) {
      if (Array.isArray(identifiers[i])) {
        this.hide(identifiers[i]);
      } else if (this.exists.hasOwnProperty(identifiers[i])) {
        if (this.indexs.hasOwnProperty(identifiers[i])) {
          if (this.isShowed.hasOwnProperty(identifiers[i])) {
            delete this.isShowed[identifiers[i]];
          }
          this.isHidded[identifiers[i]] = this.objectsgross[this.indexs[identifiers[i]]];
          this.objectsgross[this.indexs[identifiers[i]]][this.showkey] = false;
        } else {
          console.warn(`Ops, Object not indexed!!!`);
        }
      }
    }
    const newformation = [];
    for (let i = 0, l = this.objectsgross.length; i < l; i++) {
      if (this.objectsgross[i][this.showkey]) {
        newformation.push(this.objectsgross[i]);
      }
    }
    this.behavior$.next(newformation);
    return this;
  }

  /**
   * Activates elements with the corresponding identifier
   *
   * @param {...string[]} identifiers Identificators
   * @returns {this} Returns the same instance for more actions
   * @memberof ArrayObjectManager
   */
  public show(...identifiers: string[]): this {
    for (let i = 0, l = identifiers.length; i < l; i++) {
      if (Array.isArray(identifiers[i])) {
        this.show(identifiers[i]);
      } else if (this.exists.hasOwnProperty(identifiers[i])) {
        if (this.indexs.hasOwnProperty(identifiers[i])) {
          if (this.isHidded.hasOwnProperty(identifiers[i])) {
            delete this.isHidded[identifiers[i]];
          }
          this.isShowed[identifiers[i]] = this.objectsgross[this.indexs[identifiers[i]]];
          this.objectsgross[this.indexs[identifiers[i]]][this.showkey] = true;
        } else {
          console.warn(`Ops, Object not indexed!!!`);
        }
      }
    }
    const newformation = [];
    for (let i = 0, l = this.objectsgross.length; i < l; i++) {
      if (this.objectsgross[i][this.showkey]) {
        newformation.push(this.objectsgross[i]);
      }
    }
    this.behavior$.next(newformation);
    return this;
  }

  /**
   * Returns the currently unactive elements
   *
   * @returns {Hidded} Template data
   * @memberof ArrayObjectManager
   */
  public hidded(): Hidded {
    return this.isHidded;
  }

  /**
   * Returns the currently active elements
   *
   * @returns {Showed} Template data
   * @memberof ArrayObjectManager
   */
  public showed(): Showed {
    return this.isShowed;
  }

}
