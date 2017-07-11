class Font {
  constructor(name, container) {
    this.name = name
    this.container = container
    this.element = document.createElement('div')
    this.element.classList.add('font')
    this.element.style.fontFamily = name
    this.container.appendChild(this.element)
    this.createTitle()
    this.createSamples()
  }

  createTitle() {
    const title = document.createElement('div')
    title.classList.add('title')
    title.textContent = this.name
    this.element.appendChild(title)
  }

  createSamples() {
    const sizes = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    this.samples = []
    this.sampleContainer = document.createElement('div')
    this.sampleContainer.classList.add('samples')
    this.element.appendChild(this.sampleContainer)
    for (const size of sizes) {
      const sample = document.createElement('div')
      sample.style.fontSize = size + 'px'
      this.samples.push(sample)
      this.sampleContainer.appendChild(sample)
    }
  }

  setText(text) {
    for (const sample of this.samples) {
      sample.textContent = text
    }
  }
}
