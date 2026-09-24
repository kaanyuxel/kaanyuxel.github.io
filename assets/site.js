// İşletim sistemi sekmeleri ve kod kopyalama düğmeleri
(function () {
  var KEY = 'secili-os';

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(os) {
    try { localStorage.setItem(KEY, os); } catch (e) {}
  }
  function detect() {
    var ua = navigator.userAgent;
    if (/Windows/i.test(ua)) return 'windows';
    if (/Mac/i.test(ua)) return 'macos';
    return 'linux';
  }

  var groups = [];

  function select(os) {
    groups.forEach(function (g) {
      var has = g.panels.some(function (p) { return p.dataset.os === os; });
      var target = has ? os : g.panels[0].dataset.os;
      g.panels.forEach(function (p, i) {
        var on = p.dataset.os === target;
        p.hidden = !on;
        g.buttons[i].setAttribute('aria-selected', on);
        g.buttons[i].tabIndex = on ? 0 : -1;
      });
    });
  }

  document.querySelectorAll('.os-tabs').forEach(function (box) {
    var panels = Array.prototype.filter.call(box.children, function (el) {
      return el.classList.contains('os-tab');
    });
    if (!panels.length) return;
    var bar = document.createElement('div');
    bar.className = 'os-tabbar';
    bar.setAttribute('role', 'tablist');
    var buttons = panels.map(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.textContent = p.dataset.label || p.dataset.os;
      b.addEventListener('click', function () {
        save(p.dataset.os);
        select(p.dataset.os);
      });
      bar.appendChild(b);
      return b;
    });
    box.insertBefore(bar, box.firstChild);
    box.classList.add('ready');
    groups.push({ panels: panels, buttons: buttons });
  });

  if (groups.length) select(saved() || detect());

  document.querySelectorAll('.content pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy';
    btn.textContent = 'Kopyala';
    btn.addEventListener('click', function () {
      var text = pre.innerText.replace(/\n$/, '');
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Kopyalandı';
        setTimeout(function () { btn.textContent = 'Kopyala'; }, 1500);
      });
    });
    pre.appendChild(btn);
  });
})();
