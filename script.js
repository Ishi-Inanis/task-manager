class Task {
  static collection = []

  #title = ''

  element = document.createElement('article')

  static load() {
    let keys = Object.keys(localStorage),
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

  static _searchFreeID() {
    let minFreeID = 1;

    for (let i = 0; i < Task.collection.length; i++) {
      if (Task.collection[i]['id'] === minFreeID) { minFreeID++ } else break;
    }

    return minFreeID;
  }

  save() {
    const task = {
      'id': this.id,
      'title': this.title
    };

    localStorage.setItem(`task-${this.id}`, JSON.stringify(task));
  }

  constructor(id) {
    this.id = id;

    this.element.classList.add('task');
    this.element.id = `task-${this.id}`;
    this.element.innerHTML = `
      <header class="task-title"><h3></h3></header>
      <main></main>
      <footer class="action-buttons"><button class="delete">X</button><button class="change">I</button><button class="ok">L</button></footer>
    `;

    document.getElementById('task-list').appendChild(this.element);
  }
}

class Theme {
  static collection = []

  static change(color = localStorage.getItem('theme')) {
    const root = document.querySelector(':root');

    if (typeof localStorage.theme !== 'string') {
      color = Object.keys(Theme.collection)[0];
    }

    for (const property in Theme.collection[color]) {
      root.style.setProperty(`--${property}`, Theme.collection[color][property]);
    }

    localStorage.setItem('theme', color);
  }

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


const getLocalStorageDataJSON = (dataKey) => {
      return JSON.parse(localStorage.getItem(dataKey));
    },
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

document.getElementById('new-task').onclick = () => {
  const freeID = Task._searchFreeID(),
      element = document.getElementById(`task-${freeID}`);

  Task.collection.push(new Task(freeID));
}