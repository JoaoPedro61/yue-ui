/**
 * Try to create an image from the previous src parameter,
 * if everything happens, the function returns an image
 * in Base64, in case of error, the screen will be created
 * with parameters such as passed parameters, so that it is
 * always possible to render an image
 *
 * @usageNotes
 *
 * If the image gave an error when trying to rederize it,
 * a base64 of an image will be returned with a "?" in the center,
 * which is our second parameter, with a white background,
 * which is our third parameter, with the black color
 * font that is our fourth parameter. It is also possible
 * to pass the font size in the fifth parameter, as well
 * as the fontWeight in the sixth parameter
 *
 * ```typescript
 * transformImageToBase64('path/to/your/image', '?', '#fff', '#000').then(function (base64) {
 *   ...
 * });
 * ```
 *
 * @param {string} src Path of yout image
 * @param {string} [initials='?'] Text that will be rendered if it is not possible to load the image
 * @param {string} [background='#fff'] Background color of the image if it is not possible to render the original image
 * @param {string} [color='#f22'] Text color
 * @param {number} [fontSize=50] Text size
 * @param {(string | number)} [fontWeight='bold'] FontWeight
 * @export
 * @returns {Promise<any>}
 */
export function transformImageToBase64(src: string, initials: string = '?', background: string = '#fff', color: string = '#f22', fontSize: number = 50, fontWeight: string | number = 'bold', rejectReplaceImage: boolean = false): Promise<string> {
  return new Promise((accept, reject) => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    let width = 200;
    let height = 200;
    if (src && src.length) {
      const image = new Image();
      image.setAttribute(`crossorigin`, `anonymous`);
      (image as any).onload = function (this: HTMLImageElement) {
        width = this.width;
        height = this.height;
        canvas.setAttribute('width', `${width}`);
        canvas.setAttribute('height', `${height}`);
        if (context) {
          context.drawImage(this, 0, 0);
        }
        new Promise((continueAccept) => {
          continueAccept(canvas.toDataURL());
        }).then((dataUrl) => {
          accept(dataUrl as unknown as string);
        });
      };
      image.onerror = (): void => {
        if (rejectReplaceImage) {
          reject();
          return void 0;
        }
        canvas.setAttribute('width', `${width}`);
        canvas.setAttribute('height', `${height}`);
        if (context) {
          context.fillStyle = background;
          context.fillRect(0, 0, width, height);
          context.fillStyle = color;
          context.font = `normal normal ${fontWeight} ${(width / 100) *
            fontSize}px arial`;
          context.textAlign = 'center';
          context.fillText(
            initials,
            width / 2,
            height / 2 + (((width / 100) * fontSize) / 2 - 10)
          );
          new Promise((continueAccept) => {
            continueAccept(canvas.toDataURL());
          }).then((dataUrl) => {
            accept(dataUrl as unknown as string);
          });
        }
      };
      image.src = src;
    } else {
      canvas.setAttribute('width', `${width}`);
      canvas.setAttribute('height', `${height}`);
      if (context) {
        context.fillStyle = background;
        context.fillRect(0, 0, width, height);
        context.fillStyle = color;
        context.font = `normal normal ${fontWeight} ${(width / 100) *
          fontSize}px arial`;
        context.textAlign = 'center';
        context.fillText(
          initials,
          width / 2,
          height / 2 + (((width / 100) * fontSize) / 2 - 17)
        );
        new Promise((continueAccept) => {
          continueAccept(canvas.toDataURL());
        }).then((dataUrl) => {
          accept(dataUrl as unknown as string);
        });
      }
    }
  });
}
