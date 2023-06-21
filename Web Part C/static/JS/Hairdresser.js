class Hairdresser {
  constructor(name, rating, description, address, phoneNumber, priceLevel, openingHours = []) {
    this.name = name;
    this.rating = rating;
    this.description = description;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.priceLevel = priceLevel;
    this.openingHours = openingHours;
  }


  getRatingInStars() {
    let ratingInStars = "";
    for (let i = 0; i < 5; i++) {
      if (i < this.rating) {
        ratingInStars += "<span class='star yellow'>&#9733;</span>";
      } else {
        ratingInStars += "<span class='star'>&#9733;</span>";
      }
    }
    return ratingInStars;
  }

  toHTML() {
    return `<div class="hairdresser">
              <div class="hairdresser-details">
                <h3>${this.name}</h3>
                <div class="rating">${this.getRatingInStars()}</div>
                <p>${this.description}</p>
                <p>${this.address}</p>
                <p>${this.phoneNumber}</p>
                <p>Price level: ${this.priceLevel}</p>
              </div>
            </div>`;
  }
}


