
function smoothScrollTo(targetY, duration) {
  duration = duration || 900;
  var startY = window.scrollY || window.pageYOffset;
  var diff = targetY - startY;
  var startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(now) {
    if (!startTime) startTime = now;
    var elapsed = now - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + diff * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function initAnchorScroll() {
  var links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href === '#' || href === '') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      var navbarHeight = 80;
      var targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      smoothScrollTo(targetPosition);
    }, { passive: false });
  });
}

function initScrollToTop() {
  var btn = document.querySelector('.footer-back-to-top');
  if (!btn) return;

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScrollTo(0, 700);
  }, { passive: false });
}

function initScroll() {
  initAnchorScroll();
  initScrollToTop();
}
