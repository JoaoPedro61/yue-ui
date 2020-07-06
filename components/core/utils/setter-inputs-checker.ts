export function setterInputChecker(ov: any, nv: any, exec: () => void): void {
  if (ov !== nv) {
    exec();
  }
}

