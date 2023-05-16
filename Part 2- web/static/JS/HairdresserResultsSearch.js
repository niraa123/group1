const hairdressers = [
  new Hairdresser(
      "SuperCuts",
      4,
      "We are a family-friendly hair salon specializing in haircuts for men, women, and kids.",
      "123 Main St, Anytown, USA",
      "555-123-4567",
      "$"
  ),
  new Hairdresser(
      "Great Clips",
      3,
      "We are a walk-in hair salon that offers quality haircuts to adults and kids at a great price.",
      "456 Oak St, Anytown, USA",
      "555-234-5678",
      "$$"
  ),
  new Hairdresser(
      "Fantastic Sams",
      5,
      "We offer haircuts, styles, up-dos, perms, coloring, and more.",
      "789 Elm St, Anytown, USA",
      "555-345-6789",
      "$$$"
  ),
];


const hairdressersList = document.getElementById("hairdressers-list");

hairdressers.forEach((hairdresser) => {
  const hairdresserElement = document.createElement("div");
  hairdresserElement.classList.add("hairdresser-box"); // added class for styling purposes
  hairdresserElement.innerHTML = hairdresser.toHTML();
  hairdressersList.appendChild(hairdresserElement);


});
const rateHairdresserButton = document.querySelector('.rate-hairdresser-button');
const bookHairdresserButton = document.querySelector('.book-hairdresser-button');
let selectedHairdresser = null;

// Disable buttons initially
rateHairdresserButton.disabled = true;
bookHairdresserButton.disabled = true;

const hairdresserBoxes = document.querySelectorAll(".hairdresser-box");

hairdresserBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box === selectedHairdresser) {
      // If the same hairdresser is clicked twice, remove the "selected" class and disable the buttons
      selectedHairdresser.classList.remove("selected");
      selectedHairdresser = null;
      rateHairdresserButton.disabled = true;
      bookHairdresserButton.disabled = true;
    } else {
      // If a new hairdresser is clicked, remove the "selected" class from all hairdresser boxes and enable the buttons
      hairdresserBoxes.forEach((box) => box.classList.remove("selected"));
      selectedHairdresser = box;
      selectedHairdresser.classList.add("selected");
      rateHairdresserButton.disabled = false;
      bookHairdresserButton.disabled = false;
    }
  });

  // Disable context menu (right click) on hairdresser boxes to prevent accidental removal of selected hairdresser
  box.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
});