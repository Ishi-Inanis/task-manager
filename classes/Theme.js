/**
 * @typedef {object} Theme
 * @param {string} name
 * @param {string} selection-background-color,
 * @param {string} selection-text-color,
 * @param {string} button-hover-color,
 * @param {string} background-color,
 * @param {string} border-color,
 * @param {string} text-color
 */
class Theme {
  /** @type {Map<string, Theme>} */
  static #collection = new Map

  /** @param {string} name */
  static change(name = Data.get('theme')) {
    /** @type {CSSStyleDeclaration} */
    const root = document.querySelector(':root').style;

    if (typeof Data.get('theme') !== 'string') {
      name = Theme.#collection.keys().next().value;
    }

    for (const property in Theme.#collection.get(name)) {
      root.setProperty(`--${property}`, Theme.#collection.get(name)[property]);
    }

    Data.set('theme', name);
  }

  /**
   * @param {string} name
   * @param {string} selectionBackgroundColor
   * @param {string} selectionTextColor
   * @param {string} buttonHoverColor
   * @param {string} backgroundColor
   * @param {string} borderColor
   * @param {string} textColor
   */
  constructor(
      name,
      selectionBackgroundColor,
      selectionTextColor,
      buttonHoverColor,
      backgroundColor,
      borderColor,
      textColor
  ) {
    this['selection-background-color'] = selectionBackgroundColor;
    this['selection-text-color'] = selectionTextColor;
    this['button-hover-color'] = buttonHoverColor;
    this['background-color'] = backgroundColor;
    this['border-color'] = borderColor;
    this['text-color'] = textColor;

    Theme.#collection.set(name, this);
  }
}