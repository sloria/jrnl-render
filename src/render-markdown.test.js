import renderMarkdown from "./render-markdown";

describe("renderMarkdown", () => {
  it("renders simple markdown", () => {
    const result = renderMarkdown("*hello*", { simple: true });
    expect(result).toMatch("<em>hello</em>");
  });

  it("renders tags", () => {
    const result = renderMarkdown("@javascript", {
      tagURL: tag => `/${tag}`
    });
    expect(result).toMatch('<a href="/javascript"');
  });

  it("renders multiple tags", () => {
    const result = renderMarkdown("I ❤️ @javascript and @python", {
      tagURL: tag => `/${tag}`
    });
    expect(result).toMatch('<a href="/javascript"');
    expect(result).toMatch('<a href="/python"');
  });
});
