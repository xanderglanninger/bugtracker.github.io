document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".loginform"); // Use the class selector for the form
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Check if the username and password match the constant variables
    if (username === "admin" && password === "admin") {
      // Redirect to the main page (index.html)
      window.location.href = "Dashboard.html";
    } else {
      errorMessage.textContent =
        "Invalid username or password. Please try again.";
    }
  });
});
