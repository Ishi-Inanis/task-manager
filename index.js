new Theme(
    'white',
    '#333',
    '#fff',
    'gray',
    '#fff',
    'darkgray',
    '#333'
);

new Theme(
    'black',
    '#fff',
    '#333',
    'gray',
    '#333',
    'lightgray',
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

Theme.change();

Task.load();

// document.getElementById('new-task').onclick = () => {
//   const freeID = Task._searchFreeID(),
//       element = document.getElementById(`task-${freeID}`);
//
//   Task.collection.push(new Task(freeID));
// }