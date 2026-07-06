function initProjectCards() {
  var cards = document.querySelectorAll('.feature-card');
  if (!cards.length) return;

  cards.forEach(function(card) {
    var link = card.closest('a') || card.querySelector('a');
    if (!link) return;

    card.addEventListener('click', function(e) {
      if (e.target.closest('a, button, [data-link]')) return;
      if (link.getAttribute('href') && link.getAttribute('href') !== '#') {
        window.open(link.getAttribute('href'), link.getAttribute('target') || '_self');
      }
    });

    card.style.cursor = 'pointer';
  });
}

function initProjects() {
  initProjectCards();
}
