import sanitizeHtml from "sanitize-html";

export function sanitizeText(text: string){
  return sanitizeHtml(text, {
    allowedTags: ['br', 'b', 'a', 'img']
  });
}