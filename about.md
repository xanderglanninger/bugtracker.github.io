# Bug Tracker V1

## Developers:

1. Xander Glanninger - 577569@student.belgiumcampus.ac.za
1. Jan Albert Mentz - 577118@student.belgiumcampus.ac.za
1. Vernon Engelbrecht - 578593@student.belgiumcampus.ac.za
1. Zander Schoeman - 577496@student.belgiumcampus.ac.za

## Introduction

In the ever-evolving landscape of software development, the ability to efficiently manage and address bugs is of paramount importance. Imagine a world where tracking and resolving software glitches becomes not just a task, but a seamless and intuitive experience. This journey embarks on the creation of a bug tracker web application, where the dynamic trio of HTML, JavaScript, and CSS converge to revolutionize the bug tracking process.

## Login Form (Index.html)

We named this our index file, because this is the first page that should be displayed when the user views our app. The user will be provided with a login form where he/she should enter the correct username and password to continue. After completing the login phase, the user will then be directed to the Dashboard.

### login Credentials:

- Username: **admin**
- Password: **admin**

## Dashboard (Dashboard.html)

This form serves as a summary of all the important information within the app. It displays the total new tickets, confirmed tickets, closed tickets, tickets with a high/medium/low priority, the total users, the total projects, and the complete total of all the tickets created on your computer. All the information regarding the tickets, users and projects is saved as counters within the local storage of your device (your pc/laptop). Every time a new ticket, new user or new project is created, it receives the current counter from the local storage, increments it and stores the incremented counter back into the local storage. Every time the web page gets refreshed, the newly updated counters will be displayed within the Dashboard.

The Dashboard allows the user to create a new project. The newly created project gets stored in an array within the local storage. A list off all the projects created on your device will be displayed within the dashboard.

The Dashboard also allows the user to create new users. The users will be stored in an array within the local storage of your device.

## Tickets (Tickets.html)

This form enables the user to create new tickets, confirm ticket and close tickets. The tickets page(tickets.html) will make use of the project array (stored in local storage) and users’ array (also stored in local storage) to enable the user to assign a project and a user to the ticket. The user and project array will be updated every time a new user or project is created.

### How the logic of the tickets form work (tickets.js)

When the admin(user) creates a new ticket, the ticket name, description, project, user and priority is stored within a newly created object. The newly created object is then stored in an array within the local storage. When the moveToClosed function gets called. JavaScript must first determine if the moveToClosed function was called within the new Tickets section or the confirmed tickets section. As soon as the user selects the "close ticket" button, the selected ticket's information gets erased from the new ticket array and stored in a newly created object (ClosedTickets). The newly created object is then stored in the close ticket array within the local storage.

When the admin(user) selects the confirm button. The same logic as the close button is applied. The selected ticket gets removed from the new ticket array and stored in a newly created object. The newly created object then gets stored in the confirmed ticket array within the local storage.

## Reminders

We kept the CSS and JavaScript files separate for the three html documents to make sure that there are no duplicate class names and ids used within the three html documents.

## Link to GitHub

link: https://github.com/xanderglanninger/bugtracker.github.io

## Link to app

link: https://xanderglanninger.github.io/bugtracker.github.io/
