# Dim Lights

Dims inactive panes to keep focus on the one you're writing in.

Open a single pane and everything looks normal. Split your workspace into two or more panes and every pane except the one you're actively working in fades to a lower opacity — still fully readable, just visually out of the way. Switch panes (click, keyboard, however) and the dimming follows your focus instantly.

<!-- TODO: demo GIF or before/after screenshot showing an active pane at full brightness next to a dimmed inactive pane -->

## Settings

- **Enable dimming** — turn the whole effect on or off.
- **Light level** — how bright inactive panes stay. 0 is pitch black, 100 is full brightness (no dimming).

## Commands

- **Toggle dimming** — flip the "Enable dimming" setting from the command palette (search "dim lights" or "toggle dimming").

## Scope

Only splits in the main editor area dim. Sidebars (file explorer, backlinks, outline, etc.) are left fully lit.

## Installation

Manual install: copy `main.js`, `manifest.json`, and `styles.css` into `<vault>/.obsidian/plugins/dim-lights/`, then enable the plugin in Obsidian's Community Plugins settings.

## Development

```sh
npm install
npm run dev   # esbuild watch build
npm run build # production build
npm run lint  # eslint
```
