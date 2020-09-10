import { BehaviorSubject, Observable } from 'rxjs';
import { hash } from './hash';



interface Existence {
  [x: string]: boolean;
}

interface Indexs {
  [x: string]: number;
}


interface Hidded {
  [x: string]: ArrayObjectManagerConfig;
}


interface Showed {
  [x: string]: ArrayObjectManagerConfig;
}

interface ArrayObjectManagerGetConfig {
  showed: boolean;
  item: ArrayObjectManagerConfig;
}

export interface ArrayObjectManagerConfig {
  [x: string]: any;
}

export type ArrayObjectsManagerConfig = ArrayObjectManagerConfig[];

export class ArrayObjectManager {

  private readonly showkey: string = hash();

  private readonly identifier: string = 'identifier';

  private readonly behavior$: BehaviorSubject<ArrayObjectsManagerConfig> = new BehaviorSubject<ArrayObjectsManagerConfig>([]);

  private readonly isShowed: Showed = {};

  private readonly isHidded: Hidded = {};

  private readonly exists: Existence = {};

  private readonly indexs: Indexs = {};

  private objectsgross: ArrayObjectsManagerConfig = [];


  public get objects(): Observable<ArrayObjectsManagerConfig> {
    return this.behavior$.asObservable();
  }

  public get behavior(): BehaviorSubject<ArrayObjectsManagerConfig> {
    return this.behavior$;
  }

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

  public hidded(): Hidded {
    return this.isHidded;
  }

  public showed(): Showed {
    return this.isShowed;
  }

  public complete(): void {
    this.behavior$.complete();
  }

}
