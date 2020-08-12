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
    tasks.map((task) => {
      this.stack.push(new Task(task.id, task.title));
    });
  }
};

class Task {
  constructor(id, title) {
    this.id = id;
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
