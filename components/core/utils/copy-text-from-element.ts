import { Renderer2 } from '@angular/core';



export function copyText(target: HTMLElement | string, renderer?: Renderer2, cbOk?: (value: string) => void, cbErr?: (value: string) => void): void {
  let text = '';
  if (target instanceof HTMLElement) {
    if (target.innerText) {
      text = target.innerText;
    } else if ((target as any).outerText) {
      text = (target as any).outerText;
    } else if (target.textContent) {
      text = target.textContent;
    }
  } else {
    text = target;
  }
  if (text.length) {
    if (renderer && renderer instanceof Renderer2) {
      const root = renderer.selectRootElement('body');
      if (root && root instanceof HTMLElement) {
        const element: HTMLTextAreaElement = renderer.createElement('textarea');
        element.value = text;
        renderer.setAttribute(element, 'style', `
          position: absolute;
          top: -1000px;
          left: -1000px;
        `);
        element.focus();
        element.select();
        try {
          const isOk = document.execCommand('copy');
          if (isOk) {
            if (typeof cbOk === 'function') {
              cbOk(text);
            }
          } else {
            if (typeof cbErr === 'function') {
              cbErr(text);
            }
          }
        } catch (e) {
          throw new Error(e);
        }
        renderer.removeChild(root, element);
      }
    } else {
      const root: HTMLBodyElement | null = document.querySelector('body');
      if (root) {
        const element: HTMLTextAreaElement = document.createElement('textarea');
        element.value = text;
        element.setAttribute('style', `
          position: absolute;
          top: -1000px;
          left: -1000px;
        `);
        root.appendChild(element);
        element.focus();
        element.select();
        try {
          const isOk = document.execCommand('copy');
          if (isOk) {
            if (typeof cbOk === 'function') {
              cbOk(text);
            }
          } else {
            if (typeof cbErr === 'function') {
              cbErr(text);
            }
          }
        } catch (e) {
          throw new Error(e);
        }
        element.remove();
      }
    }
  }
}

