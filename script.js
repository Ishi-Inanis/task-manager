/**
 * @typedef {object} Task
 * @param {number} id
 * @param {string} title
 */
class Task {
  /** @type {Task[]} */
  static collection = []

  /** @type {string} */
  #title = ''
  /** @type {number} */
  #id
  /** @type {HTMLElement} */
  #element = document.createElement('article')

  static load() {
    /** @type {string[]} */
    let keys = Object.keys(localStorage),
        /** @type {*[]} */
        tasks = [];

    keys = keys.filter(el => el.startsWith('task-'));

    for (let key of keys) {
      tasks.push(getLocalStorageDataJSON(key));
    }

    tasks.map((task) => {
      Task.collection.push(new Task(task.id, task.title));
    });

    Task.collection.sort((current, next) => current.id > next.id ? 1 : -1);
  }

  /**
   * @returns {number}
   * @private
   */
  static _searchFreeID() {
    /** @type {number} */
    let minFreeID = 1;

    for (let i = 0; i < Task.collection.length; i++) {
      if (Task.collection[i]['id'] === minFreeID) { minFreeID++ } else break;
    }

    return minFreeID;
  }

  save() {
    /** @type {{id: number, title: string}} */
    const task = {
      'id': this.id,
      'title': this.title
    };

    localStorage.setItem(`task-${this.id}`, JSON.stringify(task));
  }

  /**
   * @param {Task} task
   * @protected
   */
  static #show(task) {
    task.#element.classList.add('task');
    task.#element.id = `task-${this.id}`;
    task.#element.innerHTML = `
      <header class="task-title">
        <h3></h3>
      </header>
      <p></p>
      <footer class="action-buttons">
        <button class="delete">X</button>
        <button class="change">I</button>
        <button class="ok">L</button>
      </footer>
    `;

    document.getElementById('task-list').appendChild(task.#element);
  }

  set id(value) {
    if (typeof value === 'number') {
      this.#id = value;
    } else throw Error('"id" must be a number');
  }

  get id() {
    return this.#id;
  }

  /** @param {number} id */
  constructor(id) {
    this.id = id;
    Task.#show(this);
  }
}

/**
 * @typedef {object} Theme
 * @param {string} selection-background-color,
 * @param {string} selection-text-color,
 * @param {string} button-hover-color,
 * @param {string} background-color,
 * @param {string} border-color,
 * @param {string} text-color
 */
class Theme {
  // TODO: maybe protected
  /** @type {Theme[]} */
  static collection = []

  /** @param {string} color */
  static change(color = localStorage.getItem('theme')) {
    /** @type {HTMLElement} */
    const root = document.querySelector(':root');

    if (typeof localStorage.theme !== 'string') {
      color = Object.keys(Theme.collection)[0];
    }

    for (const property in Theme.collection[color]) {
      root.style.setProperty(`--${property}`, Theme.collection[color][property]);
    }

    localStorage.setItem('theme', color);
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
  static add(
      name,
      selectionBackgroundColor,
      selectionTextColor,
      buttonHoverColor,
      backgroundColor,
      borderColor,
      textColor
  ) {
    Theme.collection[name] = new Theme(
        selectionBackgroundColor,
        selectionTextColor,
        buttonHoverColor,
        backgroundColor,
        borderColor,
        textColor
    );
  }

  /**
   * @param {string} selectionBackgroundColor
   * @param {string} selectionTextColor
   * @param {string} buttonHoverColor
   * @param {string} backgroundColor
   * @param {string} borderColor
   * @param {string} textColor
   */
  constructor(
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
  }
}

/**
 * @param {string} dataKey
 * @returns {object}
 */
const getLocalStorageDataJSON = (dataKey) => {
      return JSON.parse(localStorage.getItem(dataKey));
    },
    /**
     * @param {string} dataKey
     * @param {object} data
     */
    setLocalStorageDataJSON = (dataKey, data) => {
      localStorage.setItem(dataKey, JSON.stringify(data));
    };


Theme.add(
    'white',
    '#333',
    '#fff',
    'gray',
    '#fff',
    'darkgray',
    '#333'
);

Theme.add(
    'black',
    '#fff',
    '#333',
    'gray',
    '#333',
    'lightgray',
    '#fff'
);

Theme.add(
    'coffee',
    '#fff',
    '#211',
    '#765',
    '#533',
    '#baa',
    '#baa'
);

Task.load();

Theme.change();



// document.getElementById('new-task').onclick = () => {
//   const freeID = Task._searchFreeID(),
//       element = document.getElementById(`task-${freeID}`);
//
//   Task.collection.push(new Task(freeID));
// }