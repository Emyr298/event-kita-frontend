export const isValidImageUrl = (url: string) => {
  return url.substring(0, 8) === 'https://' && (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
