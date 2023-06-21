const hairdressersList = document.getElementById("hairdressers-list");
const bookHairdresserButton = document.querySelector('.book-hairdresser-button');
const rateHairdresserButton = document.querySelector('.rate-hairdresser-button');
let selectedHairdresser = null;


// Disable buttons initially
bookHairdresserButton.disabled = true;
rateHairdresserButton.disabled = true;

hairdressersList.addEventListener("click", (event) => {
  const hairdresserBox = event.target.closest(".hairdresser-box");
  if (!hairdresserBox) return;

  if (hairdresserBox === selectedHairdresser) {
    console.log("Same hairdresser box clicked");
    selectedHairdresser.classList.remove("selected");
    selectedHairdresser = null;
    bookHairdresserButton.disabled = true;
    rateHairdresserButton.disabled = true;
  } else {
    console.log("New hairdresser box clicked");
    if (selectedHairdresser) {
      selectedHairdresser.classList.remove("selected");
    }
    selectedHairdresser = hairdresserBox;
    selectedHairdresser.classList.add("selected");
    bookHairdresserButton.disabled = false;
    rateHairdresserButton.disabled = false;

    const selectedHairdresserEmail = selectedHairdresser.querySelector('.hairdresser-details p:first-of-type').textContent.trim();
    document.querySelector('input[name="selectedHairdresserBook"]').value = selectedHairdresserEmail;
    document.querySelector('input[name="selectedHairdresserRate"]').value = selectedHairdresserEmail;
    console.log(selectedHairdresserEmail);
  }
});

bookHairdresserButton.addEventListener('click', () => {
  if (selectedHairdresser) {
    console.log(selectedHairdresser);
    const selectedHairdresserEmail = selectedHairdresser.querySelector('.hairdresser-details p:first-of-type').textContent.trim();
    console.log(selectedHairdresserEmail);
    document.querySelector('input[name="selectedHairdresserBook"]').value = selectedHairdresserEmail;
    const bookForm = document.querySelector('form[action="/Book"]');
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    bookForm.dispatchEvent(submitEvent);
  }
});

rateHairdresserButton.addEventListener('click', () => {
  console.log('Rate button clicked');
  if (selectedHairdresser) {
    const selectedHairdresserEmail = selectedHairdresser.querySelector('.hairdresser-details p:first-of-type').textContent.trim();
    console.log(selectedHairdresserEmail);
    document.querySelector('input[name="selectedHairdresserRate"]').value = selectedHairdresserEmail;
    const rateForm = document.querySelector('form[action="/Rate"]');
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    rateForm.dispatchEvent(submitEvent);
  }
});
