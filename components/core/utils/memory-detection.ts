/**
 * @ignore
 */
(() => {
  const MAX_MEMORY_LIMIT = 4345298944;
  const MAX_PERCENT_THRESHOLD = 100;
  const TIMEOUT_SPEED_LOG = 1000;
  if (!window.performance || !(window.performance as any).memory || !window.requestAnimationFrame) {
    setTimeout(console.log.bind(console, `%cYour browser does not support memory usage detection!`, `
      color: #ff0000;
      font-size: 2rem;
    `));
    return void 0;
  }
  let hasAlarmed = false;
  let timerId: any = null;
  /**
   * @ignore
   */
  const frame = () => {
    if (!timerId) {
      timerId = setTimeout(() => {
        if ((performance as any).memory.usedJSHeapSize > MAX_MEMORY_LIMIT) {
          hasAlarmed = true;
          const overage = (performance as any).memory.usedJSHeapSize - MAX_MEMORY_LIMIT;
          console.table([
            {
              'Javascript heap memory used(bytes)': (performance as any).memory.totalJSHeapSize + ` bytes`,
              'Javascript heap memory used(%)': ((((performance as any).memory.totalJSHeapSize / (performance as any).memory.jsHeapSizeLimit) * 100)).toFixed(2) + `%`,
              'Current heap javascript memory(bytes)': (performance as any).memory.usedJSHeapSize + ` bytes`,
              'Current heap javascript memory(%)': ((((performance as any).memory.usedJSHeapSize / (performance as any).memory.jsHeapSizeLimit) * 100)).toFixed(2) + `%`,
            }
          ]);
          console.error(new Error('Exceeded memory maximum limit by ' + overage + ' bytes'));
        }
        if ((performance as any).memory.usedJSHeapSize > (MAX_PERCENT_THRESHOLD / 100) * (performance as any).memory.jsHeapSizeLimit) {
          hasAlarmed = true;
          console.table([
            {
              'Javascript heap memory used(bytes)': (performance as any).memory.totalJSHeapSize + ` bytes`,
              'Javascript heap memory used(%)': ((((performance as any).memory.totalJSHeapSize / (performance as any).memory.jsHeapSizeLimit) * 100)).toFixed(2) + `%`,
              'Current heap javascript memory(bytes)': (performance as any).memory.usedJSHeapSize + ` bytes`,
              'Current heap javascript memory(%)': ((((performance as any).memory.usedJSHeapSize / (performance as any).memory.jsHeapSizeLimit) * 100)).toFixed(2) + `%`,
            }
          ]);
          console.error(new Error('Memory usage exceeded ' + MAX_PERCENT_THRESHOLD + '% of maximum: ' + (performance as any).memory.jsHeapSizeLimit));
        }
        if ((performance as any).memory.usedJSHeapSize) {
          console.table([
            {
              'Javascript heap memory used(bytes)': (performance as any).memory.totalJSHeapSize + ` bytes`,
              'Javascript heap memory used(%)': ((((performance as any).memory.totalJSHeapSize / (performance as any).memory.jsHeapSizeLimit) * 100)).toFixed(2) + `%`,
              'Current heap javascript memory(bytes)': (performance as any).memory.usedJSHeapSize + ` bytes`,
              'Current heap javascript memory(%)': ((((performance as any).memory.usedJSHeapSize / (performance as any).memory.jsHeapSizeLimit) * 100)).toFixed(2) + `%`,
            }
          ]);
        }
        if (!hasAlarmed) {
          window.requestAnimationFrame(frame);
        }
        timerId = null;
      }, TIMEOUT_SPEED_LOG);
    }
  };
  window.requestAnimationFrame(frame);
})();
