import i18next from '../../i18n.js'
const input = document.querySelector('#url-input')
const feedback = document.querySelector('#feedback')
const addBtn = document.querySelector('#add-feed-btn')

export const renderInputValue = (value) => {
  input.value = value
}

export const renderErrors = (error) => {
  input.classList.add('is-invalid')
  feedback.classList.add('text-danger')
  feedback.textContent = i18next.t(`errors.${error}`)
}

export const renderSuccess = () => {
  feedback.classList.add('text-success')
  feedback.textContent = i18next.t(`ui.success`)
}

export const disableForm = (shouldDisable) => {
  input.disabled = shouldDisable
  addBtn.disabled = shouldDisable
}
