// Waterside Office — builds the app page (web/) from the Waterside Press site's own content.
//
// The liturgy, canticles, collects and hymns are imported from the site repository
// (content/office.mjs, content/hymns.mjs), so the app and the site never drift apart.
// The psalms and lessons are printed in full from the King James Version (data/kjv.json),
// so the app works with no signal.
//
//   SITE_DIR=../waterside-press node tools/build.mjs
//
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = resolve(process.env.SITE_DIR || join(ROOT, 'site'));
if (!existsSync(join(SITE, 'content/office.mjs'))) {
  console.error(`Waterside Press site not found at ${SITE}. Set SITE_DIR to a checkout of atashworth/waterside-press.`);
  process.exit(1);
}
const off = await import(pathToFileURL(join(SITE, 'content/office.mjs')).href);
const hymns = await import(pathToFileURL(join(SITE, 'content/hymns.mjs')).href);
const modern = await import(pathToFileURL(join(ROOT, 'tools/modern.mjs')).href);
const OUT = join(ROOT, 'web');

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── Rendering helpers (the site's five treatments of liturgical text) ──
const kindLabel = { scripture: 'Scripture · ESV', kjv: 'Scripture · KJV', historic: 'Historic text', original: 'Waterside Press original', arrangement: 'Waterside arrangement' };
const kind = (k) => `<span class="kind">${kindLabel[k]}</span>`;
const src = (k, text) => `<p class="source">${kind(k)}${esc(text)}</p>`;
const note = (summary, html) => html ? `<details class="note"><summary>${summary}</summary><p>${html}</p></details>` : '';
const verse = (r) => `<p class="scripture">${r.text}</p>`;
const lines = (arr) => arr.map(([who, line]) => `<p class="versicle${who === 'All' ? ' all' : ''}"><b>${who}</b><span>${esc(line)}</span></p>`).join('');
const pointed = (s) => esc(s).replace(/ : /g, ' <span class="colon" aria-hidden="true">:</span> ');
// Older / modern wording: both are in the page; the Wording switch shows one.
const dual = (older, newer) => older === newer ? older : `<div class="old-only">${older}</div><div class="new-only">${newer}</div>`;
const msrc = (text) => `<p class="source">${kind('historic')}${esc(text)} · ${esc(modern.MODERN_SOURCE)}</p>`;
const part = (id, title, inner, extra = '') => `<section class="part ${extra}" id="${id}"><h3>${title}</h3>${inner}</section>`;

const cantKey = (c) => Object.keys(off.canticles).find((k) => off.canticles[k] === c);
function canticle(c) {
  const body = (ls, gloria) => `<div class="canticle">${ls.map((l) => `<p>${pointed(l)}</p>`).join('')}<p class="gloria">${pointed(gloria)}</p></div>`;
  const m = modern.canticles[cantKey(c)];
  if (!m || m.length !== c.lines.length) throw new Error(`Modern wording missing or out of step for canticle ${cantKey(c)}`);
  return `${dual(src('historic', c.source), msrc(c.source))}<p class="meta">${esc(c.subtitle)}</p>
  ${dual(body(c.lines, off.canticles.gloria), body(m, modern.canticles.gloria))}
  ${c.note ? note('About this canticle', esc(c.note)) : ''}`;
}
const hymnBlock = (h) => `<h4>${esc(h.title)}</h4>${src('historic', h.source)}<p class="meta">Suggested tune: ${esc(h.tune)}</p>${h.stanzas.map((s) => `<p class="stanza">${esc(s)}</p>`).join('')}${note('About this hymn', esc(h.note))}`;
const collectBlock = (c) => {
  const m = modern.collects.find((x) => c.text.startsWith(x.starts));
  if (!m) throw new Error(`No modern wording for the collect beginning “${c.text.slice(0, 40)}”`);
  const older = `${src('historic', c.source)}<p>${esc(c.text)}</p>${c.note ? note('A word in this prayer', esc(c.note)) : ''}`;
  const mnote = m.note === undefined ? c.note : m.note;
  const newer = `${msrc(c.source)}<p>${esc(m.text)}</p>${mnote ? note('A word in this prayer', esc(mnote)) : ''}`;
  return `<h4>${esc(c.title)}</h4>${dual(older, newer)}`;
};

function renderOffice(key) {
  const o = off.offices[key];
  const t = off.texts;
  const id = (s) => `${key}-part-${s}`;
  const both = (render, field) => `<div class="weekday-only">${render(field.weekday)}</div><div class="sunday-only">${render(field.sunday)}</div>`;
  const sentence = (s) => `${src('scripture', s.ref)}${verse(s)}`;
  const cant = (k) => canticle(off.canticles[k]);
  const sameCanticle = o.canticle.weekday === o.canticle.sunday;
  const sections = [
    ['sentence', 'Opening'], ['confession', 'Confession', 'full-only'], ['versicles', 'Praise'], ['psalms', 'Psalms'],
    ['lesson', 'Scripture'], ['canticle', 'Canticle'], ...(o.canticle2 ? [['canticle2', 'Nunc Dimittis', 'full-only']] : []),
    ['creed', 'Creed', 'full-only'], ['prayers', 'Prayers'], ['hymn', 'Hymn'], ['blessing', 'Grace'],
  ];
  return `<div class="office-panel" id="panel-${key}" role="tabpanel" aria-labelledby="tab-${key}"${key === 'evening' ? ' hidden' : ''}>
  <header class="office-title">
    <h2>${o.name}</h2>
    <p class="meta"><span class="weekday-only">The weekday form</span><span class="sunday-only">The Lord’s Day form</span><span class="short-only"> · shorter</span></p>
  </header>
  <nav class="office-index" aria-label="${o.name}: sections"><ol>${sections.map(([s, label, cls]) => `<li${cls ? ` class="${cls}"` : ''}><a href="#${id(s)}">${label}</a></li>`).join('')}</ol></nav>
  ${part(id('sentence'), 'Opening sentence', both(sentence, o.sentence))}
  ${part(id('confession'), 'Confession of sin', `
    <p class="rubric">All kneel or bow, and say together:</p>
    ${dual(`${src('historic', t.confession.source)}<p>${esc(t.confession.text)}</p>`, `${msrc(t.confession.source)}<p>${esc(modern.texts.confession.text)}</p>`)}
    <p class="rubric">The leader then reads:</p>
    ${src('scripture', t.assurance.ref)}${verse(t.assurance)}
    ${dual(note('About the confession', esc(t.confession.note)), note('About the confession', esc(modern.texts.confession.note)))}`, 'full-only')}
  ${part(id('versicles'), 'Invitation to praise', dual(`${src('historic', t.versicles.source)}${lines(t.versicles.lines)}`, `${msrc(t.versicles.source)}${lines(modern.texts.versicles)}`))}
  ${part(id('psalms'), 'The Psalms appointed', `
    <p class="source">${kind('historic')}Book of Common Prayer (1662) psalter · <span data-slot="psalter-day"></span></p>
    <div class="appointed"><strong>Read today</strong><span data-slot="psalm-refs"></span></div>
    <p class="rubric">The psalms are read aloud, leader and household taking alternate verses, each ending with the Gloria Patri. <span class="short-only">In the shorter form, read the first psalm appointed.</span></p>
    <div data-slot="psalms"></div>`)}
  ${part(id('lesson'), o.lessonLabel, `
    <p class="source">${kind('arrangement')}Waterside continuous-reading plan · <button type="button" class="linkish" data-open="about">how the plan works</button></p>
    <div class="appointed"><strong>Read today</strong><span data-slot="lesson-ref"></span></div>
    <p class="rubric short-only">In the shorter form, a few verses are enough.</p>
    <div data-slot="lesson"></div>`)}
  ${part(id('canticle'), 'Canticle', sameCanticle ? cant(o.canticle.weekday) : both(cant, o.canticle))}
  ${o.canticle2 ? part(id('canticle2'), 'Second canticle', cant(o.canticle2), 'full-only') : ''}
  ${part(id('creed'), "The Apostles’ Creed", `<p class="rubric">All say together:</p>${dual(`${src('historic', t.creed.source)}${t.creed.text.map((x) => `<p>${esc(x)}</p>`).join('')}${note('Notes on the words', esc(t.creed.note))}`, `${msrc('The Apostles’ Creed as in the Book of Common Prayer (1662)')}${modern.texts.creed.text.map((x) => `<p>${esc(x)}</p>`).join('')}${note('Notes on the words', esc(modern.texts.creed.note))}`)}`, 'full-only')}
  ${part(id('prayers'), 'The Prayers', `
    <h4>The Lord’s Prayer</h4>${dual(`${src('historic', t.lordsPrayer.source)}<p>${esc(t.lordsPrayer.text)}</p>`, `${msrc(t.lordsPrayer.source)}<p>${esc(modern.texts.lordsPrayer)}</p>`)}
    <div class="full-only"><h4>Suffrages</h4>${dual(`${src('historic', t.suffrages.source)}${lines(t.suffrages.lines)}`, `${msrc(t.suffrages.source)}${lines(modern.texts.suffrages)}`)}</div>
    ${both((cs) => cs.map((c, i) => `<div class="${i ? 'full-only' : ''}">${collectBlock(c)}</div>`).join(''), o.collects)}
    <div class="full-only">
      <h4>Intercessions</h4>${src('original', t.intercessions.source)}
      <ul class="intercessions">${t.intercessions.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
    <details class="note"><summary>A prayer for our children</summary><p class="source">${kind('original')}${esc(t.forChildren.source)}</p><p>${esc(t.forChildren.text)}</p></details>`)}
  ${part(id('hymn'), 'Hymn', `<p class="rubric">A hymn may be sung here, or at the beginning.</p>${hymnBlock(hymns.byId[o.hymn])}`)}
  ${part(id('blessing'), 'The Grace', `${src('scripture', o.blessing.ref)}${verse(o.blessing)}<p class="meta">Praying alone or as a household without a minister, many say “us” for “you”. The words of Scripture are otherwise unaltered.</p>`)}
  <p class="amen" aria-hidden="true">✠</p>
</div>`;
}

const psalterTable = () => `<div class="table-scroll"><table class="psalter"><caption>The psalter by day of the month (1662). On the 31st, the psalms of the 30th day are read again.</caption>
  <thead><tr><th scope="col">Day</th><th scope="col">Morning</th><th scope="col">Evening</th></tr></thead>
  <tbody>${off.psalter.map(([m, e], i) => `<tr><th scope="row">${i + 1}</th><td>${m.join(', ')}</td><td>${e.join(', ')}</td></tr>`).join('')}</tbody></table></div>`;

const plan = { epoch: off.PLAN_EPOCH, psalter: off.psalter, ot: off.otBooks, nt: off.ntBooks, gloria: off.canticles.gloria, gloriaModern: modern.canticles.gloria };

// The mark is inlined: a file:// page in a WebView cannot load a CSS mask from a separate file.
const logoUri = 'data:image/svg+xml;base64,' + readFileSync(join(SITE, 'src/assets/logo.svg')).toString('base64');
const css = readFileSync(join(ROOT, 'tools/app.css'), 'utf8').replaceAll('url(logo.svg)', `url("${logoUri}")`);
const js = readFileSync(join(ROOT, 'tools/app.js'), 'utf8');
const version = JSON.parse(readFileSync(join(ROOT, 'tools/version.json'), 'utf8')).version;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#eef1ee">
<title>Daily Office · Waterside Press</title>
<link rel="icon" href="logo.svg">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Daily Office">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="description" content="Morning and Evening Prayer for the household, with the day’s psalms and lessons. From Waterside Press.">
<style>
${css}
</style>
</head>
<body>
<header class="bar">
  <div class="bar-top">
    <button type="button" class="brand" data-open="about" aria-label="About this app"><span class="mark" aria-hidden="true"></span><span><b>Daily Office</b><small>Waterside Press</small></span></button>
    <button type="button" class="icon-btn" data-open="settings" aria-label="Reading settings">Aa</button>
  </div>
  <div class="date-nav" role="group" aria-label="Date">
    <button class="icon-btn" id="prev-day" type="button" aria-label="Previous day">‹</button>
    <button type="button" id="office-date" aria-live="polite" aria-label="Choose a date"></button>
    <button class="icon-btn" id="next-day" type="button" aria-label="Next day">›</button>
    <input type="date" id="date-pick" class="visually-hidden" tabindex="-1" aria-hidden="true">
  </div>
  <div class="office-tabs" role="tablist" aria-label="Office">
    <button type="button" role="tab" id="tab-morning" aria-controls="panel-morning" aria-selected="true">Morning Prayer</button>
    <button type="button" role="tab" id="tab-evening" aria-controls="panel-evening" aria-selected="false" tabindex="-1">Evening Prayer</button>
  </div>
</header>
<button type="button" id="back-today" class="today-pill" hidden>Back to today</button>

<main id="office-root" class="office">
  <p class="notice sunday-only">Today is the Lord’s Day. The Office takes its Sunday form: a resurrection sentence, the Te Deum, and a collect for the Lord’s Day.</p>
  ${renderOffice('morning')}
  ${renderOffice('evening')}
  <footer class="notices">
    <p>${esc(off.ESV_NOTICE)}</p>
    <p class="old-only">Psalms and lessons are printed from the King James Version (Authorized Version, 1611), in the public domain outside the United Kingdom. Prayer Book texts (1662): public domain outside the United Kingdom; within the UK both are subject to Crown rights under letters patent. Hymn texts are pre-1800 and in the public domain.</p>
    <p class="new-only">In Modern English, psalms and lessons are from the ESV® Bible, provided by the ESV API (<a href="https://www.esv.org" rel="noopener">www.esv.org</a>); without a key or a connection the King James Version is shown instead. Prayer Book texts are the 1662 prayers with their wording modernized by Waterside Press. Hymn texts keep their original pre-1800 words.</p>
    <p>The Office complements, and does not replace, the worship, preaching, sacraments, fellowship, and pastoral care of the local church.</p>
  </footer>
</main>

<div class="sheet" id="sheet-settings" role="dialog" aria-modal="true" aria-labelledby="settings-h" hidden>
  <div class="sheet-card">
    <div class="sheet-head"><h2 id="settings-h">Reading settings</h2><button type="button" class="icon-btn" data-close aria-label="Close">✕</button></div>
    <div class="setting wording">
      <div><b>Wording</b><small id="wording-hint"></small></div>
      <div class="slide-pair">
        <span class="slide-label" data-side="old">Older<small>KJV</small></span>
        <button type="button" class="switch" id="wording-toggle" role="switch" aria-checked="false" aria-label="Modern English wording (ESV)"><span></span></button>
        <span class="slide-label" data-side="new">Modern<small>ESV</small></span>
      </div>
    </div>
    <div class="esv-key" id="esv-key-box" hidden>
      <label for="esv-key"><b>ESV access key</b></label>
      <p>The ESV readings come from Crossway over the internet and need your own free key. Sign in at <a href="https://api.esv.org/" rel="noopener">api.esv.org</a>, create an application (any name, non-commercial), and paste its key here. It stays on this phone.</p>
      <div class="key-row"><input id="esv-key" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Paste key"><button type="button" class="icon-btn" id="esv-key-save">Save</button></div>
      <p class="key-status" id="esv-key-status" role="status"></p>
    </div>
    <div class="setting">
      <div><b>Shorter form</b><small>About eight minutes. Suits young children.</small></div>
      <button type="button" class="switch" id="short-toggle" role="switch" aria-checked="false"><span></span></button>
    </div>
    <div class="setting">
      <div><b>Text size</b></div>
      <div class="stepper"><button type="button" class="icon-btn" id="size-down" aria-label="Smaller text">A−</button><span id="size-label">100%</span><button type="button" class="icon-btn" id="size-up" aria-label="Larger text">A+</button></div>
    </div>
    <div class="setting">
      <div><b>Appearance</b></div>
      <div class="seg" role="radiogroup" aria-label="Appearance">
        <button type="button" role="radio" data-theme-choice="auto">Auto</button>
        <button type="button" role="radio" data-theme-choice="light">Light</button>
        <button type="button" role="radio" data-theme-choice="dark">Dark</button>
      </div>
    </div>
    <div class="setting">
      <div><b>Keep screen on</b><small>While the app is open.</small></div>
      <button type="button" class="switch" id="awake-toggle" role="switch" aria-checked="false"><span></span></button>
    </div>
    <p class="legend">Words in <span class="rubric-sample">red italic</span> are instructions and are not read aloud. Lines marked <b>Leader</b> and <b>All</b> are said in turn.</p>
  </div>
</div>

<div class="sheet" id="sheet-about" role="dialog" aria-modal="true" aria-labelledby="about-h" hidden>
  <div class="sheet-card prose">
    <div class="sheet-head"><h2 id="about-h">About the Office</h2><button type="button" class="icon-btn" data-close aria-label="Close">✕</button></div>
    <p>Morning and Evening Prayer, adapted for the household from the Book of Common Prayer. Pray it alone, on behalf of your household, or with everyone gathered. The order stays the same each day so that it can be learned; the psalms and lessons change according to a set plan. The full form takes about twenty minutes, the shorter form about eight.</p>
    <h3>How the readings are appointed</h3>
    <p><strong>Psalms.</strong> The Book of Common Prayer (1662) divides the 150 psalms over thirty days, morning and evening, so that the whole psalter is read every month. The app follows that table exactly.</p>
    <p><strong>Lessons.</strong> One chapter of the Old Testament at Morning Prayer and one of the New Testament at Evening Prayer, read in order from Genesis and Matthew, beginning 1 January 2026. This is a Waterside plan, modelled on the Reformed practice of reading Scripture continuously, book by book; it is not the 1662 calendar of lessons. If you miss a day, read on from the day’s chapter; nothing is lost by skipping ahead or catching up.</p>
    <p><strong>The Church year.</strong> Seasonal collects and readings for Advent, Christmas, Lent, and Easter are not yet included.</p>
    ${psalterTable()}
    <p class="small">Everything here works without an internet connection. The app keeps your settings on this phone and sends nothing anywhere.</p>
    <p class="small">Daily Office ${esc(version)} · © <span data-year>2026</span> Waterside Press. Feedback: <a href="mailto:atashworth@gmail.com?subject=Daily%20Office%20app">atashworth@gmail.com</a></p>
  </div>
</div>

<script>window.OFFICE_PLAN = ${JSON.stringify(plan)};</script>
<script src="kjv.js"></script>
<script>
${js}
</script>
</body>
</html>
`;

writeFileSync(join(OUT, 'index.html'), html);
writeFileSync(join(OUT, 'kjv.js'), 'window.KJV=' + readFileSync(join(ROOT, 'data/kjv.json'), 'utf8') + ';\n');
copyFileSync(join(SITE, 'src/assets/logo.svg'), join(OUT, 'logo.svg'));
for (const f of ['icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png']) copyFileSync(join(ROOT, 'tools/icons', f), join(OUT, f));
writeFileSync(join(OUT, 'sw.js'), readFileSync(join(ROOT, 'tools/sw.js'), 'utf8').replace('__VERSION__', `${version}-${Date.now().toString(36)}`));
writeFileSync(join(OUT, 'manifest.webmanifest'), JSON.stringify({
  name: 'Daily Office · Waterside Press', short_name: 'Daily Office',
  description: 'Morning and Evening Prayer for the household, with the day’s psalms and lessons.',
  start_url: './', scope: './', display: 'standalone', background_color: '#eef1ee', theme_color: '#eef1ee',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2));
console.log(`Built web/index.html (${(html.length / 1024).toFixed(0)} KB) from ${SITE}`);
