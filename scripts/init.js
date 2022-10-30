window.addEventListener('load', async () => {
  await Data.init();
  customElements.define('task-item', TaskElement);
});