(function createToastContainer() {
  var container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
})();

function showToast(message, type) {
  var container = document.querySelector('.toast-container');
  if (!container) return;

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + (type === 'error' ? 'error' : 'success');
  toast.textContent = message;

  container.appendChild(toast);

  requestAnimationFrame(function() {
    toast.classList.add('toast-in');
  });

  setTimeout(function() {
    toast.classList.remove('toast-in');
    toast.classList.add('toast-exit');
    setTimeout(function() {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var originalText = '';

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var btn = form.querySelector('[type="submit"], button[type="submit"]');
    if (!btn) return;

    if (btn.disabled) return;

    originalText = btn.textContent || btn.innerHTML || 'Send Message';
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(function() {
      showToast("Message sent — I'll be in touch soon.", 'success');
      form.reset();
      btn.disabled = false;
      btn.textContent = originalText;
    }, 800);
  });
}

function initContact() {
  initContactForm();
}
