/* ===== Preloader ===== */
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  preloader.classList.add('hide');
  setTimeout(() => { preloader.style.display = 'none'; }, 600);
}

window.addEventListener('load', () => {
  setTimeout(hidePreloader, 1000);
  document.getElementById('year').textContent = new Date().getFullYear();
  updateLocalTime();
  setInterval(updateLocalTime, 1000);
});

/* ===== Local Clock ===== */
function updateLocalTime() {
  const clock = document.getElementById('local-time');
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: false
  });
}

/* ===== Dark Mode ===== */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const isDark = localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) { root.classList.add('dark'); toggle.innerHTML = '<i class="fas fa-sun"></i>'; }
  else { toggle.innerHTML = '<i class="fas fa-moon"></i>'; }

  toggle.addEventListener('click', () => {
    root.classList.toggle('dark');
    const dark = root.classList.contains('dark');
    localStorage.theme = dark ? 'dark' : 'light';
    toggle.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
}
initTheme();

/* ===== Mobile Menu ===== */
function initMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-menu');
  const links = document.querySelectorAll('.mobile-menu__link');

  function toggle() {
    const isOpen = menu.classList.toggle('mobile-menu--open');
    menu.style.opacity = isOpen ? '1' : '0';
    menu.style.pointerEvents = isOpen ? 'auto' : 'none';
  }

  openBtn.addEventListener('click', toggle);
  closeBtn.addEventListener('click', toggle);
  links.forEach(link => link.addEventListener('click', toggle));
}
initMobileMenu();

/* ===== ScrollSpy & Scroll To Top ===== */
function initScrollSpy() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  const sections = document.querySelectorAll('.section-spy');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    /* Scroll to top button visibility */
    if (window.scrollY > 300) {
      scrollBtn.classList.add('scroll-top--visible');
    } else {
      scrollBtn.classList.remove('scroll-top--visible');
    }

    /* Active link detection */
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      if (pageYOffset >= top - 200) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('nav__link--active');
      }
    });
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
initScrollSpy();

/* ===== Project Modal ===== */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const content = document.getElementById('modal-content');
  const closeBtn = document.getElementById('close-modal');
  const triggers = document.querySelectorAll('.project-trigger');

  const titleEl = document.getElementById('modal-title');
  const categoryEl = document.getElementById('modal-category');
  const imageEl = document.getElementById('modal-image');
  const descEl = document.getElementById('modal-desc');

  function open(data) {
    titleEl.textContent = data.title;
    categoryEl.textContent = data.category;
    imageEl.src = data.image;
    descEl.textContent = data.desc;

    modal.style.display = 'block';
    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
      content.style.transform = 'scale(1)';
      content.style.opacity = '1';
    });
    document.body.style.overflow = 'hidden';
  }

  function close() {
    backdrop.style.opacity = '0';
    content.style.transform = 'scale(0.95)';
    content.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  triggers.forEach(el => {
    el.addEventListener('click', () => {
      open({
        title: el.dataset.title,
        category: el.dataset.category,
        image: el.dataset.image,
        desc: el.dataset.desc
      });
    });
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
initProjectModal();

/* ===== Contact Form ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      showToast('Message sent successfully! I will get back to you soon.');
      form.reset();
      btn.innerHTML = original;
      btn.disabled = false;
    }, 1500);
  });
}
initContactForm();

/* ===== Toast Notifications ===== */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');

  const icon = type === 'success'
    ? '<i class="fas fa-check-circle"></i>'
    : '<i class="fas fa-exclamation-circle"></i>';
  const colorClass = type === 'success' ? 'toast--success' : 'toast--error';

  toast.className = `toast ${colorClass} toast--enter toast--enter-active`;
  toast.innerHTML = `${icon} <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('toast--enter-active');
    toast.classList.add('toast--exit-active');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ===== Scroll Reveal ===== */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
initScrollReveal();

/* ===== Magnetic Button Effect ===== */
function initMagneticEffect() {
  if (!window.matchMedia('(min-width: 768px)').matches) return;

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}
initMagneticEffect();

/* ===== Spotlight Effect ===== */
function initSpotlightEffect() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
initSpotlightEffect();

/* ===== 3D Tilt on Project Cards ===== */
function initTiltEffect() {
  if (!window.matchMedia('(min-width: 768px)').matches) return;

  document.querySelectorAll('.project-card__image-wrap').forEach(wrap => {
    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -3;
      const ry = ((x - cx) / cx) * 3;
      wrap.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    wrap.addEventListener('mouseleave', () => {
      wrap.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}
initTiltEffect();

/* ===== Parallax on Scroll ===== */
function initParallax() {
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax-img').forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (visible) {
        const y = (window.innerHeight - rect.top) * 0.08;
        img.style.transform = `translateY(${y - 20}px) scale(1.1)`;
      }
    });
  });
}
initParallax();
