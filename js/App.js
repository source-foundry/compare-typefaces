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

    this.fontVariants = [
      'regular',
      'italic',
      'bold',
      'bold-italic'
    ]

    this.presets = [
      "DO08B",
      "&86",
      "OQ",
      "1lI",
      "jilL",
      ".,",
      ":;",
      "C({[",
      "-~¬–—",
      "b65S$",
      "2Z7",
      "AR",
      "9gq",
      "oa",
      "ce",
      "@©",
      "/|¦\\",
      "`'’\""
    ]

    this.themes = [
      'light',
      'semi-light',
      'not-light',
      'not-dark',
      'semi-dark',
      'dark'
    ]

    this.sizes = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 24]

    this.settings = new Settings()

    this.initInterface()
    this.initFonts()
    this.updateFonts()
    this.interface.updateVariants()
    this.interface.updateSizes()
  }

  initInterface() {
    this.interface = new Interface(this)
  }

  initFonts() {
    this.fonts = []
    this.fontsContainer = document.createElement('div')
    this.fontsContainer.classList.add('fonts')
    this.fontsContainer.classList.add(this.settings.get('theme'))
    document.body.appendChild(this.fontsContainer)
    for (const fontName of this.fontList) {
      const font = new Font(fontName, this)
      this.fonts.push(font)
    }
  }

  getSizes() {
    return this.sizes
  }

  getThemes() {
    return this.themes
  }

  getPresets() {
    return this.presets
  }

  getFontVariants() {
    return this.fontVariants
  }

  updateFonts() {
    const sampleText = this.interface.getSampleText()
    for (const font of this.fonts) {
      font.setSampleText(sampleText)
    }
  }
}

window.addEventListener('load', function () {
  window.app = new App()
})
