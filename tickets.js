// Problem list
// 1. (SOLVED) We need to save the whole ticket element in the local storage everytime the user adds a ticket
// Idea 1: We can use an array with objects, where each object consists of the different tickets (DID NOT WORK)
// Idea 2: Apperantly, we can save a whole element in the local storage by converting it to a string.(WORKED)

// 2. (SOLVED) We need to make every single ticket unique because if a specific confirm button is clicked it needs to capture the specified element and move it. The problem is that how would we identify that specific element?

// 3. (SOLVED) When the website gets closed and reopened, the whole element of every single ticket should be taken out of the local storage and displayed.

// 4. (SOLVED) We need a function that will receive a number indicating what confirm button was pressed.

// 5. (SOLVED) We need to remove the whole element(indicated by the number received by the function) from the new-ticket section and move it to the confirm section.

// 6. We need to create an fucntion that will receive the index number of the selected element and move it to the closed section
// ###########################################################################################################################################################################################################################################################################################################################################################################################################################

// Add tickets form
document.addEventListener("DOMContentLoaded", function () {
  const openPopupButton = document.querySelector(".addNewTicketbtn");
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

// ##########################################################################################################################################################################################################################################################################################################################################################################################################################

let globalMainCounter = 0;
let newTicketElementArray = [];
let confirmTicketInfoArray = [];
let confirmTicketElementArray = [];
let confirmTicketInfoArrayReal = [];
let closeTicketInfoArray = [];
let closeTicketElementArray = [];
let tempUsersArray = [];

let highPriorityCounter = 0;
let mediumPriorityCounter = 0;
let lowPriorityCounter = 0;

let totalTicketCounter = 0;
let countNewTickets = 0;
let countConfirmedTickets = 0;
let countClosedTickets = 0;

let ticketName, ticketDescription, ticketProject, ticketUser, ticketPriority;

if (
  localStorage.countNewTickets != null ||
  localStorage.countNewTickets != undefined
) {
  countNewTickets = localStorage.countNewTickets;
}

if (
  localStorage.countConfirmedTickets != null ||
  localStorage.countConfirmedTickets != undefined
) {
  countConfirmedTickets = localStorage.countConfirmedTickets;
}

if (
  localStorage.countClosedTickets != null ||
  localStorage.countClosedTickets != undefined
) {
  countClosedTickets = localStorage.countClosedTickets;
}

if (localStorage.projectarrays === undefined) {
  localStorage.projectarrays = [];
}

// This will display all the ticket that has been created in the pass
document.addEventListener("DOMContentLoaded", function () {
  if (
    localStorage.newTicketElements != null ||
    localStorage.newTicketElements != undefined
  ) {
    const storedArrayString = localStorage.newTicketElements;
    let arrDisplay = storedArrayString.split(",");

    for (let i = 0; i < arrDisplay.length; i++) {
      document.getElementById("newTicket-flex").innerHTML += arrDisplay[i];
    }
  }

  // This will display all the ticket that has been confirmed
  if (
    localStorage.confirmTicketElementArray != null ||
    localStorage.confirmTicketElementArray != undefined
  ) {
    const storedArrayString = localStorage.confirmTicketElementArray;
    let arrDisplay = storedArrayString.split(",");

    for (let i = 0; i < arrDisplay.length; i++) {
      document.getElementById("confirmedTicket-flex").innerHTML +=
        arrDisplay[i];
    }
  }

  // This will display all the tickets that has been closed
  if (
    localStorage.closeTicketElementArray != null ||
    localStorage.closeTicketElementArray != undefined
  ) {
    const storedArrayString = localStorage.closeTicketElementArray;
    let arrDisplay = storedArrayString.split(",");

    for (let i = 0; i < arrDisplay.length; i++) {
      document.getElementById("closedTicket-flex").innerHTML += arrDisplay[i];
    }
  }
});

// This increases the ticket counter everytime a new ticket is created
function increaseTicketCounter() {
  let lStorageTicketCount = localStorage.newTicketCounter;
  if (lStorageTicketCount != null || lStorageTicketCount != undefined) {
    ticketCounter = Number(lStorageTicketCount);
    ticketCounter++;
    localStorage.newTicketCounter = ticketCounter;
    return ticketCounter;
  } else localStorage.newTicketCounter = 1;
}

function increaseConfirmTicketCounter() {
  let lStorageTicketCount = localStorage.confirmTicketCounter;
  if (lStorageTicketCount != null || lStorageTicketCount != undefined) {
    confirmTicketCounter = Number(lStorageTicketCount);
    confirmTicketCounter++;
    localStorage.confirmTicketCounter = confirmTicketCounter;
    return confirmTicketCounter;
  } else localStorage.confirmTicketCounter = 1;
}

document.addEventListener("DOMContentLoaded", function () {
  const projectArray = localStorage.projectarrays.split(",");
  if (localStorage.usersArray !== undefined) {
    tempUsersArray = JSON.parse(localStorage.usersArray);
  }

  let usersArray = [];
  for (let i = 0; i < tempUsersArray.length; i++) {
    usersArray[i] = `${tempUsersArray[i].name} ${tempUsersArray[i].surname}`;
  }
  addProjectToDropdown(projectArray);
  addUserToDropdown(usersArray);
});

// This function gets the newly created ticket info from the user
function getNewTicketInfo() {
  ticketName = document.getElementById("txtName").value;
  ticketDescription = document.getElementById("txtDescription").value;
  ticketProject = document.getElementById("project").value;
  ticketUser = document.getElementById("user").value;
  ticketPriority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;

  if (
    ticketName != "" &&
    ticketDescription != "" &&
    ticketProject != "" &&
    ticketUser != ""
  ) {
    increaseTicketCounter();
    // This creates an object and stores the current information in it so that we can access it for the confirm fucntion
    let newTicketArray = [
      (Name = ticketName),
      (Description = ticketDescription),
      (Project = ticketProject),
      (User = ticketUser),
      (Priority = ticketPriority),
    ];

    if (
      localStorage.newTicketInfo != null ||
      localStorage.newTicketInfo != undefined
    ) {
      confirmTicketInfoArray = JSON.parse(localStorage.newTicketInfo);
    }
    confirmTicketInfoArray.push(newTicketArray);
    localStorage.newTicketInfo = JSON.stringify(confirmTicketInfoArray);

    // This calls the createTicketElement function to display the newticket
    createTicketElement(
      ticketName,
      ticketDescription,
      ticketProject,
      ticketUser,
      ticketPriority
    );
  } else {
    alert("Please make sure that all fields are entered");
  }
}

// This will add the projects from the project array to the dropdown box
function addProjectToDropdown(projectArray) {
  const projectDowpdown = document.getElementById("project");
  let i = 0;
  while (i < projectArray.length) {
    const projectOption = document.createElement("option");
    let projectOptionText = document.createTextNode(projectArray[i]);
    projectDowpdown.appendChild(projectOption);
    projectOption.appendChild(projectOptionText);
    projectOption.classList.add("addNewTicket-project-option");
    i++;
  }
}

// This will add the users from the user array to the dropdown box
function addUserToDropdown(userArray) {
  const userDowpdown = document.getElementById("user");
  let i = 0;
  while (i < userArray.length) {
    const userOption = document.createElement("option");
    let userOptionText = document.createTextNode(userArray[i]);
    userDowpdown.appendChild(userOption);
    userOption.appendChild(userOptionText);
    userOption.classList.add("addNewTicket-user-option");
    i++;
  }
}

// This function handles new tickets and whether the ticket is conformed or not
function createTicketElement(name, description, project, user, priority) {
  const elementString = `
  <div class="newTicket-element newTicket-element${localStorage.newTicketCounter}">
    <div class="Ticket-name-description" id="newTicket${localStorage.newTicketCounter}">
      <div class="Ticket-name background-shadow" id="newTicket-name${localStorage.newTicketCounter}">
        <h4 class="Ticket-name-heading " id="newTicket-name-heading${localStorage.newTicketCounter}">${name}</h4>
      </div>
      <div class="Ticket-description background-shadow" id="newTicket-description${localStorage.newTicketCounter}">
        <p class="Ticket-description-paragraph" id="newTicket-description-paragraph${localStorage.newTicketCounter}">${description}</p>
      </div>
    </div>
      <div class="Ticket-info" id="newTicket-info${localStorage.newTicketCounter}">
      <div class="project-user-container">
      <div class="Ticket-info-project background-shadow" id="newTicket-info-project${localStorage.newTicketCounter}">
          <p class="Ticket-info-project-display">${project}</p>
        </div>
        <div class="Ticket-info-user background-shadow" id="newTicket-info-user${localStorage.newTicketCounter}">
          <p class="Ticket-info-user-display">${user}</p>
        </div>
        <div class="Ticket-info-priority background-shadow" id="newTicket-info-priority${localStorage.newTicketCounter}">
          <p class="Ticket-info-priority-display">${priority}</p>
        </div>
      </div>                
      </div>
      <div class="Ticket-action" id="newTicket-action${localStorage.newTicketCounter}">
        <button onclick="moveToConfirmed(${localStorage.newTicketCounter})" class="Ticket-action-confirm background-shadow newTicket-action-confirm${localStorage.newTicketCounter}">
          Confirm Ticket
        </button>
        <button onclick="moveToClosed(${localStorage.newTicketCounter})" class="Ticket-action-close background-shadow newTicket-action-close${localStorage.newTicketCounter}">
          Close Ticket
        </button>
      </div>
  </div>`;

  countNewTickets++;
  localStorage.countNewTickets = countNewTickets;

  if (
    localStorage.highPriority != null ||
    localStorage.highPriority != undefined
  ) {
    highPriorityCounter = localStorage.highPriority;
  }

  if (
    localStorage.mediumPriority != null ||
    localStorage.mediumPriority != undefined
  ) {
    mediumPriorityCounter = localStorage.mediumPriority;
  }

  if (
    localStorage.lowPriority != null ||
    localStorage.lowPriority != undefined
  ) {
    lowPriorityCounter = localStorage.lowPriority;
  }

  if (priority === "High") {
    highPriorityCounter++;
    localStorage.highPriority = highPriorityCounter;
  } else if (priority === "Medium") {
    mediumPriorityCounter++;
    localStorage.mediumPriority = mediumPriorityCounter;
  } else if (priority === "Low") {
    lowPriorityCounter++;
    localStorage.lowPriority = lowPriorityCounter;
  }

  // This checks if there is already an array stored in the local storage
  if (
    localStorage.newTicketElements != null ||
    localStorage.newTicketElements != undefined
  ) {
    newTicketElementArray = localStorage.newTicketElements.split(",");
  }

  // Adds the above ^ elementstring into the array
  newTicketElementArray.push(elementString);

  // Displays the new ticketelement in html
  document.getElementById("newTicket-flex").innerHTML += elementString;

  // Stores the edited array in the local storage
  localStorage.newTicketElements = newTicketElementArray.join(",");

  if (
    localStorage.totalTicketCounter != null ||
    localStorage.totalTicketCounter != undefined
  ) {
    totalTicketCounter = localStorage.totalTicketCounter;
  }

  totalTicketCounter++;
  localStorage.totalTicketCounter = totalTicketCounter;
}

// This gets called when the Confirm button is clicked. This function moves the selected element to the confirmed section
const moveToConfirmed = function (ticketNum) {
  increaseConfirmTicketCounter();

  let tempTicketInfoArray = JSON.parse(localStorage.newTicketInfo);
  let name = tempTicketInfoArray[ticketNum - 1][0];
  let description = tempTicketInfoArray[ticketNum - 1][1];
  let project = tempTicketInfoArray[ticketNum - 1][2];
  let user = tempTicketInfoArray[ticketNum - 1][3];
  let priority = tempTicketInfoArray[ticketNum - 1][4];

  let confirmTicketArray = [
    (Name = name),
    (Description = description),
    (Project = project),
    (User = user),
    (Priority = priority),
  ];

  if (
    localStorage.confirmTicketInfo != null ||
    localStorage.confirmTicketInfo != undefined
  ) {
    confirmTicketInfoArrayReal = JSON.parse(localStorage.confirmTicketInfo);
  }
  confirmTicketInfoArrayReal.push(confirmTicketArray);
  localStorage.confirmTicketInfo = JSON.stringify(confirmTicketInfoArrayReal);

  confirmTicketCounter = localStorage.confirmTicketCounter;
  let tempConfirmTicketInfoArray = JSON.parse(localStorage.confirmTicketInfo);
  tempConfirmTicketInfoArray[confirmTicketCounter - 1][0] = name;
  tempConfirmTicketInfoArray[confirmTicketCounter - 1][1] = description;
  tempConfirmTicketInfoArray[confirmTicketCounter - 1][2] = project;
  tempConfirmTicketInfoArray[confirmTicketCounter - 1][3] = user;
  tempConfirmTicketInfoArray[confirmTicketCounter - 1][4] = priority;

  const confirmstring = `
  <div class="confirm-element confirm-element${confirmTicketCounter}">
    <div class="Ticket-name-description" id="newTicket${confirmTicketCounter}">
      <div class="Ticket-name background-shadow" id="confirm-name${confirmTicketCounter}">
        <h4 class="Ticket-name-heading" id="confirm-name-heading${confirmTicketCounter}">${name}</h4>
      </div>
      <div class="Ticket-description background-shadow" id="confirm-description${confirmTicketCounter}">
        <p class="Ticket-description-paragraph" id="confirm-description-paragraph${confirmTicketCounter}">${description}</p>
      </div>
    </div>
    <div class="Ticket-info" id="confirm-info${confirmTicketCounter}">
    <div class="project-user-container">
    <div class="Ticket-info-project background-shadow" id="confirm-info-project${confirmTicketCounter}">
      <p class="Ticket-info-project-display">${project}</p>
    </div>
    <div class="Ticket-info-user background-shadow" id="confirm-info-user${confirmTicketCounter}">
      <p class="Ticket-info-user-display">${user}</p>
    </div>
    <div class="Ticket-info-priority background-shadow" id="confirm-info-priority${confirmTicketCounter}">
        <p class="Ticket-info-priority-display">${priority}</p>
      </div>
    </div>           
    </div>
    <div class="Ticket-action" id="confirm-action${confirmTicketCounter}">
      
      <button onclick="moveToClosed(${confirmTicketCounter})" class="Ticket-action-close background-shadow newTicket-action-close${confirmTicketCounter}">
        Close Ticket
      </button>
    </div>
  </div>`;

  countConfirmedTickets++;
  localStorage.countConfirmedTickets = countConfirmedTickets;

  // This checks if there is already an array stored in the local storage
  if (
    localStorage.confirmTicketElementArray != null ||
    localStorage.confirmTicketElementArray != undefined
  ) {
    confirmTicketElementArray =
      localStorage.confirmTicketElementArray.split(",");
  }

  // Adds the above ^ confirmstring into the array
  confirmTicketElementArray.push(confirmstring);

  //Displays the confirm etelement in html
  document.getElementById("confirmedTicket-flex").innerHTML += confirmstring;

  // Stores the edited array in the local storage
  localStorage.confirmTicketElementArray = confirmTicketElementArray.join(",");

  // This stores the newTicketElement array in a temporary array for the selected element to be removed
  let deletearr = localStorage.newTicketElements.split(",");
  deletearr.splice(ticketNum - 1, 1, "");
  localStorage.newTicketElements = deletearr.join(",");

  // This removes the selected element(as indicated by the confirm button's ID) from the new-ticket-flexbox
  let removeElement = document.querySelector(`.newTicket-element${ticketNum}`);
  removeElement.remove();

  // Decrease Counter NewTickets
  countNewTickets--;
  localStorage.countNewTickets = countNewTickets;
};

const moveToClosed = function (ticketNum) {
  let name = "";
  let description = "";
  let project = "";
  let user = "";
  let priority = "";
  // This checkes if the element has allready been removed from the localstorage
  const storedArrayString = localStorage.newTicketElements;
  let arrDisplay = storedArrayString.split(",");
  console.log(localStorage.confirmTicketInfo);
  if (arrDisplay[ticketNum - 1] != "") {
    let tempTicketInfoArray = JSON.parse(localStorage.newTicketInfo);
    name = tempTicketInfoArray[ticketNum - 1][0];
    description = tempTicketInfoArray[ticketNum - 1][1];
    project = tempTicketInfoArray[ticketNum - 1][2];
    user = tempTicketInfoArray[ticketNum - 1][3];
    priority = tempTicketInfoArray[ticketNum - 1][4];
  } else {
    let tempTicketInfoArray = JSON.parse(localStorage.confirmTicketInfo);
    name = tempTicketInfoArray[ticketNum - 1][0];
    description = tempTicketInfoArray[ticketNum - 1][1];
    project = tempTicketInfoArray[ticketNum - 1][2];
    user = tempTicketInfoArray[ticketNum - 1][3];
    priority = tempTicketInfoArray[ticketNum - 1][4];
  }

  const closedString = `
  <div class="closed-element closed-element${ticketNum}">
    <div class="Ticket-name-description" id="newTicket${localStorage.ticketCounter}">
      <div class="Ticket-name background-shadow" id="confirm-name${ticketNum}">
        <h4 class="Ticket-name-heading" id="closed-name-heading${ticketNum}">${name}</h4>
      </div>
      <div class="Ticket-description background-shadow" id="closed-description${ticketNum}">
        <p class="Ticket-description-paragraph" id="closed-description-paragraph${ticketNum}">${description}</p>
      </div>
    </div>
    <div class="Ticket-info" id="closed-info${ticketNum}">
    <div class="project-user-container">
      <div class="Ticket-info-project background-shadow" id="closed-info-project${ticketNum}">
        <p class="Ticket-info-project-display">${project}</p>
      </div>
      <div class="Ticket-info-user background-shadow" id="closed-info-user${ticketNum}">
        <p class="Ticket-info-user-display">${user}</p>
      </div>
      <div class="Ticket-info-priority background-shadow" id="closed-info-priority${ticketNum}">
        <p class="Ticket-info-priority-display">${priority}</p>
      </div>
    </div>            
    </div>
    <div class="Ticket-action" id="closed-action${ticketNum}">
    </div>
  </div>`;

  countClosedTickets++;
  localStorage.countClosedTickets = countClosedTickets;

  // This checks if there is already an array stored in the local storage
  if (
    localStorage.closeTicketElementArray != null ||
    localStorage.closeTicketElementArray != undefined
  ) {
    closeTicketElementArray = localStorage.closeTicketElementArray.split(",");
  }

  // Adds the above ^ closedString into the array
  closeTicketElementArray.push(closedString);

  //Displays the confirm etelement in html
  document.getElementById("closedTicket-flex").innerHTML += closedString;

  // Stores the edited array in the local storage
  localStorage.closeTicketElementArray = closeTicketElementArray.join(",");

  if (arrDisplay[ticketNum - 1] != "") {
    // This stores the newTicketElement array in a temporary array for the selected element to be removed
    let tempDeletearrNew = localStorage.newTicketElements.split(",");
    tempDeletearrNew.splice(ticketNum - 1, 1, "");
    localStorage.newTicketElements = tempDeletearrNew.join(",");

    // This removes the selected element(as indicated by the confirm button's ID) from the new-ticket-flexbox
    let removeElementNew = document.querySelector(
      `.newTicket-element${ticketNum}`
    );
    removeElementNew.remove();

    // Decrease Counter NewTickets
    countNewTickets--;
    localStorage.countNewTickets = countNewTickets;
  } else {
    // This stores the newTicketElement array in a temporary array for the selected element to be removed

    let tempDeletearrConfirm =
      localStorage.confirmTicketElementArray.split(",");
    tempDeletearrConfirm.splice(ticketNum - 1, 1, "");
    localStorage.confirmTicketElementArray = tempDeletearrConfirm.join(",");

    // This removes the selected element(as indicated by the confirm button's ID) from the new-ticket-flexbox
    let removeElementConfirm = document.querySelector(
      `.confirm-element${ticketNum}`
    );
    removeElementConfirm.remove();

    // Decrease Counter NewTickets
    countConfirmedTickets--;
    localStorage.countConfirmedTickets = countConfirmedTickets;
  }
};
