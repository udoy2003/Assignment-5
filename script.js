


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