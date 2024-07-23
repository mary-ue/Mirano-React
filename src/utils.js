export const getValidFilters = (filters) => {
  const validFilters = {};

  for (const key in filters) {
    if (Object.hasOwnProperty.call(filters, key) && filters[key]) {
      validFilters[key] = filters[key];
    }
  }

  return validFilters;
};

export const debounce = (fn, msec = 300) => {
  let lastCall = 0;
  let lastCallTimer = 0;

  return (...arg) => {
    const prevCall = lastCall;
    lastCall = Date.now();

    if (prevCall && lastCall - prevCall <= msec) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => {
      fn(...arg);
    }, msec);
  };
};

export const isNumber = (n) => !isNaN(parseInt(n) && isFinite(n));

export const adjustElementPosition = (element, count = 0) => {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  if (rect.left < 0) {
    element.style.cssText = `
      left: 0;
      right: auto;
      transform: translateX(0)
    `;
  } else if (rect.right > viewportWidth) {
    element.style.cssText = `
      left: auto;
      right: 0;
      transform: translateX(0)
    `;
  } else {
    element.style.cssText = `
      left: 50%;
      right: auto;
      transform: translateX(-50%)
    `;
  }

  const postRect = element.getBoundingClientRect();

  if ((postRect.left < 0 || postRect.right > viewportWidth) && count > 3) {
    adjustElementPosition(element, ++count);
  }
};
