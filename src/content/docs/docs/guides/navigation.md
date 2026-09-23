---
title: Navigate Omairc
description: Move between networks and conversations, use Status and the inbox, and understand unread and mute behavior.
---

Use the left sidebar and keyboard shortcuts to move through every connected network and conversation without leaving the composer.

## Read the sidebar

Each network section contains a **Status** row, followed by **CHANNELS** and **DIRECT MESSAGES**. Status shows connection and server activity. Channels are shared rooms; direct messages are one-to-one conversations.

Click a row to select it, or use:

| Action | Linux and Windows | macOS |
| --- | --- | --- |
| Walk conversations | `Alt+Down` / `Alt+Up` | `Option+Down` / `Option+Up` |
| Walk networks | `Alt+Left` / `Alt+Right` | `Option+Left` / `Option+Right` |
| Next unread (mentions first) | `Alt+A` | `Option+A` |
| Jump to a conversation or Status | `Ctrl+K` | `Cmd+K` |
| Open focused network's Status | `Ctrl+\`` | `Cmd+\`` |
| Hide or restore the server list | `Ctrl+Shift+S` | `Cmd+Shift+S` |

In the jump sheet, type part of a network or conversation label, use Up/Down, then press Enter.

:::tip
Press `Ctrl+/` (`Cmd+/` on macOS) for Omairc's complete shortcut sheet. This guide highlights workflows rather than duplicating that catalog.
:::

## Organize networks

Network order and collapsed state persist between runs.

- Click a network header chevron to collapse or expand it.
- Use `Alt+Shift+Left` / `Alt+Shift+Right` to collapse or expand the focused network.
- Use `Ctrl+Alt+Shift+Left` / `Ctrl+Alt+Shift+Right` to collapse or expand all networks.
- Use `Alt+Shift+Up` / `Alt+Shift+Down` to move the focused network.

Use `Option` instead of `Alt` and `Cmd` instead of `Ctrl` on macOS. A collapsed network still shows its aggregate unread indicator, and keyboard navigation can still reach its conversations.

## Unread messages, the inbox, and mutes

These three signals serve different purposes:

- **Unread badges** count live chat that arrived while a conversation was not selected. Chat in the open conversation also becomes unread while the window is unfocused. Server replay into an already open conversation does not create ordinary unread badges.
- The **New messages** marker identifies the first unread live line in a transcript. With [Open conversations at unread](/docs/guides/preferences/#open-conversations-at-unread) enabled, switching conversations lands at this marker instead of the bottom. Status always follows the end.
- The session **inbox** collects actionable background events: mentions, configured highlight words, direct messages, channel invites, monitored users coming online, and being kicked. Its `inbox` label and count appear by your identity in the sidebar footer.

Open the inbox with `Ctrl+Shift+A` (`Cmd+Shift+A` on macOS), move with Up/Down, and press Enter to activate an item. Selecting the corresponding conversation consumes its related inbox rows. The inbox is a session waiting list, not permanent message storage.

### Mute a noisy conversation

In a selected conversation, enter:

```text
/mute
```

Use `/unmute` to restore it and `/muted` to list muted targets on the focused network. You can also supply a target, such as `/mute #busy-channel`. Mutes persist.

Muting suppresses attention behavior for that conversation; it does not leave the channel or erase its transcript. Do not use mute when you actually mean to leave a channel.

## Open and close direct messages

Click a nick in the member panel to open a direct message, or use the nick jump sheet with `Ctrl+Shift+K` (`Cmd+Shift+K` on macOS). `Ctrl+W`/`Cmd+W` closes the selected direct-message tab; it does not quit Omairc.

Whether previously opened direct messages return after reconnecting is controlled by [Reopen direct messages on startup](/docs/guides/preferences/#reopen-direct-messages-on-startup).

## Expected result

After selecting a sidebar or jump-sheet row, the center header and transcript change to that target while the composer remains ready. Activating an inbox conversation removes matching waiting items; reaching the unread content lets you continue to the newest line with the scroll-down chip.

## Common mistakes

- **Looking for server errors in a channel:** open that network's Status view.
- **Treating the inbox count as the unread total:** inbox events and conversation unread badges are related but independent.
- **Expecting mute to stop receiving messages:** mute changes attention behavior, not IRC membership.
- **Using `Ctrl+W` on a channel:** it is specifically the close-direct-message shortcut.

## Related guides

- [Write, search, and review messages](/docs/guides/messaging/)
- [Choose unread and direct-message preferences](/docs/guides/preferences/)
