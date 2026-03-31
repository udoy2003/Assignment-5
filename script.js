


function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Login attempt:", username, password);

  if (username === "admin" && password === "admin123") {
    alert("Login successful ");
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong username");
  }
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
