import slugify from "slugify";

export const slugifyEntry = entry =>
  `${formatDate(entry.date)}-${slugify(entry.title, {
    lower: true,
    remove: /[$*_+~.()'"!\-:@]/g
  })}`;
export const formatDate = date => date.toISOString().slice(0, 10); // 2020-02-23
