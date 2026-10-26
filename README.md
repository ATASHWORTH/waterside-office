# Waterside Press · Daily Office (Android)

A simple offline app of the Waterside Press Daily Office: Morning and Evening Prayer for each day, with the appointed psalms and lessons printed in full.

- **Liturgy** (sentences, confession, canticles, Creed, collects, suffrages, hymns) is imported at build time from the Waterside Press site repository, `content/office.mjs` and `content/hymns.mjs`, so the app and the site always match.
- **Psalms** follow the 1662 Prayer Book psalter by day of the month; **lessons** follow the Waterside continuous-reading plan (one Old Testament chapter in the morning, one New Testament chapter in the evening, from 1 January 2026). The arithmetic is the same as the site's `office.js`.
- **Psalm and lesson text** is the King James Version, bundled in `data/kjv.json` (public domain; JSON from github.com/aruljohn/Bible-kjv, MIT). Each lesson also links to the ESV at esv.org.
- **Wording switch** (Aa menu): *Older* uses the KJV and the 1662 wording; *Modern* uses the ESV and the same 1662 prayers in modernized wording (`tools/modern.mjs`, made for Waterside Press). ESV text comes from the ESV API with the reader's own free key, entered in the app and kept on the phone. Crossway does not allow the key to be published, so it is never in this repo. Only the day on screen is cached, keeping under the ESV's 500-verse limit. Without a key or a connection the app shows the KJV.
- **Fonts**: IM Fell English, Spectral, Alegreya Sans (SIL Open Font License), bundled in `web/fonts/`.

## Build

```sh
git clone https://github.com/atashworth/waterside-press site
SITE_DIR=site node tools/build.mjs     # writes web/index.html and web/kjv.js
```

Every push to `main` builds the APK on GitHub Actions and publishes it at
`https://github.com/ATASHWORTH/waterside-office/releases/download/latest/DailyOffice.apk`.
After changing the Office on the site, run the **Build Android APK** workflow by hand (Actions tab → Run workflow) to pick up the change.

## Files

```
tools/build.mjs   builds web/ from the site's content + data/kjv.json
tools/app.css     the Family Rule look, sized for a phone (light and dark)
tools/app.js      date, psalter and lesson plan, settings
app/              Android WebView wrapper (com.watersidepress.office)
```
