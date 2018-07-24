import { renderMarkdown } from "./Markdown.jsx";

describe("renderMarkdown", () => {
  it("renders simple markdown", async () => {
    const result = await renderMarkdown("*hello*", { simple: true });
    expect(result).toMatch("<em>hello</em>");
  });

  it("renders tags", async () => {
    const result = await renderMarkdown("@javascript", {
      tagURL: tag => `/${tag}`
    });
    expect(result).toMatch('<a href="/javascript"');
  });

  it("renders multiple tags", async () => {
    const result = await renderMarkdown("I ❤️ @javascript and @python", {
      tagURL: tag => `/${tag}`
    });
    expect(result).toMatch('<a href="/javascript"');
    expect(result).toMatch('<a href="/python"');
  });
});
