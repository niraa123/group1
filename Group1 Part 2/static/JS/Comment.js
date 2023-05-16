class Comment {
  constructor(hairdresser, client, rating, description) {
    this.hairdresser = hairdresser;
    this.client = client;
    this.date = this.getDate();
    this.rating = rating;
    this.description = description;
  }

  getDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const fullDate = day + '/' + month + '/' + year;
    return fullDate;
  }

  toHTML() {
    return `<div class="comment">
              <div class="comment-content">
                <h3>${this.client.name}</h3>
                <div class="show-date">${this.date}</div>
                <div class="rating">${this.getRatingInStars()}</div>
                <p>${this.description}</p>
              </div>
            </div>`;
  }

  getRatingInStars() {
    let ratingInStars = '';
    for (let i = 0; i < 5; i++) {
      if (i < this.rating) {
        ratingInStars += '<span class="star yellow">&#9733;</span>';
      } else {
        ratingInStars += '<span class="star">&#9733;</span>';
      }
    }
    return ratingInStars;
  }
}