const apiUrl = 'https://your-backend-url/api';

// Store the user’s token after login
let token = '';

// Register User
async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  alert(data.message || 'Registration successful!');
}

// Login User
async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  if (data.token) {
    token = data.token;
    alert('Login successful!');
    loadTasks();
  } else {
    alert(data.error || 'Login failed');
  }
}

// Create a New Task
async function createTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const deadline = document.getElementById('taskDeadline').value;
  const priority = document.getElementById('taskPriority').value;
  
  const response = await fetch(`${apiUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, description, deadline, priority })
  });
  
  const task = await response.json();
  displayTask(task);
}

// Display Task in Task List
function displayTask(task) {
  const taskList = document.getElementById('taskList');
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  taskDiv.innerHTML = `
    <div class="task-title">${task.title}</div>
    <div class="task-priority">${task.priority}</div>
    <div class="task-deadline">${task.deadline ? new Date(task.deadline).toDateString() : 'No deadline'}</div>
    <button onclick="deleteTask('${task._id}')">Delete</button>
  `;
  taskList.appendChild(taskDiv);
}

// Load Tasks from Backend
async function loadTasks() {
  const response = await fetch(`${apiUrl}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const tasks = await response.json();
  document.getElementById('taskList').innerHTML = '';
  tasks.forEach(displayTask);
}

// Delete Task
async function deleteTask(id) {
  await fetch(`${apiUrl}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  loadTasks();
      }
    
