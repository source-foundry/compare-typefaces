class Font {
  constructor(name, container) {
    this.name = name
    this.container = container
    this.element = document.createElement('div')
    this.element.style.fontFamily = name
    this.container.appendChild(this.element)
    this.createTypo()
  }

  createTypo() {
    const sizes = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    this.samples = []
    for (const size of sizes) {
      const sample = document.createElement('div')
      sample.style.fontSize = size + 'px'
      this.samples.push(sample)
      this.element.appendChild(sample)
    }
  }

  setText(text) {
    for (const sample of this.samples) {
      sample.textContent = text
    }
  }
}
