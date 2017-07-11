class App {
  constructor () {
    this.fontList = [
      "Hack",
      "Arial",
      "Times New Roman"
    ]

    this.initInterface()
    this.initFonts()
    this.updateFonts()
    this.interface.updateVariants()
  }

  initInterface() {
    this.interface = new Interface(this)
  }

  initFonts() {
    this.fonts = []
    this.fontsContainer = document.createElement('div')
    this.fontsContainer.classList.add('fonts')
    this.fontsContainer.classList.add('semi-dark')
    document.body.appendChild(this.fontsContainer)
    for (const fontName of this.fontList) {
      const font = new Font(fontName, this.fontsContainer)
      this.fonts.push(font)
    }
  }

  updateFonts() {
    const sampleText = this.interface.getText()
    for (const font of this.fonts) {
      font.setText(sampleText)
    }
  }
}

window.addEventListener('load', function () {
  window.app = new App()
})
