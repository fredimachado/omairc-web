---
title: Set preferences
description: Configure Omairc's three global everyday preferences from the Connect sheet or composer.
---

Omairc has three global preferences for direct messages, peer avatars, and unread positioning. They apply across networks and persist between normal runs.

## Open Preferences

1. Open **Connect** with `Ctrl+,` (`Cmd+,` on macOS).
2. Select the **Preferences** tab. `Ctrl+Tab` cycles between Connection and Preferences (`Cmd+Tab` on macOS).
3. Toggle the desired setting. Changes take effect directly; they are not tied to one network profile.

You can also inspect or change them from a conversation or Status composer:

```text
/pref
/pref directs on
/pref avatars off
/pref unread on
```

Bare `/pref` prints all three values. `/pref directs`, `/pref avatars`, or `/pref unread` prints one value without changing it. Only `on` and `off` are accepted.

## Reopen direct messages on startup

**Default: on.** After each connection, Omairc reopens direct-message tabs you had open in the previous session. It remembers only direct messages that you explicitly opened or sent in, rather than every nick that happened to message the network.

Turn this off if you prefer to begin each run with only Status and joined channels. It does not delete locally stored transcript lines or prevent incoming direct messages from opening when needed.

Composer name: `directs`.

## Show peer avatars

**Default: on.** When a network supplies IRCv3 avatar metadata, Omairc fetches safe HTTPS avatar images. If this is off, no image is available, or loading fails, nick initials remain visible.

:::caution[Privacy]
Fetching a peer avatar contacts the image host, which can see your IP address. Turn this preference off on busy channels if you do not want avatar hosts to receive that connection. The setting applies on Linux, Windows, and macOS.
:::

This preference controls **peer** image loading. It does not promise that every network or nick has avatar metadata.

Composer name: `avatars`.

## Open conversations at unread

**Default: on.** When you switch or jump to a different channel or direct message, Omairc scrolls to its **New messages** marker instead of immediately showing the bottom. It leaves an already focused conversation alone, and Status continues to follow the end.

Turn this off if you always want a newly selected conversation to open at its newest line. The marker and unread state can still exist; this setting changes the initial scroll position, not what counts as unread.

Composer name: `unread`.

See [unread messages, inbox, and mute behavior](/docs/guides/navigation/#unread-messages-the-inbox-and-mutes) for the distinctions.

## Platform distinctions

The same three preferences and defaults are available on Arch/Omarchy, Windows, and macOS. Shortcut labels differ: macOS presents `Cmd` and `Option` where Linux and Windows use `Ctrl` and `Alt`.

These preferences do not control platform integrations. Omarchy live-theme watching and portal text scaling are Linux-only. Native desktop notifications are available on Linux and macOS, not Windows. Those differences do not change the `directs`, `avatars`, or `unread` values.

## Verify a change

Enter `/pref` after changing a toggle. Omairc prints each preference as `on` or `off` in the current transcript (or Status when used there).

## Common mistakes

- **Looking for a Save button:** preference toggles apply immediately; the network profile's **Apply** button is for connection edits.
- **Expecting `unread off` to clear badges:** it changes where conversations open, not unread accounting.
- **Expecting `directs off` to block DMs:** it only disables reopening remembered tabs after startup/connect.
- **Expecting avatars on every network:** peer images require server and user metadata support.

## Related guides

- [Navigate conversations and attention state](/docs/guides/navigation/)
- [Use the composer and member panel](/docs/guides/messaging/)
