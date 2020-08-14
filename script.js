let themes = {};

const taskCollection = {
  stack: [],
  getLocalStorageDataJSON: (dataKey) => {
    return JSON.parse(localStorage.getItem(dataKey));
  },
  setLocalStorageDataJSON: (dataKey, data) => {
    localStorage.setItem(dataKey, JSON.stringify(data));
  },
  loadTasks: function() {
    let keys = Object.keys(localStorage),
        tasks = [];

    keys = keys.filter(el => el.startsWith('task-'));
    for (let key of keys) {
      tasks.push(this.getLocalStorageDataJSON(key));
    }

    this.stack = [];
    tasks.map((task) => {
      this.stack.push(new Task(task.id, task.title));
    });
    this.stack.sort((current, next) => current.id > next.id ? 1 : -1);
  },
  _searchFreeID: function() {
    let minFreeID = 1;

    for (let i = 0; i < this.stack.length; i++) {
      if (this.stack[i]['id'] == minFreeID) { minFreeID++ } else break;
    }

    return minFreeID;
  }
};

class Task {
  title = '';
  constructor(id) {
    this.id = id;

    let element = document.createElement("article");
    element.classList.add('task');
    element.id = `task-${this.id}`;
    element.innerHTML = '<header class="task-title"><h3></h3></header>';
    element.innerHTML += '<main></main>';
    element.innerHTML += '<footer class="action-buttons"><button class="delete">X</button><button class="change">I</button><button class="ok">L</button></footer>'
    document.getElementById("task-list").appendChild(element);
  }
  _setTitle(title) {
    this.title = title;
  }
  save() {
    let task = {
      'id': this.id,
      'title': this.title,
    };
    localStorage.setItem(`task-${this.id}`, JSON.stringify(task));
  }
}

class Theme {
  constructor(
    selectionBackgroundColor,
    selectionTextColor,
    buttonHoverColor,
    backgroundColor,
    borderColor,
    textColor) {
    this['selection-background-color'] = selectionBackgroundColor;
    this['selection-text-color'] = selectionTextColor;
    this['button-hover-color'] = buttonHoverColor;
    this['background-color'] = backgroundColor;
    this['border-color'] = borderColor;
    this['text-color'] = textColor;
  }

  static change(color = localStorage.getItem('theme')) {
    let root = document.querySelector(':root');

    if (typeof localStorage.theme !== 'string') {
      color = Object.keys(themes)[0];
    }

    for (let property in themes[color]) {
      root.style.setProperty(`--${property}`, themes[color][property]);
    }

    localStorage.setItem('theme', color);
  }
}

themes.white = new Theme(
  '#333', // selection-background-color
  '#fff', // selection-text-color
  'gray', // button-hover-color
  '#fff', // background-color
  'darkgray', // border-color
  '#333'); // text-color
themes.black = new Theme(
  '#fff', // selection-background-color
  '#333', // selection-text-color
  'gray', // button-hover-color
  '#333', // background-color
  'lightgray', // border-color
  '#fff'); // text-color
themes.coffee = new Theme(
  '#fff', // selection-background-color
  '#211', // selection-text-color
  '#765', // button-hover-color
  '#533', // background-color
  '#baa', // border-color
  '#baa'); // text-color

taskCollection.loadTasks();
Theme.change();

document.getElementById('new-task').onclick = () => {
  let freeID = taskCollection._searchFreeID();
  taskCollection.stack.push(new Task(freeID));
  document.getElementById(`task-${freeID}`).focus();
  document.getElementById(`task-${freeID}`).onblur = () => {
    document.getElementById(`task-${freeID}`).remove();
  }
}
