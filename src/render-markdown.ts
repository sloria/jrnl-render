import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remark from "remark";
import remarkPing from "remark-ping";
import remarkRehype from "remark-rehype";

interface IOptions {
  simple?: boolean;
  tagURL?: null | ((tag: string) => string);
}
export default function renderMarkdown(
  source: string,
  { simple = false, tagURL = null }: IOptions = {}
): string {
  // If simple is true, don't use remark-ping
  const plugins = (simple
    ? []
    : [
        [
          // Use remark-ping to convert tags to links
          remarkPing,
          {
            pingUsername: () => true,
            userURL: tagURL
          }
        ]
      ]
  ).concat([remarkRehype, rehypeStringify, rehypeHighlight]);
  const remarkInst = remark().use(plugins);
  return remarkInst.processSync(source).contents;
}
