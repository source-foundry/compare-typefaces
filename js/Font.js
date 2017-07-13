class Font {
  constructor(name, app) {
    this.name = name
    this.app = app
    this.container = app.fontsContainer
    this.element = document.createElement('div')
    this.element.classList.add('font')
    this.element.style.fontFamily = name
    this.container.appendChild(this.element)
    this.createTitle()
    this.createLegend()
    this.createSamples()
  }

  createTitle() {
    const title = document.createElement('div')
    title.classList.add('title')
    title.textContent = this.name
    this.element.appendChild(title)
  }

  createLegend() {
    const legend = document.createElement('div')
    legend.classList.add('legend')
    this.element.appendChild(legend)
    const sizes = this.app.getSizes()
    for (const size of sizes) {
      const label = document.createElement('div')
      label.classList.add('legend-size')
      label.classList.add('size-' + size)
      label.textContent = size + 'px'
      label.style.fontSize = size + 'px'
      legend.appendChild(label)
    }
  }

  createSamples() {
    const sizes = this.app.getSizes()
    const variants = [
      ['regular', 'default', 'none'],
      ['italic', 'default', 'italic'],
      ['bold', 'bold', 'none'],
      ['bold-italic', 'bold', 'italic']
    ]
    this.samples = []
    this.sampleContainer = document.createElement('div')
    this.sampleContainer.classList.add('samples')
    this.element.appendChild(this.sampleContainer)

    for (const variant of variants) {
      const container = document.createElement('div')
      container.classList.add('variant')
      this.sampleContainer.appendChild(container)
      container.classList.add(variant[0])
      container.style.fontWeight = variant[1]
      container.style.fontStyle = variant[2]

      for (const size of sizes) {
        const sample = document.createElement('div')
        sample.classList.add('sample')
        sample.classList.add('size-' + size)
        sample.style.fontSize = size + 'px'
        this.samples.push(sample)
        container.appendChild(sample)
      }
    }
  }

  setSampleText(text) {
    for (const sample of this.samples) {
      sample.textContent = text
    }
  }
}
