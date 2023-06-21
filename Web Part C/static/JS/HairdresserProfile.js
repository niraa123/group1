

const clients = [
  new Client('Sarit', 'sarit@gmail.com', '123456', '052-3698523'),
  new Client('Amit', 'amit@walla.com', 'amit555', '053-8975656'),
  new Client('Dani', 'dani@gmail.com', '098765', '052-3692145')
];

const comments = [
  new Comment('Great Clips', clients[2], 3, 'I have been coming to this hairdresser for years, and I always leave happy with my haircut. The staff is skilled and friendly, and they always make me feel welcome.' +
      ' I would highly recommend this salon to anyone looking for a great haircut!'),
  new Comment('Great Clips', clients[1], 5, 'I had a great experience at this salon! The staff was friendly and knowledgeable, and they really listened to what I wanted.' +
      ' My hair turned out beautifully and I left feeling like a new person..'),
  new Comment('Great Clips', clients[0], 1, "Unfortunately, my experience at this salon was not great. The hairdresser seemed distracted and rushed, and didn't really take the time to listen to what I wanted." +
      " The end result was not what I had hoped for, and I left feeling disappointed")
];

const commentsList = document.getElementById('comments-list');

comments.forEach(comment => {
  const commentElement = document.createElement('div');
  commentElement.classList.add('comment-box');
  commentElement.innerHTML = comment.toHTML();
  commentsList.appendChild(commentElement);
});

const hairdressers = [
  new Hairdresser(
      "Great Clips",
      3,
      "We are a walk-in hair salon that offers quality haircuts to adults and kids at a great price.",
      "456 Oak St, Anytown, USA",
      "555-234-5678",
      "$$"
  )
];

const hairdressersList = document.getElementById("hairdressers-list");
hairdressers.forEach((hairdresser) => {
  const hairdresserElement = document.createElement("div");
  hairdresserElement.classList.add("hairdresser-box");
  hairdresserElement.innerHTML = hairdresser.toHTML();
  hairdressersList.appendChild(hairdresserElement);
});
