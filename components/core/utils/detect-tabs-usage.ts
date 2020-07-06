// tslint:disable: variable-name
// tslint:disable: only-arrow-functions
// tslint:disable: space-before-function-paren
// tslint:disable: prefer-const


/**
 * @ignore
 */
type PageVisibilityCheck = false | {
  hidden: string;
  handler: string;
};

/**
 * @ignore
 */
manageWindowCrash();

/**
 * @ignore
 */
const CURRENT_WINDOW_ID = Date.now().toString();

/**
 * @ignore
 */
const TIME_PERIOD = 3000;

/**
 * @ignore
 */
const PV_API: PageVisibilityCheck = pageVisibilityAPICheck();

/**
 * @ignore
 */
function pageVisibilityAPICheck(): PageVisibilityCheck {
  let page_visibility_API: boolean | string = false;
  let visibility_change_handler: boolean | string = false;
  if ('hidden' in document) {
    page_visibility_API = 'hidden';
    visibility_change_handler = 'visibilitychange';
  } else {
    let prefixes = ['webkit', 'moz', 'ms', 'o'];
    for (let i = 0, l = prefixes.length; i < l; i++) {
      if ((prefixes[i] + 'Hidden') in document) {
        page_visibility_API = prefixes[i] + 'Hidden';
        visibility_change_handler = prefixes[i] + 'visibilitychange';
      }
    }
  }
  if (!page_visibility_API) {
    return false;
  }
  return {
    hidden: page_visibility_API + ``,
    handler: visibility_change_handler + ``
  };
}

if (PV_API) {
  document.addEventListener(PV_API.handler, function () {
    if ((document as any)[PV_API.hidden]) {
      removeFromActiveWindows(CURRENT_WINDOW_ID);
    } else {
      checkCurrentWindowStatus();
    }
  }, false);
}

addToMainWindowsList(CURRENT_WINDOW_ID);

localStorage.active_window = CURRENT_WINDOW_ID;

window.addEventListener('beforeunload', function () {
  removeFromMainWindowsList(CURRENT_WINDOW_ID);
});

/**
 * @ignore
 */
function addToMainWindowsList(window_id: string): string[] {
  let temp_main_windows_list = getMainWindowsList();
  let index = temp_main_windows_list.indexOf(window_id);
  if (index < 0) {
    temp_main_windows_list.push(window_id);
  }
  localStorage.main_windows = temp_main_windows_list.join(`,`);
  return temp_main_windows_list;
}

/**
 * @ignore
 */
function getMainWindowsList(): string[] {
  let temp_main_windows_list = [];
  if (localStorage.main_windows) {
    temp_main_windows_list = (localStorage.main_windows).split(`,`);
  }
  return temp_main_windows_list;
}

/**
 * @ignore
 */
function removeFromMainWindowsList(window_id: string) {
  let temp_main_windows_list = [];
  if (localStorage.main_windows) {
    temp_main_windows_list = (localStorage.main_windows).split(`,`);
  }
  let index = temp_main_windows_list.indexOf(window_id);
  if (index > -1) {
    temp_main_windows_list.splice(index, 1);
  }
  localStorage.main_windows = temp_main_windows_list.join(`,`);
  removeFromActiveWindows(window_id);
  return temp_main_windows_list;
}

/**
 * @ignore
 */
function getActiveWindowsList() {
  let temp_active_windows_list = [];
  if (localStorage.actived_windows) {
    temp_active_windows_list = (localStorage.actived_windows).split(`,`);
  }
  return temp_active_windows_list;
}

/**
 * @ignore
 */
function removeFromActiveWindows(window_id: any) {
  let temp_active_windows_list = getActiveWindowsList();
  let index = temp_active_windows_list.indexOf(window_id);
  if (index > -1) {
    temp_active_windows_list.splice(index, 1);
  }
  localStorage.actived_windows = temp_active_windows_list.join(`,`);
  return temp_active_windows_list;
}

/**
 * @ignore
 */
function addToActiveWindows(window_id: any) {
  let temp_active_windows_list = getActiveWindowsList();
  let index = temp_active_windows_list.indexOf(window_id);
  if (index < 0) {
    temp_active_windows_list.push(window_id);
  }
  localStorage.actived_windows = temp_active_windows_list.join(`,`);
  return temp_active_windows_list;
}

/**
 * @ignore
 */
function manageWindowCrash() {
  if (localStorage.last_update) {
    if (parseInt(localStorage.last_update, 10) + (TIME_PERIOD * 2) < Date.now()) {
      localStorage.removeItem('main_windows');
      localStorage.removeItem('actived_windows');
      localStorage.removeItem('active_window');
      localStorage.removeItem('last_update');
      location.reload();
    }
  }
}

/**
 * @ignore
 */
function checkCurrentWindowStatus() {
  manageWindowCrash();
  if (PV_API) {
    let active_status = `Inactive`;
    let windows_list = getMainWindowsList();
    let active_windows_list = getActiveWindowsList();
    if (windows_list.indexOf(localStorage.active_window) < 0) {
      localStorage.active_window = windows_list[windows_list.length - 1];
    }
    if (!(document as any)[PV_API.hidden]) {
      localStorage.active_window = CURRENT_WINDOW_ID;
    }
    if (localStorage.active_window === CURRENT_WINDOW_ID) {
      active_status = `Active`;
    }
    if (active_status === `Active`) {
      active_windows_list = addToActiveWindows(CURRENT_WINDOW_ID);
    } else {
      active_windows_list = removeFromActiveWindows(CURRENT_WINDOW_ID);
    }
    let element_holder = document.getElementById(`holder_element`);
    if (element_holder) {
      element_holder.insertAdjacentHTML(`afterbegin`, `<div>` + element_holder.childElementCount + `) Current Windows is ` + active_status + `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` + active_windows_list.length + ` window(s) is visible and active of ` + windows_list.length + ` windows</div>`);
    }
  } else {
    console.log(`PageVisibility API is not supported :(`);
  }
  localStorage.last_update = Date.now();
}

setInterval(function () {
  checkCurrentWindowStatus();
}, TIME_PERIOD);

checkCurrentWindowStatus();
