import slugify from "slugify";
import { IEntry } from "./constants";

export const slugifyEntry = (entry: IEntry): string =>
  `${formatDate(entry.date)}-${slugify(entry.title, {
    lower: true,
    remove: /[$*_+~.()'"!\-:@=]/g
  })}`;
export const formatDate = (date: Date): string =>
  date.toISOString().slice(0, 10); // 2020-02-23

// NOTE: Defining this in ES5 due to
// a peculiarity in Babel that breaks
// instanceof usage with custom errors
// https://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node/33877501#comment77815293_33877501
function TimeoutError() {
  const message = "Timeout expired";
  Error.call(this, message);
  this.message = message;
}

const timeout = (ms: number): Promise<any> =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => reject(new TimeoutError()), ms);
  });

/**
 * Call showLoaderFn if promise doesn't resolve in `delay` milliseconds.
 *
 * This is useful for showing a loading indicator only for slow HTTP
 * responses (to prevent flashing content).
 */
export const delayedLoader = (
  promise: Promise<any>,
  showLoaderFn: () => void,
  delay: number
): Promise<any> =>
  Promise.race([promise, timeout(delay)]).catch(err => {
    if (err instanceof TimeoutError) {
      return showLoaderFn();
    } else {
      throw err;
    }
  });
