# Dim the lights while working in Obsidian

This plugin dims the panes you're not working on, so you can keep a sharper focus on the one you're writing in.

## How it works

When you open a single pane everything looks normal. However, when you split your workspace into two or more panes, every pane except the one you're actively working in, fades to a lower opacity — still fully readable, just visually out of the way. When you switch panes (click, keyboard shortcut etc) the dimming follows your focus instantly.

<!-- TODO: demo GIF or before/after screenshot showing an active pane at full brightness next to a dimmed inactive pane -->

## Commands

- **Toggle dimming** — flip the "Enable dimming" setting from the command palette (search "dim lights" or "toggle dimming").

## Settings

- **Enable dimming** — turn the whole effect on or off.
- **Light level** — how bright inactive panes stay. 0 is pitch black, 100 is full brightness (no dimming).

## Scope

Only splits in the main editor area dim. Sidebars (file explorer, backlinks, outline, etc.) are left fully lit.

## Installation

Manual install: copy `main.js`, `manifest.json`, and `styles.css` into `<vault>/.obsidian/plugins/dim-lights/`, then enable the plugin in Obsidian's Community Plugins settings.
