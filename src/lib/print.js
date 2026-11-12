// Imprime un único documento de la página usando window.print().
// Marca el elemento y el body con clases que activan los estilos @media print.
export function printElement(element) {
  if (!element) return
  element.classList.add('is-printing')
  document.body.classList.add('printing-document')

  const cleanup = () => {
    element.classList.remove('is-printing')
    document.body.classList.remove('printing-document')
    window.removeEventListener('afterprint', cleanup)
  }

  window.addEventListener('afterprint', cleanup)
  window.print()
}
