// ########################################################################################################################
// Dashboard
document.addEventListener("DOMContentLoaded", function () {
  // Display when form is opened
  if (localStorage.countNewTickets === undefined) {
    document.getElementById("bugs-ready-number").innerHTML = 0;
  } else {
    document.getElementById("bugs-ready-number").innerHTML =
      localStorage.countNewTickets;
  }

  if (localStorage.countConfirmedTickets === undefined) {
    document.getElementById("bugs-in-progress-number").innerHTML = 0;
  } else {
    document.getElementById("bugs-in-progress-number").innerHTML =
      localStorage.countConfirmedTickets;
  }

  if (localStorage.countClosedTickets === undefined) {
    document.getElementById("bugs-completed-number").innerHTML = 0;
  } else {
    document.getElementById("bugs-completed-number").innerHTML =
      localStorage.countClosedTickets;
  }

  // Display Priorities when form is opened
  if (localStorage.highPriority === undefined) {
    document.querySelector(".high-priority-number").innerHTML = 0;
  } else {
    document.querySelector(".high-priority-number").innerHTML =
      localStorage.highPriority;
  }

  if (localStorage.mediumPriority === undefined) {
    document.querySelector(".medium-priority-number").innerHTML = 0;
  } else {
    document.querySelector(".medium-priority-number").innerHTML =
      localStorage.mediumPriority;
  }

  if (localStorage.lowPriority === undefined) {
    document.querySelector(".low-priority-number").innerHTML = 0;
  } else {
    document.querySelector(".low-priority-number").innerHTML =
      localStorage.lowPriority;
  }

  // Summary display when form is opened
  if (localStorage.totalTicketCounter === undefined) {
    document.querySelector(".total-bugs-summary").innerHTML = 0;
  } else {
    document.querySelector(".total-bugs-summary").innerHTML =
      localStorage.totalTicketCounter;
  }

  if (localStorage.usersArray === undefined) {
    document.querySelector(".total-users-summary").innerHTML = 0;
  } else {
    let tempUsersArray = JSON.parse(localStorage.usersArray);
    document.querySelector(".total-users-summary").innerHTML =
      tempUsersArray.length;
  }

  if (localStorage.projectarrays === undefined) {
    document.querySelector(".total-projects-summary").innerHTML = 0;
  } else {
    let tempProjectarr = localStorage.projectarrays.split(",");
    document.querySelector(".total-projects-summary").innerHTML =
      tempProjectarr.length;
  }

  const addNewProject = function (projectName) {
    const newProjectElement = document.createElement("div");
    newProjectElement.className = "project background-project-shadow";
    newProjectElement.textContent = projectName;
    addprojectcontainer.appendChild(newProjectElement);
  };

  let mainprojectsArray = [];
  const addbtn = document.querySelector(".add-project-button");
  const addprojectcontainer = document.querySelector(
    ".dynamic-project-container"
  );
  const projectNameElement = document.querySelector(".new-project-name");

  if (localStorage.projectarrays) {
    mainprojectsArray = localStorage.projectarrays.split(",");
    const arrlength = mainprojectsArray.length;
    for (let a = 0; a < arrlength; a++) {
      let oldProjectName = mainprojectsArray[a];
      addNewProject(oldProjectName);
    }
  }

  addbtn.addEventListener("click", function () {
    const projectName = projectNameElement.value;
    if (projectName !== "") {
      addNewProject(projectName);
      mainprojectsArray.push(projectName);
      localStorage.projectarrays = mainprojectsArray;
      projectName.value = "";
    } else alert("Please enter a project Name");
  });
});

// #################################################################################################################################################################################
// Users

document.addEventListener("DOMContentLoaded", function () {
  let users = [];

  if (
    localStorage.usersArray !== null &&
    localStorage.usersArray !== undefined
  ) {
    users = JSON.parse(localStorage.usersArray);
    displayUsers(users);
  }
});

const addPerson = () => {
  let users = [];

  if (
    localStorage.usersArray !== null &&
    localStorage.usersArray !== undefined
  ) {
    users = JSON.parse(localStorage.usersArray);
  }

  let person = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    id: document.getElementById("idnumber").value,
    email: document.getElementById("mail").value,
    username: document.getElementById("username").value,
  };

  users.push(person);
  displayUsers(users);
  localStorage.usersArray = JSON.stringify(users);
  const popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";
};

function displayUsers(users) {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  for (const user of users) {
    const li = document.createElement("li");
    li.textContent = `${user.name} ${user.surname}`;
    userList.appendChild(li);
  }
}

function searchUser() {
  let users = [];

  if (
    localStorage.usersArray !== null &&
    localStorage.usersArray !== undefined
  ) {
    users = JSON.parse(localStorage.usersArray);
  }

  const searchQuery = document.getElementById("search").value.toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.username.toLowerCase().includes(searchQuery)
  );

  displayUsers(filteredUsers);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".popupUsers").addEventListener("click", function () {
    removeHidden();
  });
  const removeHidden = function () {
    document.querySelector(".input-wrapper").classList.remove("hidden");
  };
});

const addUserButton = document.querySelector(".btn-add");
if (addUserButton) {
  addUserButton.addEventListener("click", addPerson);
}

// Add users form
document.addEventListener("DOMContentLoaded", function () {
  const openPopupButton = document.querySelector(".btn-add-user");
  const popupContainer = document.getElementById("popupContainer");

  openPopupButton.addEventListener("click", () => {
    popupContainer.style.display = "block";
  });

  window.addEventListener("click", (event) => {
    if (event.target === popupContainer) {
      popupContainer.style.display = "none";
    }
  });
});
