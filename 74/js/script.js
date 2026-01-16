// ページ読み込み時：保存済みタスクを表示
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (taskText) {
    createTask(taskText);
  });
};

// 追加ボタン
document.getElementById("add-task").addEventListener("click", function () {
  const taskText = document.getElementById("task-text").value;
  if (taskText) {
    createTask(taskText);
    saveTask(taskText);
    document.getElementById("task-text").value = "";
  }
});

// タスク作成（削除ボタン付き）
function createTask(taskText) {
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");

  taskItem.textContent = taskText + " ";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";

  deleteButton.addEventListener("click", function () {
    deleteTask(taskText);
    taskList.removeChild(taskItem);
  });

  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
}

// 保存
function saveTask(taskText) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// 削除
function deleteTask(taskText) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = savedTasks.filter(task => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
