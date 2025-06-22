export const showModal = (item) => {
  const modal = document.querySelector('#modal')
  modal.classList.add('d-block', 'show')
  modal.setAttribute('aria-hidden', true)

  const modalTitle = modal.querySelector('.modal-title')
  const modalText = modal.querySelector('.modal-body')

  modalTitle.textContent = item.title
  modalText.textContent = item.description
  modal.querySelector('a').href = item.link

  const backdrop = document.createElement('div')
  backdrop.classList.add('modal-backdrop', 'fade', 'show')
  modal.before(backdrop)
}

export const closeModal = () => {
  const modal = document.querySelector('#modal')
  modal.classList.remove('d-block', 'show')
  modal.setAttribute('aria-hidden', false)

  const modalTitle = modal.querySelector('.modal-title')
  const modalText = modal.querySelector('.modal-body')

  modalTitle.textContent = ''
  modalText.textContent = ''
  modal.querySelector('a').href = '#'

  document.querySelector('.modal-backdrop').remove()
}
