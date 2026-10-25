// Waterside Office — the day's Office, with the psalms and lessons printed in full.
// Date policy (same as the site): the phone's local date. Psalms follow the 1662
// day-of-month psalter; lessons follow the Waterside continuous-reading plan from PLAN.epoch.
(function () {
  'use strict';
  var PLAN = window.OFFICE_PLAN, KJV = window.KJV || {};
  var Native = window.OfficeNative || null;
  var root = document.getElementById('office-root');
  var html = document.documentElement;

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function scripture(s) {
    return esc(s).replace(/\bLORD\b/g, '<span class="sc">Lord</span>').replace(/\bGOD\b/g, '<span class="sc">God</span>').replace(/\bJEHOVAH\b/g, '<span class="sc">Jehovah</span>');
  }
  function midnight(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

  var current = midnight(new Date());

  // ── The plan ──
  function dayIndex(d) {
    var e = PLAN.epoch.split('-');
    return Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(+e[0], +e[1] - 1, +e[2])) / 86400000);
  }
  function chapterAt(books, n) {
    var total = books.reduce(function (a, b) { return a + b[1]; }, 0);
    n = ((n % total) + total) % total;
    for (var i = 0; i < books.length; i++) {
      if (n < books[i][1]) return { book: books[i][0], chapter: n + 1 };
      n -= books[i][1];
    }
  }
  var ORDINAL = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
  var TENS = { 20: 'Twentieth', 30: 'Thirtieth', 40: 'Fortieth', 50: 'Fiftieth', 60: 'Sixtieth' };
  var TENS_C = { 20: 'Twenty', 30: 'Thirty', 40: 'Forty', 50: 'Fifty', 60: 'Sixty' };
  function ordinal(n) {
    if (n < 20) return ORDINAL[n - 1];
    var t = Math.floor(n / 10) * 10, u = n % 10;
    return u ? TENS_C[t] + '-' + ORDINAL[u - 1].toLowerCase() : TENS[t];
  }
  function esvUrl(ref) { return 'https://www.esv.org/' + ref.replace(/[–]/g, '-').replace(/\s+/g, '+') + '/'; }

  // ── Psalms ──
  function psalmBlock(ref) {
    var m = /^(\d+)(?::(\d+)-(\d+))?$/.exec(ref);
    var ch = +m[1], verses = (KJV.Psalms || [])[ch - 1] || [];
    var from = m[2] ? +m[2] : 1, to = m[3] ? +m[3] : verses.length;
    var label = m[2] ? 'Psalm ' + ch + ':' + from + '–' + to : 'Psalm ' + ch;
    var out = '<div class="psalm"><h4>' + label + '</h4>';
    if (!verses.length) return out + '<p class="meta">The text of this psalm is missing. Please reinstall the app.</p></div>';
    for (var v = from, i = 0; v <= to; v++, i++) {
      out += '<p class="pv' + (i % 2 ? ' all' : '') + '"><sup>' + v + '</sup>' + scripture(verses[v - 1]) + '</p>';
    }
    out += '<p class="gloria">' + esc(PLAN.gloria).replace(/ : /g, ' <span class="colon">:</span> ') + '</p></div>';
    return out;
  }

  // ── The lesson ──
  function lessonBlock(l, which) {
    var verses = (KJV[l.book] || [])[l.chapter - 1] || [];
    var ref = l.book + ' ' + l.chapter;
    var single = (PLAN.ot.concat(PLAN.nt).filter(function (b) { return b[0] === l.book; })[0] || [0, 2])[1] === 1;
    var out = '<div class="chapter"><h4>' + esc(ref) + '</h4>';
    out += '<p class="rubric">The reader says: Here beginneth ' + (single ? '' : 'the ' + ordinal(l.chapter) + ' Chapter of ') + esc(bookTitle(l.book)) + '.</p>';
    if (!verses.length) return out + '<p class="meta">The text of this chapter is missing. Please reinstall the app.</p></div>';
    out += '<div class="chapter-text">';
    for (var v = 0; v < verses.length; v++) out += '<p class="cv"><sup>' + (v + 1) + '</sup>' + scripture(verses[v]) + '</p>';
    out += '</div><p class="rubric endeth">After the lesson, the reader says: Here endeth the ' + which + ' Lesson.</p>';
    out += '<p class="lesson-tools"><a href="' + esvUrl(ref) + '" rel="noopener">Read ' + esc(ref) + ' in the ESV</a> <span class="meta">(needs a connection)</span></p></div>';
    return out;
  }
  function bookTitle(b) {
    var n = /^(\d) (.*)$/.exec(b);
    var names = { 1: 'First', 2: 'Second', 3: 'Third' };
    if (n) {
      if (/^(Samuel|Kings|Chronicles)$/.test(n[2])) return 'the ' + names[n[1]] + ' Book of ' + n[2];
      if (/^(Corinthians|Thessalonians|Timothy|Peter|John)$/.test(n[2])) return 'the ' + names[n[1]] + ' Epistle ' + (n[2] === 'Peter' || n[2] === 'John' ? 'General ' : '') + 'of ' + (n[2] === 'Corinthians' || n[2] === 'Thessalonians' ? 'Saint Paul to the ' : n[2] === 'Timothy' ? 'Saint Paul to ' : 'Saint ') + n[2];
    }
    var special = {
      Genesis: 'Genesis', Exodus: 'Exodus', Leviticus: 'Leviticus', Numbers: 'Numbers', Deuteronomy: 'Deuteronomy',
      Matthew: 'the Gospel according to Saint Matthew', Mark: 'the Gospel according to Saint Mark', Luke: 'the Gospel according to Saint Luke', John: 'the Gospel according to Saint John',
      Acts: 'the Acts of the Apostles', Romans: 'the Epistle of Saint Paul to the Romans', Galatians: 'the Epistle of Saint Paul to the Galatians',
      Ephesians: 'the Epistle of Saint Paul to the Ephesians', Philippians: 'the Epistle of Saint Paul to the Philippians', Colossians: 'the Epistle of Saint Paul to the Colossians',
      Titus: 'the Epistle of Saint Paul to Titus', Philemon: 'the Epistle of Saint Paul to Philemon', Hebrews: 'the Epistle to the Hebrews',
      James: 'the General Epistle of Saint James', Jude: 'the General Epistle of Saint Jude', Revelation: 'the Revelation of Saint John the Divine',
      Proverbs: 'the Proverbs', Ecclesiastes: 'Ecclesiastes', 'Song of Solomon': 'the Song of Solomon', Lamentations: 'the Lamentations of Jeremiah',
      Ruth: 'the Book of Ruth', Ezra: 'the Book of Ezra', Nehemiah: 'the Book of Nehemiah', Esther: 'the Book of Esther', Job: 'the Book of Job',
      Joshua: 'the Book of Joshua', Judges: 'the Book of Judges'
    };
    if (special[b]) return special[b];
    if (b === '2 John' || b === '3 John') return 'the ' + names[b[0]] + ' Epistle of Saint John';
    return 'the Prophet ' + b; // Isaiah … Malachi
  }

  // ── Render the day ──
  var fmt, fmtYear;
  try {
    fmt = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    fmtYear = new Intl.DateTimeFormat(undefined, { year: 'numeric' });
  } catch (e) { fmt = null; }

  function render() {
    var isSunday = current.getDay() === 0;
    var dom = current.getDate();
    var day = Math.min(dom, 30); // 1662 rubric: on the 31st the psalms of the 30th day are read again
    var idx = dayIndex(current);
    var today = midnight(new Date());
    var diff = Math.round((current - today) / 86400000);

    document.getElementById('office-date').innerHTML = esc(fmt ? fmt.format(current) : current.toDateString()) +
      '<small>' + (diff === 0 ? 'Today' : diff === -1 ? 'Yesterday' : diff === 1 ? 'Tomorrow' : esc(fmtYear ? fmtYear.format(current) : current.getFullYear())) + '</small>';
    document.getElementById('back-today').hidden = diff === 0;
    root.classList.toggle('is-sunday', isSunday);
    root.classList.toggle('is-weekday', !isSunday);
    document.getElementById('date-pick').value = current.getFullYear() + '-' + String(current.getMonth() + 1).padStart(2, '0') + '-' + String(dom).padStart(2, '0');

    ['morning', 'evening'].forEach(function (o, oi) {
      var panel = document.getElementById('panel-' + o);
      var slot = function (name) { return panel.querySelector('[data-slot="' + name + '"]'); };
      var ps = PLAN.psalter[day - 1][oi];
      slot('psalter-day').textContent = 'day ' + day + ', ' + o + (dom === 31 ? ' (the 30th day read again, as the 1662 rubric directs)' : '');
      slot('psalm-refs').textContent = ps.map(function (p) { return 'Psalm ' + p.replace('-', '–'); }).join(', ');
      slot('psalms').innerHTML = ps.map(function (p, i) {
        var b = psalmBlock(p);
        return i ? b.replace('class="psalm"', 'class="psalm full-only"') : b;
      }).join('');
      var lesson = o === 'morning' ? chapterAt(PLAN.ot, idx) : chapterAt(PLAN.nt, idx);
      slot('lesson-ref').textContent = lesson.book + ' ' + lesson.chapter;
      slot('lesson').innerHTML = lessonBlock(lesson, o === 'morning' ? 'First' : 'Second');
    });
    document.querySelectorAll('.psalter tbody tr').forEach(function (tr, i) { tr.classList.toggle('today', i === day - 1); });
  }

  function go(d) { current = midnight(d); render(); window.scrollTo(0, 0); }
  function shift(n) { go(new Date(current.getFullYear(), current.getMonth(), current.getDate() + n)); }
  document.getElementById('prev-day').addEventListener('click', function () { shift(-1); });
  document.getElementById('next-day').addEventListener('click', function () { shift(1); });
  document.getElementById('back-today').addEventListener('click', function () { go(new Date()); });
  var pick = document.getElementById('date-pick');
  document.getElementById('office-date').addEventListener('click', function () {
    try { if (pick.showPicker) { pick.showPicker(); return; } } catch (e) {}
    pick.focus(); pick.click();
  });
  pick.addEventListener('change', function () {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(pick.value);
    if (m) go(new Date(+m[1], +m[2] - 1, +m[3]));
  });

  // Swipe left/right on the text to change day.
  var sx = null, sy = null;
  root.addEventListener('touchstart', function (e) { if (e.touches.length === 1) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; } }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 2.5) shift(dx < 0 ? 1 : -1);
  }, { passive: true });

  // ── Morning / Evening ──
  var tabs = [document.getElementById('tab-morning'), document.getElementById('tab-evening')];
  var panels = [document.getElementById('panel-morning'), document.getElementById('panel-evening')];
  function select(i, focus) {
    tabs.forEach(function (t, j) { t.setAttribute('aria-selected', i === j ? 'true' : 'false'); t.tabIndex = i === j ? 0 : -1; panels[j].hidden = i !== j; });
    if (focus) tabs[i].focus();
    window.scrollTo(0, 0);
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i); });
    t.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); select(1 - i, true); } });
  });
  function byHour() { return new Date().getHours() < 15 ? 0 : 1; } // before 3 p.m. → Morning

  // ── Sheets ──
  var openSheet = null;
  function open(name) {
    close();
    openSheet = document.getElementById('sheet-' + name);
    openSheet.hidden = false;
    openSheet.querySelector('[data-close]').focus();
  }
  function close() { if (openSheet) { openSheet.hidden = true; openSheet = null; return true; } return false; }
  document.querySelectorAll('[data-open]').forEach(function (b) { b.addEventListener('click', function () { open(b.getAttribute('data-open')); }); });
  document.querySelectorAll('.sheet').forEach(function (s) {
    s.addEventListener('click', function (e) { if (e.target === s || e.target.closest('[data-close]')) close(); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.officeBack = function () { return close(); }; // Android back button

  // Section chips scroll within the page
  document.querySelectorAll('.office-index a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ block: 'start' }); }
    });
  });

  // ── Settings ──
  var shortBtn = document.getElementById('short-toggle');
  function setShort(on) { root.classList.toggle('short', on); shortBtn.setAttribute('aria-checked', on ? 'true' : 'false'); store('wo-short', on ? '1' : '0'); }
  shortBtn.addEventListener('click', function () { setShort(shortBtn.getAttribute('aria-checked') !== 'true'); });
  setShort(load('wo-short') === '1');

  var scale = parseFloat(load('wo-scale')) || 1;
  function setScale(s) {
    scale = Math.min(1.8, Math.max(0.8, Math.round(s * 100) / 100));
    html.style.setProperty('--reading-scale', scale);
    document.getElementById('size-label').textContent = Math.round(scale * 100) + '%';
    store('wo-scale', String(scale));
  }
  document.getElementById('size-down').addEventListener('click', function () { setScale(scale - 0.1); });
  document.getElementById('size-up').addEventListener('click', function () { setScale(scale + 0.1); });
  setScale(scale);

  var themeBtns = document.querySelectorAll('[data-theme-choice]');
  function setTheme(t) {
    if (t === 'light' || t === 'dark') html.setAttribute('data-theme', t); else html.removeAttribute('data-theme');
    themeBtns.forEach(function (b) { b.setAttribute('aria-checked', b.getAttribute('data-theme-choice') === (t || 'auto') ? 'true' : 'false'); });
    store('wo-theme', t || 'auto');
    var dark = t === 'dark' || (t !== 'light' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    if (Native && Native.setDark) try { Native.setDark(!!dark); } catch (e) {}
  }
  themeBtns.forEach(function (b) { b.addEventListener('click', function () { setTheme(b.getAttribute('data-theme-choice')); }); });
  setTheme(load('wo-theme') || 'auto');
  if (window.matchMedia) try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { setTheme(load('wo-theme') || 'auto'); }); } catch (e) {}

  var awakeBtn = document.getElementById('awake-toggle');
  var lock = null;
  function applyAwake(on) {
    if (Native && Native.keepAwake) { try { Native.keepAwake(on); } catch (e) {} return; }
    if (on && navigator.wakeLock && document.visibilityState === 'visible') navigator.wakeLock.request('screen').then(function (l) { lock = l; }, function () {});
    else if (!on && lock) { lock.release(); lock = null; }
  }
  function setAwake(on) { awakeBtn.setAttribute('aria-checked', on ? 'true' : 'false'); store('wo-awake', on ? '1' : '0'); applyAwake(on); }
  awakeBtn.addEventListener('click', function () { setAwake(awakeBtn.getAttribute('aria-checked') !== 'true'); });
  setAwake(load('wo-awake') !== '0');

  // Coming back to the app on a new day (or after the 3 p.m. turn) brings up the right Office.
  var shownDay = midnight(new Date()).getTime(), shownHalf = byHour();
  function resume() {
    var now = midnight(new Date()).getTime(), half = byHour();
    if (now !== shownDay && current.getTime() === shownDay) { current = new Date(now); render(); window.scrollTo(0, 0); }
    if (now !== shownDay || half !== shownHalf) select(half);
    shownDay = now; shownHalf = half;
    if (awakeBtn.getAttribute('aria-checked') === 'true') applyAwake(true);
  }
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') resume(); });
  window.addEventListener('focus', resume);

  document.querySelectorAll('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  select(byHour());
  render();
})();
