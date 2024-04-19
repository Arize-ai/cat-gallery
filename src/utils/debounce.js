/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 * This is a tail debounce.
 * @param {(arguments) => any} fn
 * @param {number} wait
 */
function debounce(fn, wait) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, wait);
  };
}

export default debounce;

