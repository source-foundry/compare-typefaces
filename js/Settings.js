class Settings {
  constructor () {
    this.defaults = {
      sample: 'The quick brown fox is asleep...',
      sizes: '9,11,13,15',
      variants: 'regular,italic',
      theme: 'semi-dark'
    }
  }

  get (key) {
    const valueFromStorage = window.localStorage.getItem(key)
    if (valueFromStorage !== null) {
      return valueFromStorage
    }

    const defaultValue = this.defaults[key]
    if (defaultValue !== undefined) {
      return defaultValue
    }

    return
  }

  set (key, value) {
    window.localStorage.setItem(key, value)
  }
}
