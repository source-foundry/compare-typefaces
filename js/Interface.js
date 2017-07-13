class Interface {
  constructor(app) {
    this.app = app

    this.element = document.createElement('div')
    document.body.appendChild(this.element)
    this.element.classList.add('interface')

    this.textInput = document.createElement('input')
    this.textInput.setAttribute('type', 'text')
    this.textInput.value = this.app.settings.get('sample')
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
    const config = this.app.settings.get('variants').split(',')
    for (const variant of variants) {
      const label = document.createElement('label')
      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      if (config.includes(variant)) {
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
    this.element.appendChild(this.sizesContainer)
    this.sizes = {}
    const sizes = this.app.getSizes()
    const config = this.app.settings.get('sizes').split(',').map(size => parseInt(size, 10))
    for (const size of sizes) {
      const label = document.createElement('label')
      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      if (config.includes(size)) {
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
    this.app.settings.set('theme', newTheme)
  }

  setText(text) {
    this.textInput.value = text
    this.app.settings.set('sample', text)
  }

  getText() {
    return this.textInput.value
  }
}
