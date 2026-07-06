
function initScrollReveal() {
  var reveals = document.querySelectorAll('[data-reveal]');
  if (!reveals.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;

      var direction = el.dataset.revealDirection || 'up';
      var delay = parseInt(el.dataset.revealDelay) || 0;

      el.style.transitionDelay = delay + 'ms';

      if (el.classList.contains('reveal-stagger')) {
        var children = el.children;
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          child.classList.add('reveal', 'reveal-' + direction);

          var staggerDelay = Math.round(80 * (1 - Math.pow(0.7, i)));
          child.style.transitionDelay = staggerDelay + 'ms';
        }

        requestAnimationFrame(function() {
          for (var i = 0; i < children.length; i++) {
            children[i].classList.add('reveal-visible');
          }
        });
      }

      requestAnimationFrame(function() {
        el.classList.add('reveal-visible');
      });

      observer.unobserve(el);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(function(el) {
    observer.observe(el);
  });
}

function initSkillBars() {
  var fills = document.querySelectorAll('[data-width]');
  if (!fills.length) return;

  fills.forEach(function(fill) {
    var targetWidth = fill.getAttribute('data-width') || '0%';

    var parent = fill.closest('.skill-bar-group') || fill.parentElement;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        fill.style.width = targetWidth;
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    observer.observe(parent);
  });
}

function initCounters() {
  var counters = document.querySelectorAll('[data-counter-value]');
  if (!counters.length) return;

  counters.forEach(function(counter) {
    var target = parseFloat(counter.getAttribute('data-counter-value')) || 0;
    var duration = 2000;
    var hasDecimal = target % 1 !== 0;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        var startTime = null;

        function easeOutExpo(t) {
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function animate(now) {
          if (!startTime) startTime = now;
          var elapsed = now - startTime;
          var progress = Math.min(elapsed / duration, 1);
          var easedProgress = easeOutExpo(progress);
          var current = easedProgress * target;

          if (hasDecimal) {
            counter.textContent = current.toFixed(1);
          } else {
            counter.textContent = Math.floor(current);
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            counter.textContent = hasDecimal ? target.toFixed(1) : target;
          }
        }

        requestAnimationFrame(animate);
      });
    }, { threshold: 0.2 });

    observer.observe(counter);
  });
}

function initJourneyVideo() {
  var btn = document.querySelector('.journey-video-btn');
  var fills = document.querySelectorAll('.journey-video-bar-fill');
  if (!btn) return;

  var isPlaying = true;

  var playIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;"><polygon points="5,3 19,12 5,21"/></svg>';
  var pauseIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';

  function updateFills(playing) {
    fills.forEach(function(fill, index) {
      var delay = index * 200;
      setTimeout(function() {
        fill.style.transition = 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        fill.style.width = playing ? '100%' : '0%';
      }, delay);
    });
  }

  btn.addEventListener('click', function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      btn.innerHTML = pauseIcon + ' <span>Pause reel</span>';
    } else {
      btn.innerHTML = playIcon + ' <span>Play reel</span>';
    }
    updateFills(isPlaying);
  });

  updateFills(true);
}

function initAnimations() {
  try {
    initScrollReveal();
    initSkillBars();
    initCounters();
    initJourneyVideo();
  } catch (err) {
    console.error('Animation init error:', err);
  }
}
