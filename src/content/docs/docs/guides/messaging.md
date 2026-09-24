---
title: Send and find messages
description: Use Omairc's composer, input history, transcript search, channel history, and member interface.
---

The composer at the bottom of a channel or direct message sends chat and accepts slash commands. Omairc keeps the composer focused during most keyboard navigation so you can continue typing.

## Send a message

1. Select a channel or direct message.
2. Type in the composer. Press `Ctrl+L` (`Cmd+L` on macOS) to return focus there at any time.
3. Press Enter or select **SEND**.

**Expected result:** the line appears in the selected transcript. Servers with `echo-message` provide the authoritative echo; Omairc also handles ordinary servers without it.

:::caution
Check the center header before pressing Enter. A message goes to the currently selected conversation; changing networks does not copy or retarget your draft intentionally.
:::

Type `/` to see command completion and usage hints. Tab completes a nick in the composer. This guide does not reproduce the full slash-command reference; `/help` shows the commands available on the current composer surface.

## Reuse composer history

With the composer focused and no completion or find overlay active, press Up and Down to walk messages and commands you previously submitted. History is kept separately for the relevant composer context, so changing conversations or Status may show a different sequence.

Edit a recalled line before sending it. Recalling history does not send anything until you press Enter.

## Search the visible transcript

1. Press `Ctrl+F` (`Cmd+F` on macOS).
2. Type the text to find. Omairc searches the loaded transcript for the selected conversation or Status view.
3. Press Enter to move through matches; use Up/Down to change direction.
4. Press Escape to leave find and return to the composer.

Search works on lines currently loaded into Omairc; it is not a network-wide or server archive search. The **New messages** marker is skipped because it is not a chat line.

## Read older and newer lines

Use the mouse wheel or these transcript controls while the composer stays focused:

- `Page Up` / `Page Down`: move about one page;
- `Shift+Page Up` / `Shift+Page Down`: move about half a page;
- `Ctrl+Home` / `Ctrl+End`: jump to the top or bottom (`Cmd` on macOS).

When new lines arrive while you are scrolled up, the scroll-down chip remains available; its accent dot indicates unseen content below. Select it or jump to the bottom to resume following new lines.

Omairc can show recent locally stored lines after restart. It also requests channel history or ZNC playback when the connected server advertises the required capability. This means the amount of older history differs between networks; Omairc cannot retrieve history a server does not offer.

## Use the member panel

For a channel, the right panel shows the online count and members known to Omairc. Click the **PEOPLE** control in the conversation header, or press `Ctrl+Shift+M` (`Cmd+Shift+M` on macOS), to show or hide it.

- Click a member to open a direct message.
- Press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS) to focus the panel, then use Up/Down and Enter.
- While that list has focus, `Page Up` / `Page Down` move about one page and `Shift+Page Up` / `Shift+Page Down` move about half a page. `Home` / `End` jump to the first or last nick. `Ctrl+Home` / `Ctrl+End` still jump the transcript (`Cmd` on macOS).
- Press `Ctrl+Shift+K` (`Cmd+Shift+K` on macOS) to search the current channel's nicks and open one directly.

Away state, service account, standing status, bot marks, and avatars appear only when the network supplies the corresponding information. A member's absence of such a marker is not proof that the account or status does not exist.

## Notifications and attention

When the Omairc window is unfocused, a mention or direct message can notify you on Linux or macOS. Windows desktop notifications are not currently implemented. Muting and the [inbox/unread rules](/docs/guides/navigation/#unread-messages-the-inbox-and-mutes) determine how other background activity asks for attention.

## Common mistakes

- **Page Up moves the member list:** the member panel has focus. Press `Ctrl+L` (`Cmd+L` on macOS) to return to the composer, then page the transcript.
- **Up/Down changes completion instead of history:** dismiss the completion menu with Escape, then try again.
- **Find does not locate an old server message:** find only searches transcript lines already loaded.
- **No members or history appear:** both depend on the selected target and data supplied by the network; Status has no channel roster.
- **A notification did not appear on Windows:** native desktop notification support is currently Linux/macOS only.

## Next steps

- [Manage unread messages, inbox items, and mutes](/docs/guides/navigation/#unread-messages-the-inbox-and-mutes)
- [Configure peer avatars and other preferences](/docs/guides/preferences/)
