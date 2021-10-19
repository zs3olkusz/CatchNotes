export function parseId(text: string): string {
  return text.split(' ').join('-');
}
