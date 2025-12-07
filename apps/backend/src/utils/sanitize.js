const sanitizeHtml = require("sanitize-html");

module.exports = (text) =>
  sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });
