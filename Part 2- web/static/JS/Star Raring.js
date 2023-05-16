const stars = document.querySelectorAll('.rating input[type="radio"]');

stars.forEach(function(star, index) {
  star.addEventListener('change', function() {
    for (let i = stars.length - 1; i >= index; i--) {
      if(stars[i].checked){
        for (let j = i; j >= index; j--) {
          stars[j].parentNode.classList.add('selected');
        }
        for (let k = i + 1; k < stars.length; k++) {
          stars[k].parentNode.classList.remove('selected');
        }
        break;
      }
    }
  });
});
