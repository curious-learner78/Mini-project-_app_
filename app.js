const TASKS_KEY = "vinix_mini_hub_tasks_v1";
const USER_KEY = "vinix_mini_hub_user_v1";

const profileBtn = document.getElementById("profileBtn");
const profilePanel = document.getElementById("profilePanel");
const activeUserText = document.getElementById("activeUserText");
const userNameInput = document.getElementById("userNameInput");
const saveUserBtn = document.getElementById("saveUserBtn");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const doneCount = document.getElementById("doneCount");

const itemForm = document.getElementById("itemForm");
const itemTitle = document.getElementById("itemTitle");
const itemCategory = document.getElementById("itemCategory");
const itemError = document.getElementById("itemError");

const searchInput = document.getElementById("searchInput");
const filterPills = document.querySelectorAll(".pill");
const itemList = document.getElementById("itemList");
const emptyBox = document.getElementById("emptyBox");
const clearDoneBtn = document.getElementById("clearDoneBtn");

let tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
let currentUser = localStorage.getItem(USER_KEY) || "";
let activeFilter = "all";
let searchQuery = "";

function renderUser() {
  if (currentUser) {
    activeUserText.textContent = `Signed in as ${currentUser}`;
    userNameInput.value = currentUser;
  } else {
    activeUserText.textContent = "Guest Mode — Set your name";
  }
}

profileBtn.addEventListener("click", () => {
  profilePanel.hidden = !profilePanel.hidden;
});

saveUserBtn.addEventListener("click", () => {
  const name = userNameInput.value.trim();
  currentUser = name;
  localStorage.setItem(USER_KEY, currentUser);
  renderUser();
  profilePanel.hidden = true;
});

function saveTasks() {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = total - done;

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  doneCount.textContent = done;
}

function getVisibleTasks() {
  return tasks.filter((task) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "pending" && !task.done) ||
      (activeFilter === "done" && task.done);

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });
}

function renderList() {
  const visible = getVisibleTasks();
  itemList.innerHTML = "";

  if (visible.length === 0) {
    emptyBox.hidden = false;
  } else {
    emptyBox.hidden = true;
    visible.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-card ${task.done ? "done" : ""}`;

      const mainDiv = document.createElement("div");
      mainDiv.className = "task-main";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-check";
      checkbox.checked = task.done;
      checkbox.addEventListener("change", () => {
        tasks = tasks.map((t) =>
          t.id === task.id ? { ...t, done: !t.done } : t
        );
        saveTasks();
        updateStats();
        renderList();
      });

      const metaDiv = document.createElement("div");
      metaDiv.className = "task-meta";

      const titleSpan = document.createElement("span");
      titleSpan.className = "task-title";
      titleSpan.textContent = task.title;

      const tagSpan = document.createElement("span");
      tagSpan.className = "tag";
      tagSpan.textContent = task.category;

      metaDiv.appendChild(titleSpan);
      metaDiv.appendChild(tagSpan);

      mainDiv.appendChild(checkbox);
      mainDiv.appendChild(metaDiv);

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "del-btn";
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        tasks = tasks.filter((t) => t.id !== task.id);
        saveTasks();
        updateStats();
        renderList();
      });

      li.appendChild(mainDiv);
      li.appendChild(delBtn);
      itemList.appendChild(li);
    });
  }
}

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = itemTitle.value.trim();

  if (!title) {
    itemError.textContent = "Please enter a task or study goal.";
    itemTitle.focus();
    return;
  }

  itemError.textContent = "";
  tasks.unshift({
    id: Date.now().toString(),
    title,
    category: itemCategory.value,
    done: false
  });

  saveTasks();
  updateStats();
  renderList();
  itemTitle.value = "";
  itemTitle.focus();
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim();
  renderList();
});

filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    filterPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    activeFilter = pill.dataset.filter;
    renderList();
  });
});

clearDoneBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  updateStats();
  renderList();
});

renderUser();
updateStats();
renderList();
  
