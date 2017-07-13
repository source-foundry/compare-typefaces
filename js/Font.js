class Font {
  constructor(name, app) {
    this.name = name
    this.app = app
    this.container = app.fontsContainer
    this.element = document.createElement('div')
    this.element.classList.add('font')
    this.element.style.fontFamily = name
    this.container.appendChild(this.element)
    this.createSamples()
  }

  createSamples() {
    const sizes = this.app.getSizes()
    const variants = [
      ['regular', 'default', 'none'],
      ['italic', 'default', 'italic'],
      ['bold', 'bold', 'none'],
      ['bold-italic', 'bold', 'italic']
    ]
    this.texts = []

    for (const variant of variants) {
      const container = document.createElement('div')
      container.classList.add('variant')
      this.element.appendChild(container)
      container.classList.add(variant[0])

      const titleContainer = document.createElement('div')
      titleContainer.classList.add('title')
      const titleSpan = document.createElement('span')
      titleSpan.textContent = this.name + ', ' + variant[0]
      titleContainer.appendChild(titleSpan)
      container.appendChild(titleContainer)

      const sampleContainer = document.createElement('div')
      sampleContainer.classList.add('samples')
      container.appendChild(sampleContainer)

      for (const size of sizes) {
        const sample = document.createElement('div')
        sample.classList.add('sample')
        sample.classList.add('size-' + size)
        sample.style.fontSize = size + 'px'
        sampleContainer.appendChild(sample)

        const legend = document.createElement('div')
        legend.classList.add('sample-legend')
        legend.textContent = size
        sample.appendChild(legend)

        const text = document.createElement('div')
        text.classList.add('sample-text')
        text.style.fontWeight = variant[1]
        text.style.fontStyle = variant[2]
        this.texts.push(text)
        sample.appendChild(text)
      }
    }
  }

  setSampleText(text) {
    for (const sample of this.texts) {
      sample.textContent = text
    }
  }
}
