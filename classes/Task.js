/**
 * @typedef {object} Task
 * @param {number} id
 * @param {string} title
 * @param {boolean} completed
 */
class Task {
  /** @type {Task[]} */
  static #collection = []
  /** @type {HTMLTemplateElement} */
  static #template

  /** @type {number} */
  #id
  /** @type {string} */
  #title
  /** @type {boolean} */
  #completed
  /** @type {TaskElement} */
  #element = document.createElement('task-item')

  /** @returns {Node} */
  static get template() {
    if (!(this.#template instanceof HTMLTemplateElement)) {
      this.#template = document.createElement('template');
      this.#template.innerHTML = `
        <h1 slot="title"></h1>
        <input type="checkbox" slot="checkbox">
      `;
    }

    return this.#template.content.cloneNode(true);
  }

  // FIXME: remove localStorage usage
  static load() {
    // /** @type {string[]} */
    // const keys = Object.keys(localStorage).filter(el => el.startsWith('task-'));

    // for (const key of keys) {
    //   new Task(Data.get(key));
    // }


    Task.#collection.sort((current, next) => current.id > next.id ? 1 : -1);
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
  set _id(value) {
    try {
      if (typeCheck('id', value, 'number')) this.#id = value;
    } catch (error) {
      console.error(error);
    }
  }

  /** @returns {number} */
  get id() {
    return this.#id;
  }

  /** @param {string} value */
  set title(value) {
    try {
      if (typeCheck('title', value, 'string')) this.#title = value;
    } catch (error) {
      console.error(error);
    }
  }

  /** @returns {string} */
  get title() {
    return this.#title;
  }

  /** @param {boolean} value */
  set completed(value) {
    if (typeof value === 'boolean') {
      this.#completed = value;
    } else throw Error('"completed" must be a boolean');
  }

  /** @returns {boolean} */
  get completed() {
    return this.#completed;
  }

  // save() {
  //   Data.set(`task-${this.id}`, {
  //     id: this.id
  //   });
  // }

  /**
   * @param {string} title
   * @param {boolean} completed
   * @param id
   */
  constructor(title, completed = false, id = undefined) {
    this.title = title;
    this.completed = completed;

    // FIXME: find a better solution
    (async () => {
      try {
        id = await Data.task.update('task', { title, completed });
        if (id) this._id = id;
        else Error('"id" is not defined');
      } catch (error) {
        console.error(error);
      }
    })()

    Task.#collection.push(this);
    Task.#show(this);
  }
}