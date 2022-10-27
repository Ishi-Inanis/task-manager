class Data {
  /**
   * @param {string} key
   * @returns {object}
   */
  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * @param {string} key
   * @param {object} data
   */
  static set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}