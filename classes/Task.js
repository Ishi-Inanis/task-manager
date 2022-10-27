/**
 * @typedef {object} Task
 * @param {number} id
 */
class Task {
  /** @type {Task[]} */
  static #collection = []
  /** @type {HTMLElement} */
  static #template

  /** @type {number} */
  #id
  /** @type {HTMLElement} */
  #element = document.createElement('task-item')

  /** @returns {Node} */
  static get template() {
    if (!(this.#template instanceof HTMLElement)) {
      this.#template = document.createElement('template');
      this.#template.innerHTML = `
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
    }

    return this.#template.content.cloneNode(true);
  }

  static load() {
    /** @type {string[]} */
    const keys = Object.keys(localStorage).filter(el => el.startsWith('task-'));

    for (const key of keys) {
      new Task(Data.get(key));
    }

    Task.#collection.sort((current, next) => current.id > next.id ? 1 : -1);
  }

  /**
   * @returns {number}
   * @protected
   */
  static #searchFreeID() {
    /** @type {number} */
    let minFreeID = 1;

    for (const { id } of Task.#collection) {
      if (id === minFreeID) { minFreeID++ } else break;
    }

    return minFreeID;
  }

  /**
   * @param {Task} task
   * @protected
   */
  static #show(task) {
    task.#element.classList.add('task');
    task.#element.id = `task-${task.id}`;

    task.#element.append(Task.template);

    document.getElementById('task-list').append(task.#element);
  }

  /** @param {number} value */
  set id(value) {
    if (typeof value === 'number') {
      this.#id = value;
    } else throw Error('"id" must be a number');
  }

  /** @returns {number} */
  get id() {
    return this.#id;
  }

  save() {
    Data.set(`task-${this.id}`, {
      id: this.id
    });
  }

  /** @param {number} id */
  constructor(id = Task.#searchFreeID()) {
    this.id = id;

    Task.#collection.push(this);
    Task.#show(this);
  }
}