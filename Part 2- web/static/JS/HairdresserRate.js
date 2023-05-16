// Create a new Hairdresser object
const newHairdresser = new Hairdresser(
    "Nir Hairdresser",
    4.5,
    "A trendy salon in the heart of the city",
    "123 Main St",
    "555-555-5555",
    "$$"
);

// Update the rating name with the hairdresser's name
const ratingName = document.querySelector(".container h2");
ratingName.innerHTML = `Please rate your experience at <br>${newHairdresser.name}:`;

// Add event listener to the rate button
const rateButton = document.querySelector(".rate-button");
rateButton.addEventListener("click", handleRate);

// Rate the hairdresser
function handleRate() {
  const rating = document.querySelector('input[name="rating"]:checked');
  const comment = document.querySelector("textarea").value;
  if (rating && comment) {
    newHairdresser.rating = parseFloat(rating.value);
    newHairdresser.isRated = true;
    alert(`Thank you for rating ${newHairdresser.name}!`);
  } else if (!rating) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Please select a rating";
    errorMessage.style.color = "red";
    document.querySelector(".container").appendChild(errorMessage);
    setTimeout(() => {
      errorMessage.remove();
      rateButton.disabled = false;
    }, 3000);
    rateButton.disabled = true;
  }else if (!comment) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Please leave a comment";
    errorMessage.style.color = "red";
    document.querySelector(".container").appendChild(errorMessage);
    setTimeout(() => {
      errorMessage.remove();
      rateButton.disabled = false;
    }, 3000);
    rateButton.disabled = true;
  }
}

// Add event listener to the cancel button
const cancelButton = document.querySelector(".cancel-button");
cancelButton.addEventListener("click", handleCancel);

// Cancel the rating
function handleCancel() {
  if (newHairdresser.isRated) {
    newHairdresser.rating = 4.5;
    newHairdresser.isRated = false;
  }
  const ratingInputs = document.querySelectorAll('input[name="rating"]');
  ratingInputs.forEach(input => input.checked = false);
  document.querySelector("textarea").value = "";
  alert(`Your rating for ${newHairdresser.name} has been cancelled.`);
}
