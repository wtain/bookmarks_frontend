
export function processUrls(text: string, visitor: (url: string) => string): string {
  const regex = /(https?:\/\/[^/]+(\/[\w-]*)+)/gm;

  return text.replaceAll(regex, (substring: string) => {
    return visitor(substring);
  });
}

export function processTextAndEnableLinks(text: string) {
  // todo: load target title, validate url works
  // todo: security concerns?
  return processUrls(text, (url: string) => {
    return `<A HREF='${url}'>${url}</A>`;
  })
    .replaceAll("\n", "<BR>");
}