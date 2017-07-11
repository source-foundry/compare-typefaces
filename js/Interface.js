class Interface {
  constructor(app) {
    this.app = app

    this.element = document.createElement('div')
    document.body.appendChild(this.element)
    this.element.classList.add('interface')

    this.textInput = document.createElement('input')
    this.textInput.setAttribute('type', 'text')
    this.textInput.value = 'DO08B &86 OQ 1lI ., :; C({['
    this.element.appendChild(this.textInput)
    this.textInput.addEventListener('input', () => this.app.updateFonts())
  }

  getText() {
    return this.textInput.value
  }
}
