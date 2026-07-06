function initNavEntrance() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  setTimeout(function() {
    navbar.classList.add('navbar-visible');
  }, 500);
}

function initNavScroll() {
  var navbar = document.querySelector('.navbar');
  var inner = document.querySelector('.navbar-inner, .navbar > .container, .nav-container');
  if (!navbar) return;

  var ticking = false;

  function updateNav() {
    var scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 80) {
      if (inner) {
        inner.style.background = 'color-mix(in oklab, var(--background, #0a0a0a) 85%, transparent)';
        inner.style.backdropFilter = 'blur(24px) saturate(180%)';
        inner.style.webkitBackdropFilter = 'blur(24px) saturate(180%)';
      }
      navbar.classList.add('navbar-scrolled');
    } else {
      if (inner) {
        inner.style.background = 'transparent';
        inner.style.backdropFilter = 'blur(24px) saturate(160%)';
        inner.style.webkitBackdropFilter = 'blur(24px) saturate(160%)';
      }
      navbar.classList.remove('navbar-scrolled');
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateNav();
}

function initMobileMenu() {
  var btn = document.querySelector('.navbar-mobile-btn, [data-mobile-btn]');
  var menu = document.querySelector('.navbar-mobile-menu, [data-mobile-menu]');
  if (!btn || !menu) return;

  var hamburgerSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  var closeSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  btn.addEventListener('click', function() {
    var isOpen = menu.classList.toggle('open');
    btn.innerHTML = isOpen ? closeSvg : hamburgerSvg;
    btn.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  });

  var menuLinks = menu.querySelectorAll('a, button');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      menu.classList.remove('open');
      btn.innerHTML = hamburgerSvg;
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

function initActiveNavLink() {
  var links = document.querySelectorAll('.navbar-link, .nav-link, [data-nav-link]');
  if (!links.length) return;

  var sections = [];
  links.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      var section = document.querySelector(href);
      if (section) {
        sections.push({ link: link, section: section, id: href.replace('#', '') });
      }
    }
  });

  if (!sections.length) return;

  var ticking = false;

  function updateActive() {
    var scrollY = window.scrollY || window.pageYOffset;
    var currentId = null;

    sections.forEach(function(item) {
      var sectionTop = item.section.offsetTop;
      var sectionBottom = sectionTop + item.section.offsetHeight;
      if (scrollY + 120 >= sectionTop && scrollY + 120 < sectionBottom) {
        currentId = item.id;
      }
    });

    if (currentId) {
      sections.forEach(function(item) {
        if (item.id === currentId) {
          item.link.classList.add('active');
        } else {
          item.link.classList.remove('active');
        }
      });
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateActive);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateActive();
}

function initNavbar() {
  initNavEntrance();
  initNavScroll();
  initMobileMenu();
  initActiveNavLink();
}
