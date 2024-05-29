const $form = document.querySelector('#form')
const $textError = document.querySelectorAll('.text-error')
const $btnSubmit = document.querySelector('#btn-submit')
const $alertCard = document.querySelector('.alert')
let showSubmitError = false

$form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData($form)

  if (!data.has('config') || !data.has('querytype')) {
    showSubmitError = true
    $textError.forEach((el) => el.classList.add('show-error'))
    return
  }

  for (const value of data.values()) {
    if (value === '') {
      showSubmitError = true
      $textError.forEach((el) => el.classList.add('show-error'))
      return
    }
  }

  if (showSubmitError) {
    showSubmitError = false
    $textError.forEach((el) => el.classList.remove('show-error'))
  }

  ToggleEnabledForm($form)
  $btnSubmit.innerHTML = 'Enviando...'

  setTimeout(() => {
    $alertCard.classList.add('show-alert')
  }, 2000)

  setTimeout(() => {
    $form.reset()
    $btnSubmit.innerHTML = 'Submit'
    ToggleEnabledForm($form)
  }, 3000)

  setTimeout(() => {
    $alertCard.classList.remove('show-alert')
  }, 5000)
})

function ToggleEnabledForm(form) {
  Array.from(form.elements).forEach((formElement) => {
    formElement.disabled = !formElement.disabled
    formElement.classList.toggle('disabled')
  })
}
