const BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";


function login() {
  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  console.log("Login attempt:", username, password);

  if (username === "admin" && password === "admin123") {
    alert("Login successful ");
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong username");
  }
}


async function loadIssues(type = "all") {
  toggleLoader(true);

  const res = await fetch(`${BASE_URL}/issues`);
  const data = await res.json();

  let issues = data.data;

  if (type !== "all") {
    issues = issues.filter(i => i.status === type);
  }

  document.getElementById("issueCount").innerText =
    `${issues.length} Issues`;

  displayIssues(issues);
  toggleLoader(false);
}


function displayIssues(issues) {
  const container = document.getElementById("issuesContainer");
  container.innerHTML = "";

  issues.forEach(issue => {

    const border =
      issue.status === "open"
        ? "border-green-500"
        : "border-purple-500";

    const priority =
      issue.priority === "HIGH"
        ? "bg-red-100 text-red-500"
        : issue.priority === "MEDIUM"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-gray-200 text-gray-500";

    const card = document.createElement("div");

    card.className = `
      bg-white rounded-xl shadow-sm hover:shadow-md
      border-t-4 ${border} cursor-pointer transition
    `;

    card.innerHTML = `
      <div class="p-4">
        <div class="flex justify-between mb-3">
          <span class="text-xs px-3 py-1 rounded-full ${priority}">
            ${issue.priority}
          </span>
        </div>

        <h3 class="font-semibold text-sm mb-1">
          ${issue.title}
        </h3>

        <p class="text-xs text-gray-500 mb-3">
          ${issue.description.slice(0, 70)}...
        </p>

        <div class="flex gap-2 flex-wrap mb-3">
          <span class="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">
            BUG
          </span>
          <span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
            HELP WANTED
          </span>
        </div>
      </div>

      <div class="border-t px-4 py-2 text-xs text-gray-500">
        #${issue.id} by ${issue.author}<br>
        ${new Date(issue.createdAt).toLocaleDateString()}
      </div>
    `;

    card.onclick = () => openModal(issue);

    container.appendChild(card);
  });
}
function openModal(issue) {
  const modal = document.getElementById("modal");

  modal.classList.remove("hidden");
  modal.classList.add("flex");


  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("modalDesc").innerText = issue.description;


  document.getElementById("modalAuthor").innerText = issue.author;
  document.getElementById("modalDate").innerText =
    new Date(issue.createdAt).toLocaleDateString();

  document.getElementById("modalAssignee").innerText =
    issue.assignee || issue.author;

 
  const statusEl = document.getElementById("modalStatus");
  if (issue.status === "open") {
    statusEl.innerText = "Opened";
    statusEl.className =
      "px-2 py-1 text-xs rounded-full bg-green-100 text-green-600";
  } else {
    statusEl.innerText = "Closed";
    statusEl.className =
      "px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600";
  }


  const priorityEl = document.getElementById("modalPriority");

  if (issue.priority === "HIGH") {
    priorityEl.className =
      "text-xs px-3 py-1 rounded-full bg-red-500 text-white";
  } else if (issue.priority === "MEDIUM") {
    priorityEl.className =
      "text-xs px-3 py-1 rounded-full bg-yellow-400 text-white";
  } else {
    priorityEl.className =
      "text-xs px-3 py-1 rounded-full bg-gray-400 text-white";
  }

  priorityEl.innerText = issue.priority;
}
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}


async function searchIssues() {
  const text = document.getElementById("searchInput").value;

  toggleLoader(true);

  const res = await fetch(`${BASE_URL}/issues/search?q=${text}`);
  const data = await res.json();

  displayIssues(data.data);
  toggleLoader(false);
}


function setActiveTab(type) {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("bg-purple-600", "text-white");
    btn.classList.add("bg-gray-100");
  });

  const active = document.getElementById(type + "Tab");
  active.classList.add("bg-purple-600", "text-white");

  loadIssues(type);
}


function toggleLoader(show) {
  document.getElementById("loader").classList.toggle("hidden", !show);
}


window.onload = () => {
  if (document.getElementById("issuesContainer")) {
    loadIssues();
  }
};