import { sanitizeText } from "./HtmlHelpers";

it('HtmlHelpers.sanitizeText should sanitize html', () => {
  const result = sanitizeText("<H1>Sanitize!</H1>");
  expect(result).toBe("Sanitize!");
});