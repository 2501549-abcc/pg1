document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-text");
  const taskList  = document.getElementById("task-list");

  // 起動時に読み込み
  let tasks = loadTasks();
  renderTasks(tasks);

  // 追加（submitなのでEnterもOK）
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = createTaskObject(text);
    tasks.push(newTask);
    saveTasks(tasks);

    addTaskToDOM(newTask);
    taskInput.value = "";
  });

  function createTaskObject(text) {
    return {
      id: crypto.randomUUID(), // ユニークID（同名タスクでも安全）
      text
    };
  }

  function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach(addTaskToDOM);
  }

  function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "削除";

    deleteBtn.addEventListener("click", () => {
      // 配列から消す
      const index = tasks.findIndex(t => t.id === task.id);
      if (index !== -1) tasks.splice(index, 1);

      saveTasks(tasks);

      // DOMから消す
      li.remove();
    });

    li.append(span, deleteBtn);
    taskList.appendChild(li);
  }
});
