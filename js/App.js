class App {
  constructor () {
    this.fontList = [
      "Hack",
      "Menlo",
      "Courier New",
      "Monaco",
      "Andale Mono",
      "Anonymous Pro",
      "Consola Mono",
      "Cousine",
      "DejaVu Sans Mono",
      "Fira Mono",
      "Inconsolata",
      "Input",
      "M+ 1m",
      "monofur",
      "Monoid",
      "OCR A Std",
      "Source Code Pro",
      "Ubuntu Mono",
      "Bitstream Vera Sans Mono"
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
