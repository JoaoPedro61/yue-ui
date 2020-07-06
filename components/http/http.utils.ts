import { InjectionToken } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { YueEnableCache, YueUiHttpCacheData, YueProgressRequest } from './http.interfaces';


/**
 * Storage for cached requests
 */
export const YUE_UI_HTTP_CACHE_DATA: YueUiHttpCacheData = new Map();

/**
 * Token injection, used to inject tokens in external module
 */
export const YUE_UI_HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>('HTTP_DYNAMIC_INTERCEPTORS');

/**
 * Enabling the route cache
 */
export const YUE_UI_ENABLE_CACHE_RESPONSE = new InjectionToken<YueEnableCache>('ENABLE_CACHE_RESPONSE');

/**
 * Enabling the route cache
 */
export const YUE_UI_PROGRESS_REQUESTS = new InjectionToken<YueProgressRequest>('YUE_UI_PROGRESS_REQUESTS');
