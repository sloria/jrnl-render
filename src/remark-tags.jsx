/**
 * Remark AST plugin to transform @tag into a link
 *
 * NOTE: We can't use remark-ping because it react-markdown
 * only supports parser plugins:
 * https://github.com/rexxars/react-markdown/issues/188
 */
import React from "react";
import visit from "unist-util-visit";
import t from "prop-types";

export const Ping = ({ value, onClick }) => {
  const handleClick = e => onClick(value, e);
  return (
    <a onClick={handleClick} href="#">
      {value}
    </a>
  );
};
Ping.propTypes = {
  value: t.string,
  onClick: t.function
};

const TAG_REGEX = /@(?:\*\*([^*]+)\*\*|(\w+))/;

export default function tags({ onClick }) {
  function transformer(tree) {
    visit(tree, "text", (node, index, parent) => {
      if (parent.type !== "link" && TAG_REGEX.test(node.value)) {
        parent.children[index] = {
          type: "ping",
          value: node.value,
          onClick: onClick,
          children: [node],
          position: node.position
        };
      }
    });
    return tree;
  }

  return transformer;
}
