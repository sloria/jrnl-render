import slugify from "slugify";

export const slugifyEntry = entry =>
  `${formatDate(entry.date)}-${slugify(entry.title, {
    lower: true,
    remove: /[$*_+~.()'"!\-:@]/g
  })}`;
export const formatDate = date => date.toISOString().slice(0, 10); // 2020-02-23

class TimeoutError extends Error {}

const timeout = ms =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => reject(new TimeoutError()), ms);
  });

/**
 * Call showLoaderFn if promise doesn't resolve in `delay` milliseconds.
 *
 * This is useful for showing a loading indicator only for slow HTTP
 * responses (to prevent flashing content).
 */
export const delayedLoader = (promise, showLoaderFn, delay = 300) =>
  Promise.race([promise, timeout(delay)]).catch(err => {
    if (err instanceof TimeoutError) {
      return showLoaderFn();
    } else {
      throw err;
    }
  });
