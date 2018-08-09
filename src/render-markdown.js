import remark from "remark";
import remarkPing from "remark-ping";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

export default function renderMarkdown(
  source,
  { simple = false, tagURL = null } = {}
) {
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
