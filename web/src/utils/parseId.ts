export function parseId(text: string, id: string): string {
  return id + '-' + text.split(' ').join('-');
}
