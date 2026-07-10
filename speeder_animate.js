/* ═══════════════════════════════════════════════════════
   SPEEDER ANIMATE — 共享JS触发脚本
   在页面 </body> 前引入即可
   自动给 .anim-* 元素在进入视口时添加 .on 类
══════════════════════════════════════════════════════ */

(function () {
  var OBS = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

  function addOn(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            el.classList.add('on');
            obs.unobserve(el);
          }
        });
      }, OBS);
      obs.observe(el);
    });
  }

  // Title, typewriter, cards, glows, slide-line
  ['.anim-title', '.anim-type', '.anim-card', '.anim-glow', '.anim-slide-line',
   '.anim-counter-item', '.anim-blur', '.anim-scale', '.anim-gradient-text',
   '.anim-slide-right', '.anim-sep-line'].forEach(addOn);

  // Particles (created dynamically per page)
  function spawnParticles(wrapId, positions) {
    var wrap = document.getElementById(wrapId);
    if (!wrap) return;
    var defaults = [8, 20, 33, 47, 60, 74, 88];
    var durations = [4.2, 5.5, 4.8, 5, 4.5, 5.8, 4];
    var delays = [0, 0.9, 1.8, 0.4, 2.1, 0.7, 3];
    defaults.forEach(function (pos, i) {
      if (positions && positions[i]) pos = positions[i];
      var dot = document.createElement('div');
      dot.className = 'anim-particle';
      var w = 3 + Math.random() * 3;
      dot.style.cssText = 'left:' + pos + '%;width:' + w + 'px;height:' + w + 'px;--dur:' + durations[i] + 's;--del:' + delays[i] + 's';
      wrap.appendChild(dot);
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { dot.classList.add('on'); obs.unobserve(dot); }
        });
      }, { threshold: 0 });
      obs.observe(dot);
    });
  }

  // Expose globally so pages can call spawnParticles
  window.spawnParticles = spawnParticles;

  // Immediately trigger animations for elements already in viewport (hero)
  // Forces a reflow before adding .on so transitions actually fire
  function triggerVisibleImmediately() {
    var heroSlideRight = document.querySelectorAll('.hero-cards .anim-slide-right');
    var heroType = document.querySelectorAll('.hero-text-block .anim-type');

    // Step 1: Force cards back to start state (opacity:0, transform:translateX)
    // This is needed because cardSpringIn may have already finished during splash
    heroSlideRight.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(100px)';
    });
    heroType.forEach(function(el) {
      el.style.opacity = '0';
      el.style.width = '0';
    });

    // Step 2: Force reflow (getBoundingClientRect) to ensure browser registers the reset
    void document.body.getBoundingClientRect();

    // Step 3: Add .on with a small delay to ensure transition fires
    setTimeout(function() {
      heroSlideRight.forEach(function(el) {
        el.classList.add('on');
      });
      heroType.forEach(function(el) {
        el.classList.add('on');
      });
    }, 50);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', triggerVisibleImmediately);
  } else {
    triggerVisibleImmediately();
  }

  // Counters
  document.querySelectorAll('.cnt').forEach(function (el) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var target = parseFloat(el.dataset.t);
        var isFloat = String(target).indexOf('.') > -1;
        var dur = 1800, start = performance.now();
        function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = isFloat ? (target * eased).toFixed(1) : Math.floor(target * eased);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.2 });
    obs.observe(el);
  });
})();
