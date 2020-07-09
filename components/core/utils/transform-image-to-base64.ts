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
