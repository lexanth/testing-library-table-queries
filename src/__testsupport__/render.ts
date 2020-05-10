export const render = (content: string) => {
  const div = document.createElement('div')
  div.innerHTML = content
  return div
}
