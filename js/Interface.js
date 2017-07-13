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

    this.initVariants()
    this.initSizes()
    this.initThemes()

    this.presetsContainer = document.createElement('div')
    this.element.appendChild(this.presetsContainer)
    const presets = this.app.getPresets()
    for (const preset of presets) {
      const button = document.createElement('button')
      this.presetsContainer.appendChild(button)
      button.textContent = preset
      button.addEventListener('click', event => {
        let text = event.target.textContent
        if (event.shiftKey) {
          text = this.getText() + ' ' + text
        }
        this.setText(text)
        this.app.updateFonts()
      })
    }
  }

  initVariants() {
    this.variantsContainer = document.createElement('div')
    this.element.appendChild(this.variantsContainer)
    this.variants = {}
    const variants = this.app.getFontVariants()
    for (const variant of variants) {
      const label = document.createElement('label')
      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      if (variant !== 'bold-italic') {
        checkbox.checked = true
      }
      label.appendChild(checkbox)
      const text = document.createTextNode(variant)
      label.appendChild(text)
      this.variantsContainer.appendChild(label)
      checkbox.addEventListener('change', () => {
        this.updateVariants()
      })
      this.variants[variant] = checkbox
    }
  }

  updateVariants() {
    for (const variant in this.variants) {
      const checkbox = this.variants[variant]
      if (checkbox.checked) {
        this.app.fontsContainer.classList.add(variant)
      } else {
        this.app.fontsContainer.classList.remove(variant)
      }
    }
  }

  initSizes() {
    this.sizesContainer = document.createElement('div')
    this.element.appendChild(this.sizesContainer)
    this.sizes = {}
    const sizes = this.app.getSizes()
    for (const size of sizes) {
      const label = document.createElement('label')
      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      if (size >= 9 && size <= 15 && size % 2) {
        checkbox.checked = true
      }
      label.appendChild(checkbox)
      const text = document.createTextNode(size + 'px')
      label.appendChild(text)
      this.sizesContainer.appendChild(label)
      checkbox.addEventListener('change', () => {
        this.updateSizes()
      })
      this.sizes[size] = checkbox
    }
  }

  updateSizes() {
    for (const size in this.sizes) {
      const checkbox = this.sizes[size]
      const className = 'size-' + size
      if (checkbox.checked) {
        this.app.fontsContainer.classList.add(className)
      } else {
        this.app.fontsContainer.classList.remove(className)
      }
    }
  }

  initThemes() {
    this.currentTheme = 'semi-dark'
    this.themesContainer = document.createElement('div')
    this.element.appendChild(this.themesContainer)
    this.themes = {}
    const themes = this.app.getThemes()
    for (const theme of themes) {
      const label = document.createElement('label')
      const radiobutton = document.createElement('input')
      radiobutton.setAttribute('type', 'radio')
      radiobutton.setAttribute('name', 'theme')
      if (theme == this.currentTheme) {
        radiobutton.checked = true
      }
      label.appendChild(radiobutton)
      const text = document.createTextNode(theme)
      label.appendChild(text)
      this.themesContainer.appendChild(label)
      radiobutton.addEventListener('change', () => {
        this.updateTheme()
      })
      this.themes[theme] = radiobutton
    }
  }

  updateTheme() {
    const newTheme = this.app.getThemes().reduce((value, theme) => {
      if (this.themes[theme].checked) {
        return theme
      } else {
        return value
      }
    })
    this.app.fontsContainer.classList.remove(this.currentTheme)
    this.app.fontsContainer.classList.add(newTheme)
    this.currentTheme = newTheme
  }

  setText(text) {
    this.textInput.value = text
  }

  getText() {
    return this.textInput.value
  }
}
