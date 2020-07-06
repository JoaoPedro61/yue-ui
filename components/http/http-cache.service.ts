import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpRequest } from '@angular/common/http';

import { YUE_UI_ENABLE_CACHE_RESPONSE, YUE_UI_HTTP_CACHE_DATA } from './http.utils';
import { YueEnableCache, YueUiHttpCacheEntry } from './http.interfaces';




/**
 * YueUiHttpCache
 * Management the cache of the requests
 *
 * @export
 * @class YueUiHttpCacheService
 */
@Injectable()
export class YueUiHttpCacheService {

  /**
   * Time that's a request take to update
   *
   * @private
   * @type {number}
   * @memberof YueUiHttpCacheService
   */
  private readonly DIFF_TIME: number = 5000;

  /**
   * Define the limit that the cache can storage
   *
   * @private
   * @type {number}
   * @memberof YueUiHttpCacheService
   */
  private readonly LIMIT_CACHE_REQUEST: number = 50;

  /**
   * Creates an instance of YueUiHttpCacheService.
   *
   * @param {ApiConfig} config
   * @memberof YueUiHttpCacheService
   */
  constructor(@Inject(YUE_UI_ENABLE_CACHE_RESPONSE) private readonly isEnable: YueEnableCache) {
  }

  /**
   * Remove requests that have timed out
   *
   * @private
   * @memberof YueUiHttpCacheService
   */
  private deleteCacheTimeIsUp(): void {
    YUE_UI_HTTP_CACHE_DATA.forEach((value, key) => {
      if (new Date().getTime() - value.lastUpdated > this.DIFF_TIME) {
        YUE_UI_HTTP_CACHE_DATA.delete(key);
      }
    });
  }

  /**
   * Set a new data in the cache
   *
   * @param {string} url
   * @param {HttpResponse<any>} data
   * @memberof YueUiHttpCacheService
   */
  public setCacheData(request: HttpRequest<any>, url: string, data: HttpResponse<any>): void {
    if (`boolean` === typeof this.isEnable) {
      if (!this.isEnable) {
        return void 0;
      }
    } else if (`object` === typeof this.isEnable && !Array.isArray(this.isEnable)) {
      if (this.isEnable.condition) {
        let hasFlag = false;
        if (request.params.has(this.isEnable.flag)) {
          hasFlag = true;
        }
        if (request.headers.has(this.isEnable.flag)) {
          hasFlag = true;
        }
        if (this.isEnable.condition === 'with') {
          if (!hasFlag) {
            return void 0;
          }
        } else {
          if (hasFlag) {
            return void 0;
          }
        }
      }
    }
    this.deleteCacheTimeIsUp();
    if (YUE_UI_HTTP_CACHE_DATA.size > this.LIMIT_CACHE_REQUEST) {
      YUE_UI_HTTP_CACHE_DATA.clear();
    }
    YUE_UI_HTTP_CACHE_DATA.set(url, {
      lastUpdated: new Date().getTime(),
      data
    });
  }

  /**
   * If cached url exist return it
   *
   * @param {string} url
   * @returns {(HttpResponse<any> | null)}
   * @memberof YueUiHttpCacheService
   */
  public getCacheData(url: string): HttpResponse<any> | null {
    if (this.isEnable) {
      this.deleteCacheTimeIsUp();
      if (YUE_UI_HTTP_CACHE_DATA.has(url)) {
        const cache: YueUiHttpCacheEntry | undefined = YUE_UI_HTTP_CACHE_DATA.get(url);
        if (cache) {
          if (new Date().getTime() - cache.lastUpdated < this.DIFF_TIME) {
            return cache.data;
          }
        }
      }
    }
    return null;
  }

}
