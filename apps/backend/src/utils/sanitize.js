import sanitizeHtml from "sanitize-html";

export default (text) =>
  sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });
