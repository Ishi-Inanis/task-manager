/** @typedef {HTMLElement} TaskElement */
class TaskElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.append(Task.template);
  }
}