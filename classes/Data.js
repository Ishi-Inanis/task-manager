/**
 * @typedef {object} Data
 */
class Data {
  static db = null;

  static async init() {
    Data.db = await new IndexedDB('taskManager', 1, (db, oldVersion, newVersion) => {
      console.log(`upgrading database from ${oldVersion} to ${newVersion}`);

      switch (oldVersion) {
        case 0: {
          /** @type {IDBObjectStore} */
          const task = db.createObjectStore('task', { keyPath: 'id', autoIncrement: true }),
              theme = db.createObjectStore('theme', { keyPath: 'name', autoIncrement: false });

          task.createIndex('title', 'title');
          task.createIndex('completed', 'completed');

          theme.createIndex('name', 'name', { unique: true });
          theme.createIndex('selectionBackgroundColor', 'selectionBackgroundColor');
          theme.createIndex('selectionTextColor', 'selectionTextColor');
          theme.createIndex('buttonHoverColor', 'buttonHoverColor');
          theme.createIndex('backgroundColor', 'backgroundColor');
          theme.createIndex('borderColor', 'borderColor');
          theme.createIndex('textColor', 'textColor');
        }
      }
    });

    console.log(Data.db);
  }
}