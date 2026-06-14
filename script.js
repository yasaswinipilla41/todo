const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

let todos = [];

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    const emptyItem = document.createElement('p');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = 'No todos yet. Add one above!';
    todoList.appendChild(emptyItem);
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const label = document.createElement('span');
    label.className = 'todo-label';
    label.textContent = todo.text;

    const editInput = document.createElement('input');
    editInput.className = 'todo-input-edit';
    editInput.type = 'text';
    editInput.value = todo.text;
    editInput.style.display = 'none';

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'buttons';

    const editButton = document.createElement('button');
    editButton.className = 'button edit';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => toggleEditMode(todo.id, label, editInput, editButton));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'button delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));

    buttonGroup.append(editButton, deleteButton);
    li.append(label, editInput, buttonGroup);
    todoList.appendChild(li);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({
    id: Date.now().toString(),
    text,
  });

  todoInput.value = '';
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((item) => item.id !== id);
  renderTodos();
}

function toggleEditMode(id, label, editInput, editButton) {
  const isEditing = editInput.style.display === 'block';

  if (isEditing) {
    const newText = editInput.value.trim();
    if (!newText) return;
    todos = todos.map((item) => item.id === id ? { ...item, text: newText } : item);
    label.textContent = newText;
    editButton.textContent = 'Edit';
    label.style.display = 'inline';
    editInput.style.display = 'none';
  } else {
    editButton.textContent = 'Save';
    label.style.display = 'none';
    editInput.style.display = 'block';
    editInput.focus();
  }
}

addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addTodo();
});

renderTodos();
