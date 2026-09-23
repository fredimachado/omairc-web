---
title: History, local logs, and bouncers
description: Understand IRCv3 CHATHISTORY, ZNC playback, local transcript restore, and replay deduplication.
---

Omairc can assemble one conversation from server history, bouncer playback, and its own local transcript. These sources improve continuity, but none is a complete server-side archive.

## Choose the history source

| Source | When it arrives | Requirement | What you see |
|---|---|---|---|
| IRCv3 `CHATHISTORY` | After Omairc successfully joins a channel | Server advertises `chathistory` or `draft/chathistory` and `batch` | A bounded `LATEST` response with server timestamps |
| ZNC playback | On bouncer attach, and for a channel after self-join when needed | Bouncer playback; Omairc also uses `znc.in/playback` when offered with `batch` | Bouncer backlog, including implementations that replay without the capability |
| Local transcript | When a channel is joined or an engaged direct message is reopened | Previously stored Omairc chat | A recent local tail from the platform state area |

Replay is shown as muted backlog. It does not raise unread counts, mention badges, inbox rows, or desktop notifications. A New messages marker may still separate backlog from the current session—for example on the first auto-selected ZNC channel—without increasing the badges.

## Use IRCv3 CHATHISTORY

No switch is required. Join the channel normally. If the server negotiated the required capabilities, Omairc sends `CHATHISTORY LATEST` after the successful self-join and inserts returned lines with their server times. If the server does not offer the feature, the channel starts with only local restore and live traffic.

CHATHISTORY is server-controlled and bounded. Missing older messages do not indicate that local logging failed.

## Use ZNC playback

Configure the network profile for the ZNC endpoint. Omairc selects an upstream bouncer network by appending the profile's bouncer-network value to the login account in the form expected by ZNC. The value cannot contain a space or slash. Use `/znc <text>` to send a command to `*status`; replies remain in Status and do not open a direct message.

With Omairc 1.0.0, when ZNC offers `znc.in/playback` with `batch`, Omairc requests it and sends `ZNC *playback PLAY` after registration. It starts each target from the newest stored server-time, or `0` on first attach. A channel may request `PLAY` again after self-join until a playback batch for it has been retained.

:::note
Omairc handles attach playback and bounded `PLAY`. It does not implement ZNC or Soju's full history-sync protocol.
:::

## How duplicate suppression works

Omairc reconciles overlapping replay and retained transcript lines so playback kept by the client is not inserted twice. Server message IDs are strongest evidence; timestamp/content context and per-target playback times cover servers or bouncers without IDs. This is deduplication, not archival verification: rewritten timestamps or content can prevent a match, while identical messages can be ambiguous.

Do not clear state merely to fix one suspicious row. Clearing stored transcript or playback progress can make the next attach request older history again.

## Understand local transcript retention

Conversation transcripts are kept in Omairc's platform state location, grouped by network ID and target. The in-memory conversation is capped at 2,000 messages; restore loads a recent tail. Status is a console, not a persisted conversation transcript.

Omairc's secret policy rejects credential-shaped commands and sensitive authentication material before transcript storage. That is defense in depth, not permission to paste secrets into chat. Other ordinary message text is local data and may be readable by software running as your user; protect backups and the account itself.

`/clear` clears the current in-memory buffer. It is not a promise to erase remote history held by an IRC server or bouncer. See [Security and storage](/docs/concepts/security-and-storage/) before deleting or backing up local state.

## Diagnose missing or repeated history

1. Confirm the network reached **Connected** and the channel shows a successful self-join.
2. Read Status for capability negotiation, `CHATHISTORY` failure, or bouncer messages.
3. Confirm the server actually advertises `batch` plus a CHATHISTORY capability, or that the bouncer is configured to retain playback.
4. Compare server-time values. Incorrect bouncer clocks can make history appear out of order.
5. Check whether the line is muted backlog or live traffic; replay intentionally does not alert.
6. Reproduce without deleting state, then collect the owner-only application warning/error log and relevant Status lines with credentials removed.

For attention behavior, see [Notifications and attention](/docs/guides/notifications-and-attention/). For a broader diagnostic sequence, see [Troubleshooting](/docs/troubleshooting/).
