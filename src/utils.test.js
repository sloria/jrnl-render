import { slugifyEntry } from "./utils";

describe("slugifyEntry", () => {
  it("should slugify an entry", () => {
    const entry = {
      title: "Foo Bar Baz",
      date: new Date(2020, 0, 23)
    };
    const result = slugifyEntry(entry);
    expect(result).toBe("2020-01-23-foo-bar-baz");
  });
});
