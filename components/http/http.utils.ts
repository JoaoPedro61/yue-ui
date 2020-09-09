import { InjectionToken } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { YueEnableCache, YueUiHttpCacheData, YueProgressRequest, YueUiHttpHeaders } from './http.interfaces';
import { BehaviorSubject } from 'rxjs';


export const YUE_UI_HTTP_CACHE_DATA: YueUiHttpCacheData = new Map();

export const YUE_UI_HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>('HTTP_DYNAMIC_INTERCEPTORS');

export const YUE_UI_ENABLE_CACHE_RESPONSE = new InjectionToken<YueEnableCache>('ENABLE_CACHE_RESPONSE');

export const YUE_UI_PROGRESS_REQUESTS = new InjectionToken<YueProgressRequest>('YUE_UI_PROGRESS_REQUESTS');

export const YUE_UI_HTTP_HEADERS_INTERCEPTOR: YueUiHttpHeaders = new BehaviorSubject({});

export const YUE_UI_HTTP_HEADERS = new InjectionToken<YueUiHttpHeaders>(`YUE_UI_HTTP_HEADERS`);
