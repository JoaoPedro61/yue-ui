export interface BytesSize {
  type: string;
  value: number;
}

export function memorySizeOf(source: any, formatType: 1 | 2 = 1): string | BytesSize {
  let bytes = 0;

  function sizeOf(target: any): number {
    if (target !== null && target !== undefined) {
      switch (typeof target) {
        case 'number':
          bytes += 8;
          break;
        case 'string':
          bytes += target.length * 2;
          break;
        case 'boolean':
          bytes += 4;
          break;
        case 'object':
          const objClass = Object.prototype.toString.call(target).slice(8, -1);
          if (objClass === 'Object' || objClass === 'Array') {
            for (const key in target) {
              if (!target.hasOwnProperty(key)) {
                continue;
              }
              sizeOf(target[key]);
            }
          } else {
            bytes += target.toString().length * 2;
          }
          break;
      }
    }
    return bytes;
  }

  function formatByteSize(bytesSize: number): string | BytesSize {
    if (bytesSize < 1024) {
      if (formatType === 2) {
        return {
          type: `bytes`,
          value: bytesSize
        };
      }
      return bytesSize + ` bytes`;
    } else if (bytesSize < 1048576) {
      if (formatType === 2) {
        return {
          type: `KiB`,
          value: +(bytesSize / 1024).toFixed(3)
        };
      }
      return (bytesSize / 1024).toFixed(3) + ` KiB`;
    } else if (bytesSize < 1073741824) {
      if (formatType === 2) {
        return {
          type: `MiB`,
          value: +(bytesSize / 1048576).toFixed(3)
        };
      }
      return (bytesSize / 1048576).toFixed(3) + ` MiB`;
    } else {
      if (formatType === 2) {
        return {
          type: `GiB`,
          value: +(bytesSize / 1073741824).toFixed(3)
        };
      }
      return (bytesSize / 1073741824).toFixed(3) + ` GiB`;
    }
  }

  return formatByteSize(sizeOf(source));
}
