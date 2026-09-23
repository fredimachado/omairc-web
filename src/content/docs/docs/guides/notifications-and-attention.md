---
title: Notifications and attention
description: Manage Omairc unread marks, inbox items, highlights, mutes, MONITOR watches, and desktop notifications.
---

Omairc separates visual unread state from events that need attention. Use unread marks to resume reading, the inbox to walk important events, highlights to add keywords, and mutes to suppress attention without dropping chat.

## Know each signal

| Signal | Purpose | Cleared or consumed by |
|---|---|---|
| Unread count and **New messages** mark | Live chat that arrived while a conversation was not selected, or while its open window was unfocused | Reading/selecting in the GUI; transcript position follows the preference |
| Mention badge | Your nick or a configured highlight in an unmuted conversation | GUI attention flow |
| Session inbox | Background mentions, highlights, direct messages, invites, monitored-nick online edges, and self-kicks | Activating its row or selecting the matching sidebar conversation |
| Desktop notification | Immediate out-of-window attention | Clicking it raises Omairc and opens or creates the matching conversation |
| CLI unread cursor | Agent/terminal polling | `omairc read --unread`; independent of every GUI signal |

Open the inbox with `Ctrl+Shift+A`. **Open conversations at unread** controls whether switching to a different conversation lands at its New messages marker instead of the bottom; it does not change what counts as unread. Use `/pref unread on` or the Preferences toggle. The current release defaults this preference on.

Replay and restored local logs are muted backlog. They do not increment unread or mention badges and do not create notifications or inbox rows.

## Add highlight words

Highlights are whole-word matches stored per network:

```text
/highlight release
/highlights
/unhighlight release
```

A hit behaves like a nick mention: it gets a transcript wash and, unless muted, contributes attention and notification behavior. Choose specific words; common words create a noisy inbox.

## Mute without losing messages

Run these in the conversation you want to change, or provide a target:

```text
/mute
/mute #busy-channel
/muted
/unmute #busy-channel
```

Muted chat still arrives and remains readable. Mentions and highlights in it do not notify, increment, or badge, and `Alt+A` skips them. Opening a muted conversation does not unmute it. Muting is per network and conversation key; closing or clearing that network drops the flag.

## Watch a nick with MONITOR

If the server advertises IRC `MONITOR`, use:

```text
/monitor alice
/monitored
/unmonitor alice
```

The list persists per network and is resubscribed after server feature discovery. Real online/offline edges appear in Status. An online edge can enter the inbox and follows the mention notification path while the window is unfocused. Initial reconnect hydration is deliberately quiet, and the server may impose a watch-list limit. MONITOR is server presence, not proof that a person is active or reading.

## Desktop and platform boundaries

Desktop notifications are implemented on Linux through the freedesktop notification service and on macOS through UserNotifications. Linux delivery requires an available session D-Bus notification service and can no-op when the session address is unusable. macOS asks for user authorization. Notifications are not currently implemented on Windows. Omarchy live-theme watching and portal text scaling are Linux-only.

Notifications are generated only while the window is unfocused for mentions and direct messages; mutes suppress them. Your desktop can additionally block notifications through its own permission, focus, or do-not-disturb settings. Topics, notification bodies, and Status remain plain text.

## Reduce unwanted attention

1. Mute high-volume conversations instead of ignoring their senders when you still need the chat.
2. Remove broad highlight words.
3. Review `/monitored` and remove stale watches.
4. Remember that `/ignore` primarily drops direct messages, notices, and invites from that nick; channel text remains visible.
5. Test with the window unfocused and a genuinely live line—not replay.

If a notification or badge still behaves unexpectedly, use the ordered checks in [Troubleshooting](/docs/troubleshooting/). See [History and bouncers](/docs/guides/history-and-bouncers/) for replay boundaries.
