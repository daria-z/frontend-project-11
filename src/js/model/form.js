import * as yup from 'yup'

import state from '../state.js'

const schema = yup
  .string()
  .url('notUrl')
  .required('required')
  .test('no-duplicate', 'exists', value => !state.feedsList.includes(value))

export const validateInput = async () => {
  try {
    await schema.validate(state.form.inputValue)
    state.ui.status = 'success'
    return state.form.inputValue
  }
  catch (error) {
    state.ui.status = 'error'
    state.ui.error = error.errors.join()
    throw error
  }
}

export const updateInputValue = (value) => {
  if (value === null) return
  state.form.inputValue = value
}
