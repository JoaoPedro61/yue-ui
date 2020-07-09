import { Router } from '@angular/router';




export interface ItemFindedInRouterTreeWithParentRouteConfig {
  parentRouteConfig?: any;

  [additionalProperties: string]: any;
}




export function findInRouter(router: Router, findProperty: string): ItemFindedInRouterTreeWithParentRouteConfig[] {
  const url: string = router.url;
  const segments: string[] = url.split('/');
  const pusher: any[] = [];

  function recursive_finder(config: any[], fallback?: (...args: any[]) => void): void {
    if (segments.length) {
      for (let index = 0, length = config.length; index < length; index++) {
        if (config[index].path === segments[0]) {
          segments.shift();
          if (config[index].hasOwnProperty(findProperty)) {
            const _config = config[index][findProperty];
            _config[`parentRouteConfig`] = config[index];
            pusher.push(_config);
          }
          if (config[index].hasOwnProperty('children')) {
            if (config[index].children.length && config[index].children[0].path === '') {
              segments.push('');
            }
          } else if (config[index].hasOwnProperty('_loadedConfig')) {
            if (config[index]._loadedConfig.hasOwnProperty('routes')) {
              if (config[index]._loadedConfig.routes[0].path === '') {
                segments.push('');
              }
            }
          }
        } else {
          const path: string[] = config[index].path.split('/');
          if (path.length > 1) {
            if (segments[0] === path[0]) {
              segments.shift();
              segments.shift();
              if (config[index].hasOwnProperty(findProperty)) {
                const _config = config[index][findProperty];
                _config[`parentRouteConfig`] = config[index];
                pusher.push(_config);
              }
              if (config[index].hasOwnProperty('children')) {
                if (config[index].children[0].path === '') {
                  segments.push('');
                }
              } else if (config[index].hasOwnProperty('_loadedConfig')) {
                if (config[index]._loadedConfig.hasOwnProperty('routes')) {
                  if (config[index]._loadedConfig.routes[0].path === '') {
                    segments.push('');
                  }
                }
              }
            }
          }
        }
        if (segments.length) {
          if (config[index].hasOwnProperty('children')) {
            recursive_finder(config[index].children);
          } else if (config[index].hasOwnProperty('_loadedConfig')) {
            if (config[index]._loadedConfig.hasOwnProperty('routes')) {
              recursive_finder(config[index]._loadedConfig.routes);
            }
          }
        } else {
          if (`function` === typeof fallback) {
            fallback(config[index]);
          }
        }
      }
    }
  }
  recursive_finder(router.config);
  return pusher;
}
