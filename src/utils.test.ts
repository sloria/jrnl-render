import { delayedLoader, slugifyEntry } from "./utils";

describe("slugifyEntry", () => {
  it("should slugify an entry", () => {
    const entry = {
      body: "",
      date: new Date(2020, 0, 23),
      slug: "",
      title: "Foo Bar Baz"
    };
    const result = slugifyEntry(entry);
    expect(result).toBe("2020-01-23-foo-bar-baz");
  });

  it("should remove quotes", () => {
    const entry = {
      body: "",
      date: new Date(2020, 0, 23),
      slug: "",
      title: "'Foo' \"Bar\" Baz"
    };
    const result = slugifyEntry(entry);
    expect(result).toBe("2020-01-23-foo-bar-baz");
  });
});

describe("delayedLoader", () => {
  it("should resolve if load fn is faster than delay", async () => {
    const promise = Promise.resolve("data!");
    const showLoaderFn = jest.fn();
    const result = await delayedLoader(promise, showLoaderFn, 10);
    expect(result).toBe("data!");
    expect(showLoaderFn).toHaveBeenCalledTimes(0);
  });

  it("should call showLoaderFn if load fn is slower than delay", async () => {
    const promise = new Promise(resolve => {
      setTimeout(resolve, 20, "data!");
    });
    const showLoaderFn = jest.fn();
    await delayedLoader(promise, showLoaderFn, 10);
    expect(showLoaderFn).toHaveBeenCalledTimes(1);
  });

  it("should reject if load fn rejects", async () => {
    expect.assertions(1);
    const promise = Promise.reject(new Error("oh no!"));
    const showLoaderFn = jest.fn();
    try {
      await delayedLoader(promise, showLoaderFn, 10);
    } catch (err) {
      expect(err.message).toMatch("oh no!");
    }
  });
});
