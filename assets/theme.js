(function () {
  var themes = ['luxury', 'editorial'];
  var t = null;
  try {
    var q = new URLSearchParams(location.search).get('theme');
    if (themes.indexOf(q) > -1) { t = q; localStorage.setItem('seram-theme', q); }
    if (!t) t = localStorage.getItem('seram-theme');
  } catch (e) {}
  if (themes.indexOf(t) < 0) t = 'luxury';
  document.documentElement.setAttribute('data-theme', t);
})();
