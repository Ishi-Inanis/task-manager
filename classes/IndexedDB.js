/**
 * @typedef IndexedDB
 */
class IndexedDB {
  /**
   * @param {string} name
   * @param {number} version
   * @param {function} upgrade
   * @returns {Promise}
   */
  constructor(name, version, upgrade) {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) reject('not support');

      /** @type {IDBOpenDBRequest} */
      const open = indexedDB.open(name, version);

      if (upgrade) open.onupgradeneeded = event => upgrade(open.result, event.oldVersion, event.newVersion);

      open.onsuccess = () => {
        this.db = open.result;

        this.db.onversionchange = () => {
          this.db.close();
          alert('Database upgrade required - reloading...');
          location.reload();
        }
        resolve(this);
      }

      open.onerror = event => reject(`IndexedDB error: ${event.target.errorCode}`);
    });
  }

  /**
   * @param {string} storeName
   * @param {object} value
   * @param {boolean} overwrite
   * @returns {Promise}
   */
  update(storeName, value, overwrite = false) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite'),
          store = transaction.objectStore(storeName);

      let newId;

      // FIXME: check
      value = Array.isArray(value) ? value : [value];

      value.forEach(value => {
        if (overwrite) store.put(value);
        else store.add(value);
      });

      store.openCursor(null, 'prev').onsuccess = event => {
        newId = event.target.result.primaryKey;
      }

      transaction.oncomplete = () => {
        resolve(newId);
      }

      transaction.onerror = () => {
        reject(transaction.error);
      }
    });
  }
}