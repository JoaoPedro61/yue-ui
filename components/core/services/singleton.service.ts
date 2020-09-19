import { Injectable } from '@angular/core';



export interface SingletonRecord {
  target: any;
}

export type SingletonRecords = Map<string, SingletonRecord>;


@Injectable({
  providedIn: 'root'
})
export class YueUiSingletonService {

  private _singleton: SingletonRecords = new Map();

  private get singleton(): SingletonRecords {
    return this._singleton;
  }

  public set<T = any>(key: string, target: T, force: boolean = false): void {
    if (!this.has(key) || force) {
      this.singleton.set(key, { target });
    }
  }

  public get<T = any>(key: string): T | null {
    return this.singleton.has(key)
      ? (this.singleton.get(key) as any).target as T
      : null;
  }

  public has(key: string): boolean {
    return this.singleton.has(key);
  }

}
