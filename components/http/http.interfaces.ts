import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';




export interface YueUiHttpCacheEntry {
  lastUpdated: number;
  data: HttpResponse<any>;
}

export interface YueUiHttpPendingEntry {
  lastUpdated: number;
  data: HttpResponse<any>;
}

export interface YueEnableCacheOptions {
  condition: 'with' | 'without';
  flag: string;
}

export type YueEnableCache = YueEnableCacheOptions | boolean;

export type YueUiHttpCacheData = Map<string, YueUiHttpCacheEntry>;

export type YueUiHttpPending = Map<string, YueUiHttpPendingEntry>;

export type YueProgressRequestOptions = null | {
  type: 'indeterminate' | 'linear';
  progress?: number;
};

export type YueProgressRequest = BehaviorSubject<YueProgressRequestOptions>;
