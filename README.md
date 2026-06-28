# YouTube Fullscreen Anywhere

A tiny Firefox extension that fills the **browser window** (not the monitor) with the YouTube player.

The native Fullscreen API always targets the monitor, so this fakes it: pressing **Alt+W** pins YouTube's player to the viewport with CSS. Press **Alt+W** again or **Esc** to exit. Pure CSS/JS, OS-agnostic, collects no data.

## Install (temporary, for testing)

`about:debugging` → This Firefox → Load Temporary Add-on → pick `manifest.json`.

Or with [web-ext](https://github.com/mozilla/web-ext): `web-ext run`.

## Files

- `manifest.json` — MV3 manifest
- `content.js` — the toggle + CSS, injected on `*.youtube.com`
- `icon.svg` — toolbar/listing icon
