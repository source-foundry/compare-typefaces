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
    const variants = [
      ['default', 'none'],
      ['default', 'italic'],
      ['bold', 'none'],
      ['bold', 'italic']
    ]
    this.samples = []
    this.sampleContainer = document.createElement('div')
    this.sampleContainer.classList.add('samples')
    this.element.appendChild(this.sampleContainer)

    for (const variant of variants) {
      const container = document.createElement('div')
      container.classList.add('variant')
      this.sampleContainer.appendChild(container)
      container.style.fontWeight = variant[0]
      container.style.fontStyle = variant[1]

      for (const size of sizes) {
        const sample = document.createElement('div')
        sample.classList.add('sample')
        sample.style.fontSize = size + 'px'
        this.samples.push(sample)
        container.appendChild(sample)
      }
    }
  }

  setText(text) {
    for (const sample of this.samples) {
      sample.textContent = text
    }
  }
}
