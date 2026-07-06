
function isMobile() {
  return window.innerWidth < 768;
}

function initRippleEffect() {
  var buttons = document.querySelectorAll('.hero-btn-primary, .contact-split-btn, .navbar-cta');
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var rect = btn.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--ripple-x', x + '%');
      btn.style.setProperty('--ripple-y', y + '%');
    }, { passive: true });
  });
}

window.onerror = function(msg, source, line, col, err) {
  console.error('Global error:', msg, 'at', source, line + ':' + col);
  return true;
};

document.addEventListener('DOMContentLoaded', function() {
  try {
    initNavbar();
    initAnimations();
    initScroll();
    initContact();
    initProjects();
    initRippleEffect();
  } catch (err) {
    console.error('Initialization error:', err);
  }
});
