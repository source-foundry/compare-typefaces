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

    this.variantsContainer = document.createElement('div')
    this.element.appendChild(this.variantsContainer)
    this.variants = {}

    const variants = ['regular', 'italic', 'bold', 'bold-italic']
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

    this.sizesContainer = document.createElement('div')
    this.element.appendChild(this.sizesContainer)
    this.sizes = {}
    const sizes = this.app.getSizes()
    for (const size of sizes) {
      const label = document.createElement('label')
      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      if (size >= 8 && size <= 14) {
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

  getText() {
    return this.textInput.value
  }
}
