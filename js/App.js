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
    console.log(this)
  }

  initInterface() {
    this.interface = new Interface(this)
  }

  initFonts() {
    this.fonts = []
    this.fontContainer = document.createElement('div')
    this.fontContainer.classList.add('semi-dark')
    document.body.appendChild(this.fontContainer)
    for (const fontName of this.fontList) {
      const font = new Font(fontName, this.fontContainer)
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
