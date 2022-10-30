window.addEventListener('load', async () => {
  await Data.init();
  customElements.define('task-item', TaskElement);

  // FIXME: maybe delete
  new Theme(
      'white',
      '#333',
      '#fff',
      '#808080',
      '#fff',
      '#a9a9a9',
      '#333'
  );

  new Theme(
      'black',
      '#fff',
      '#333',
      '#808080',
      '#333',
      '#d3d3d3',
      '#fff'
  );

  new Theme(
      'coffee',
      '#fff',
      '#211',
      '#765',
      '#533',
      '#baa',
      '#baa'
  );
});