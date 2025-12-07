import sanitizeHtml from 'sanitize-html.js';

module.exports = (text) =>
  sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });
