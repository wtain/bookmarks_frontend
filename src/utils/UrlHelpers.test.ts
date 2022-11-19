import { processTextAndEnableLinks, processUrls } from "./UrlHelpers";

it('UrlHelpers.processUrls should recognize URLs', () => {

  const text = "Some text. https://stackoverflow.com/questions/31760030/extracting-for-url-from-string-using-regex Some text";
  const textExpected = "Some text. [###LINK###] Some text";

  const result = processUrls(text, (url: string) => {
    return "[###LINK###]";
  });
  expect(result).toBe(textExpected);
});

it('UrlHelpers.processUrls should recognize URLs for http', () => {

  const text = "Some text. http://example.com/ Some text";
  const textExpected = "Some text. [###LINK###] Some text";

  const result = processUrls(text, (url: string) => {
    return "[###LINK###]";
  });
  expect(result).toBe(textExpected);
});

it('UrlHelpers.processTextAndEnableLinks should substitute URLs', () => {

  const text = "Some text. https://stackoverflow.com/questions/31760030/extracting-for-url-from-string-using-regex Some text";
  const textExpected = "Some text. <A HREF='https://stackoverflow.com/questions/31760030/extracting-for-url-from-string-using-regex'>https://stackoverflow.com/questions/31760030/extracting-for-url-from-string-using-regex</A> Some text";

  const result = processTextAndEnableLinks(text);
  expect(result).toBe(textExpected);
});