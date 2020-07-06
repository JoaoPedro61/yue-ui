import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';



/**
 * Typing to perform route caching
 *
 * @export
 * @interface HttpCacheEntry
 */
export interface YueUiHttpCacheEntry {

  /**
   * Date in milliseconds, used to make the time comparison, which will tell you if the route will be cached or not
   *
   * @type {number}
   * @memberof HttpCacheEntry
   */
  lastUpdated: number;

  /**
   * If the request is to be placed in the cache, it will save the data in that property
   *
   * @type {HttpResponse<any>}
   * @memberof HttpCacheEntry
   */
  data: HttpResponse<any>;
}

/**
 * Typing to perform the cancellation of multiple equal requests
 *
 * @export
 * @interface HttpPendingEntry
 */
export interface YueUiHttpPendingEntry {

  /**
   * Date in milliseconds, to perform the time check, to say if you can make a new request
   *
   * @type {number}
   * @memberof HttpPendingEntry
   */
  lastUpdated: number;

  /**
   * If pending route validation is successful, the route data will be saved here
   *
   * @type {HttpResponse<any>}
   * @memberof HttpPendingEntry
   */
  data: HttpResponse<any>;
}

/**
 * Used to enable route caching, with flag condition
 *
 * @export
 * @interface YueEnableCacheOptions
 */
export interface YueEnableCacheOptions {
  /**
   * With or not with flag
   *
   * @type {('flag' | 'noflag')}
   * @memberof YueEnableCacheOptions
   */
  condition: 'with' | 'without';

  /**
   * Flag name
   *
   * @type {string}
   * @memberof YueEnableCacheOptions
   */
  flag: string;
}

/**
 * Used to enable route caching
 *
 * @export
 * @type {YueEnableCacheOptions} YueEnableCacheOptions
 */
export type YueEnableCache = YueEnableCacheOptions | boolean;

/**
 * Standard typing for route data storage
 *
 * @export
 * @type {YueUiHttpCacheData} YueUiHttpCacheData
 */
export type YueUiHttpCacheData = Map<string, YueUiHttpCacheEntry>;

/**
 * Standard input for pending route data storage
 *
 * @export
 * @type {YueUiHttpPending} YueUiHttpPending
 */
export type YueUiHttpPending = Map<string, YueUiHttpPendingEntry>;

/**
 * Options avaliable when the request are in progress
 *
 * @export
 * @type {YueProgressRequestOptions} YueProgressRequestOptions
 */
export type YueProgressRequestOptions = null | {
  /**
   * Bar loader type
   *
   * @type {('indeterminate' | 'linear')}
   * @memberof YueProgressRequestOptions
   */
  type: 'indeterminate' | 'linear';

  /**
   * Current request progress
   *
   * @type {number}
   * @memberof YueProgressRequestOptions
   */
  progress?: number;
};


/**
 * Standard input for request progress
 *
 * @export
 * @type {YueProgressRequest} YueProgressRequest
 */
export type YueProgressRequest = BehaviorSubject<YueProgressRequestOptions>;
