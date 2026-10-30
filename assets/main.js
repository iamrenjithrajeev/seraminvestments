(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = ((i % 3) * 0.08) + 's';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Careers accordion
  document.querySelectorAll('.role > button').forEach(function (b) {
    b.addEventListener('click', function () {
      var role = b.parentElement;
      var wasOpen = role.classList.contains('open');
      document.querySelectorAll('.role').forEach(function (r) {
        r.classList.remove('open');
        r.querySelector('button').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) { role.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
    });
  });

  // Contact topic chips + form
  var topicInput = document.getElementById('topic');
  document.querySelectorAll('.topic').forEach(function (t) {
    t.addEventListener('click', function () {
      document.querySelectorAll('.topic').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      t.setAttribute('aria-pressed', 'true');
      if (topicInput) topicInput.value = t.textContent;
    });
  });
  var form = document.getElementById('enquiry');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var label = document.getElementById('topic-label');
      if (label && topicInput) label.textContent = topicInput.value.toLowerCase();
      form.classList.add('sent');
      window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
    });
    var again = document.getElementById('again');
    if (again) again.addEventListener('click', function () { form.reset(); form.classList.remove('sent'); });
  }

  // Deep link to a role (careers.html#senior)
  if (location.hash) {
    var r = document.getElementById(location.hash.slice(1));
    if (r && r.classList.contains('role')) r.querySelector('button').click();
  }
})();
