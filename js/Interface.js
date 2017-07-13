class Interface {
  constructor(app) {
    this.app = app
    this.initContainers()
    this.initSampleText()
    this.initPresets()
    this.initVariants()
    this.initSizes()
    this.initThemes()
    this.initResetToDefaultsButton()
  }

  initContainers() {
    this.element = document.createElement('div')
    document.body.appendChild(this.element)
    this.element.classList.add('interface')

    this.inputContainer = document.createElement('div')
    this.inputContainer.classList.add('interface-row')
    this.element.appendChild(this.inputContainer)

    this.settingsContainer = document.createElement('div')
    this.settingsContainer.classList.add('interface-row')
    this.element.appendChild(this.settingsContainer)
  }

  initSampleText() {
    this.textInputContainer = document.createElement('div')
    this.textInputContainer.classList.add('input-group')
    this.inputContainer.appendChild(this.textInputContainer)

    const title = document.createElement('div')
    title.classList.add('title')
    title.textContent = 'sample text'
    this.textInputContainer.appendChild(title)

    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    this.textInputContainer.appendChild(buttons)

    this.textInput = document.createElement('input')
    this.textInput.setAttribute('type', 'text')
    this.textInput.setAttribute('size', 32)
    this.textInput.value = this.app.settings.get('sample')
    this.textInputContainer.appendChild(this.textInput)
    this.textInput.addEventListener('input', () => this.app.updateFonts())
  }

  setSampleText(text) {
    this.textInput.value = text
    this.app.settings.set('sample', text)
  }

  getSampleText() {
    return this.textInput.value
  }

  initVariants() {
    this.variantsContainer = document.createElement('div')
    this.variantsContainer.classList.add('input-group')
    this.settingsContainer.appendChild(this.variantsContainer)

    const title = document.createElement('div')
    title.classList.add('title')
    title.textContent = 'variants'
    this.variantsContainer.appendChild(title)

    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    this.variantsContainer.appendChild(buttons)

    this.variants = {}
    const variants = this.app.getFontVariants()
    const config = this.app.settings.get('variants').split(',')
    for (const variant of variants) {
      const label = document.createElement('label')
      label.classList.add('button')
      label.classList.add('icon')
      label.classList.add('icon-variant')
      label.classList.add(variant)
      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      if (config.includes(variant)) {
        checkbox.checked = true
      }
      label.appendChild(checkbox)
      const span = document.createElement('span')
      span.textContent = variant
      label.appendChild(span)
      buttons.appendChild(label)
      checkbox.addEventListener('change', () => {
        this.updateVariants()
      })
      this.variants[variant] = checkbox
    }
  }

  updateVariants() {
    let setting = []
    for (const variant in this.variants) {
      const checkbox = this.variants[variant]
      if (checkbox.checked) {
        this.app.fontsContainer.classList.add(variant)
        setting.push(variant)
      } else {
        this.app.fontsContainer.classList.remove(variant)
      }
    }
    this.app.settings.set('variants', setting.join(','))
  }

  initSizes() {
    this.sizesContainer = document.createElement('div')
    this.sizesContainer.classList.add('input-group')
    this.settingsContainer.appendChild(this.sizesContainer)

    const title = document.createElement('div')
    title.classList.add('title')
    title.textContent = 'sizes'
    this.sizesContainer.appendChild(title)

    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    this.sizesContainer.appendChild(buttons)

    this.sizes = {}
    const sizes = this.app.getSizes()
    const config = this.app.settings.get('sizes').split(',').map(size => parseInt(size, 10))
    for (const size of sizes) {
      const label = document.createElement('label')
      label.classList.add('button')
      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      if (config.includes(size)) {
        checkbox.checked = true
      }
      label.appendChild(checkbox)
      const span = document.createElement('span')
      span.textContent = size
      label.appendChild(span)
      buttons.appendChild(label)
      checkbox.addEventListener('change', () => {
        this.updateSizes()
      })
      this.sizes[size] = checkbox
    }
  }

  updateSizes() {
    let setting = []
    for (const size in this.sizes) {
      const checkbox = this.sizes[size]
      const className = 'size-' + size
      if (checkbox.checked) {
        this.app.fontsContainer.classList.add(className)
        setting.push(size)
      } else {
        this.app.fontsContainer.classList.remove(className)
      }
    }
    this.app.settings.set('sizes', setting.join(','))
  }

  initThemes() {
    this.currentTheme = this.app.settings.get('theme')
    this.themesContainer = document.createElement('div')
    this.themesContainer.classList.add('input-group')
    this.settingsContainer.appendChild(this.themesContainer)

    const title = document.createElement('div')
    title.classList.add('title')
    title.textContent = 'theme'
    this.themesContainer.appendChild(title)

    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    this.themesContainer.appendChild(buttons)

    this.themes = {}
    const themes = this.app.getThemes()
    for (const theme of themes) {
      const label = document.createElement('label')
      label.classList.add('button')
      label.classList.add('icon')
      label.classList.add('icon-theme')
      label.classList.add(theme)
      const radiobutton = document.createElement('input')
      radiobutton.setAttribute('type', 'radio')
      radiobutton.setAttribute('name', 'theme')
      if (theme == this.currentTheme) {
        radiobutton.checked = true
      }
      label.appendChild(radiobutton)
      const span = document.createElement('span')
      span.textContent = theme
      label.appendChild(span)
      buttons.appendChild(label)
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
    this.app.settings.set('theme', newTheme)
  }

  initPresets() {
    this.presetsContainer = document.createElement('div')
    this.presetsContainer.classList.add('input-group')
    this.inputContainer.appendChild(this.presetsContainer)

    const title = document.createElement('div')
    title.classList.add('title')
    title.textContent = 'character presets -- click to replace sample text -- shift+click to append to sample text'
    this.presetsContainer.appendChild(title)

    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    this.presetsContainer.appendChild(buttons)

    const presets = this.app.getPresets()
    for (const preset of presets) {
      const button = document.createElement('button')
      buttons.appendChild(button)
      button.textContent = preset
      button.addEventListener('click', event => {
        let text = event.target.textContent
        if (event.shiftKey) {
          text = this.getSampleText() + ' ' + text
        }
        this.setSampleText(text)
        this.app.updateFonts()
      })
    }
  }

  initResetToDefaultsButton() {
    this.resetContainer = document.createElement('div')
    this.resetContainer.classList.add('input-group')
    this.settingsContainer.appendChild(this.resetContainer)

    const title = document.createElement('div')
    title.classList.add('title')
    title.textContent = 'actions'
    this.resetContainer.appendChild(title)

    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    this.resetContainer.appendChild(buttons)

    this.resetButton = document.createElement('button')
    this.resetButton.textContent = 'Reset to defaults'
    this.resetButton.addEventListener('click', function() {
      window.localStorage.clear()
      document.location.reload()
    })
    buttons.appendChild(this.resetButton)
  }
}
