const API_URL = "http://localhost:3000/tasks";

const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const addButton = document.querySelector("#add-button");
const taskList = document.querySelector("#task-list");
const message = document.querySelector("#message");
const statusFilter = document.querySelector("#status-filter");

let allTasks = [];

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

async function sendRequest(url, method, data) {
  const options = {method,headers: {},};

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    let errorMessage = `Request failed: ${response.status}`;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
    
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function getFilteredTasks() {
  const selectedStatus = statusFilter.value;

  if (selectedStatus === "active") {
    return allTasks.filter((task) => !task.completed);
  }

  if (selectedStatus === "completed") {
    return allTasks.filter((task) => task.completed);
  }

  return allTasks;
}

function renderTasks() {
  taskList.replaceChildren();

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    if (allTasks.length === 0) {
      showMessage("No tasks yet. Add your first task!");
    } else {
      showMessage("No tasks match this filter.");
    }

    return;
  }

  showMessage("");

  for (const task of filteredTasks) {
    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute(
      "aria-label",
      `Mark ${task.title} as completed`
    );

    checkbox.addEventListener("change", async () => {
      checkbox.disabled = true;

      try {
        await sendRequest(`${API_URL}/${task.id}`, "PATCH", {
          completed: checkbox.checked,
        });

        await loadTasks();
      } catch (error) {
        showMessage(error.message, true);
        checkbox.checked = task.completed;
        checkbox.disabled = false;
      }
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    if (task.completed) {
      title.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async () => {
      deleteButton.disabled = true;

      try {
        await sendRequest(`${API_URL}/${task.id}`, "DELETE");
        await loadTasks();
      } catch (error) {
        showMessage(error.message, true);
        deleteButton.disabled = false;
      }
    });

    li.append(checkbox, title, deleteButton);
    taskList.append(li);
  }
}

async function loadTasks() {
  taskList.replaceChildren();
  showMessage("Loading tasks...");

  try {
    allTasks = await sendRequest(API_URL, "GET");
    renderTasks();
  } catch (error) {
    showMessage(
      "Could not load tasks. Check that the server is running.",
      true
    );

    console.error("Load tasks error:", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();

  if (!title) {
    showMessage("Please enter a task title.", true);
    titleInput.focus();
    return;
  }

  addButton.disabled = true;

  try {
    showMessage("Adding task...");

    await sendRequest(API_URL, "POST", { title });

    titleInput.value = "";
    await loadTasks();
    titleInput.focus();
  } catch (error) {
    showMessage(error.message || "Could not add task.", true);
    console.error("Add task error:", error);
  } finally {
    addButton.disabled = false;
  }
});

statusFilter.addEventListener("change", () => {
  renderTasks();
});

loadTasks();
