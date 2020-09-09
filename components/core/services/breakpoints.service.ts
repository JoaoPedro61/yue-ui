import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { YueUiResizeService } from './resize.service';
import { BreakpointBooleanMap, BreakpointMap, gridResponsiveMap, YueUiBreakpointEnum } from './utils';




@Injectable({
  providedIn: 'root'
})
export class YueUiBreakpointsService {


  constructor(private readonly service: YueUiResizeService, private readonly mm: MediaMatcher) {
    this.service.subscribe().subscribe(() => {});
  }

  public subscribe(breakpointMap: BreakpointMap): Observable<YueUiBreakpointEnum>;
  public subscribe(breakpointMap: BreakpointMap, fullMap: true): Observable<BreakpointBooleanMap>;
  public subscribe(breakpointMap: BreakpointMap, fullMap?: true): Observable<YueUiBreakpointEnum | BreakpointBooleanMap> {
    if (fullMap) {
      const get = () => this.matchMedia(breakpointMap, true);
      return this.service.subscribe().pipe(
        map(get),
        startWith(get()),
        distinctUntilChanged((x: [YueUiBreakpointEnum, BreakpointBooleanMap], y: [YueUiBreakpointEnum, BreakpointBooleanMap]) => x[0] === y[0]),
        map(x => x[1])
      );
    } else {
      const get = () => this.matchMedia(breakpointMap);
      return this.service.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged());
    }
  }

  private matchMedia(breakpointMap: BreakpointMap): YueUiBreakpointEnum;
  private matchMedia(breakpointMap: BreakpointMap, fullMap: true): [YueUiBreakpointEnum, BreakpointBooleanMap];
  private matchMedia(breakpointMap: BreakpointMap, fullMap?: true): YueUiBreakpointEnum | [YueUiBreakpointEnum, BreakpointBooleanMap] {
    let bp = YueUiBreakpointEnum.md;

    const breakpointBooleanMap: Partial<BreakpointBooleanMap> = {};

    Object.keys(breakpointMap).map(breakpoint => {
      const castBP = breakpoint as YueUiBreakpointEnum;
      const matched = this.mm.matchMedia(gridResponsiveMap[castBP]).matches;

      breakpointBooleanMap[breakpoint as YueUiBreakpointEnum] = matched;

      if (matched) {
        bp = castBP;
      }
    });

    if (fullMap) {
      return [bp, breakpointBooleanMap as BreakpointBooleanMap];
    } else {
      return bp;
    }
  }

}
