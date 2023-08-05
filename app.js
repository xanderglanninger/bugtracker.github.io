document.addEventListener("DOMContentLoaded", function () {
  const addNewProject = function (projectName) {
    const newProjectElement = document.createElement("div");
    newProjectElement.className = "project background-project-shadow";
    newProjectElement.textContent = projectName;
    addprojectcontainer.appendChild(newProjectElement);
  };

  let mainprojectsArray = [];
  const addbtn = document.querySelector(".add-project-button");
  const clearbtn = document.querySelector(".clear-project-button");
  const addprojectcontainer = document.querySelector(
    ".dynamic-project-container"
  );
  const projectNameElement = document.getElementById("new-project-name");

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

  clearbtn.addEventListener("click", function () {
    mainprojectsArray = [];
    localStorage.projectarrays = mainprojectsArray;
  });
});
