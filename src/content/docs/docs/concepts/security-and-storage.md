---
title: Security and storage
description: Learn where Omairc keeps profiles, credentials, transcripts, local control data, and what it sends over the network.
---

Omairc separates ordinary configuration and state from network credentials. Exact directories depend on Qt, the operating system, packaging, and environment overrides, so use the platform's standard application config, state, runtime, and credential-store tools rather than assuming one universal path.

## What is stored where

| Data | Storage class | Security boundary |
|---|---|---|
| Network profiles, preferences, ignores, highlights, mutes, monitors, open direct messages, and window state | Qt application configuration/preferences | Ordinary same-user configuration; not a secret vault |
| Server password and NickServ/SASL password | Platform credential store through QtKeychain | macOS Keychain, Linux Secret Service/libsecret, or Windows Credential Manager when available |
| Conversation transcripts, playback times, CLI unread cursors, and application warning/error log | Platform application state | Local files/state owned by the user; protect backups and account access |
| CLI control endpoint | Qt runtime location | Same-user local socket or Windows local named pipe; exists only while the window runs |

`XDG_CONFIG_HOME`, `XDG_STATE_HOME`, and the platform's Qt standard locations can change resolved locations. Package formats also differ. Use diagnostics from the running platform or inspect Qt's application directories; do not copy a path from another operating system. On macOS, Keychain holds secrets while application preferences/state live in the user's Library areas. A Homebrew `--zap` uninstall is intentionally broader than a normal uninstall and removes Omairc profile/log state.

Demo mode is exceptional: `--demo-server` keeps profiles, preferences, transcripts, and geometry in temporary/in-memory storage. On Windows it also redirects settings so the registry is untouched.

## Credential failure behavior

When secure storage works, Omairc retrieves passwords from the platform credential service. If secure storage is unavailable or a write fails, the entered secret remains session-only and Connect reports that it was not saved. Automatic startup connection does not proceed when a required saved secret cannot be read; enter it again after fixing or unlocking the credential store.

Do not put passwords in profile names, autojoin text, chat, command-line arguments, issue reports, or copied logs. The server **Password** field is IRC `PASS`; the **NickServ** field is used for SASL (SCRAM-SHA-256 when advertised, otherwise PLAIN) or post-welcome `IDENTIFY` fallback.

## Transcript and log safety

Omairc filters known secret-bearing IRC commands before they reach Status and rejects sensitive lines from transcript persistence. Local warning/error logging is owner-only on supported filesystems. These controls reduce accidental disclosure but cannot identify every secret typed as ordinary prose.

Treat transcripts as personal data. Back them up only to trusted storage, redact them before sharing diagnostics, and remember that removing local state cannot remove copies held by an IRC server, bouncer, recipient, backup, or notification service.

The local CLI exposes the running window's connections and conversations to processes operating as the same user. Do not expose the runtime socket over a network, change its permissions to make it shared, or implement a socket client instead of using `omairc`. See [Use Omairc with an agent](/docs/guides/agents/) for safe automation.

## Network protections and limits

- Leave TLS enabled unless the IRC network explicitly requires plaintext and you accept interception risk. TLS certificate errors are connection failures; Omairc does not document a click-through bypass.
- SASL PLAIN is only a credential encoding, not encryption. It relies on TLS.
- Links open only for `http` and `https`; `file:` and `javascript:` stay closed. A safe scheme does not make the destination trustworthy.
- Peer avatars and server icons accept constrained HTTPS URLs. Fetches pre-validate and pin an address to resist DNS rebinding and reject oversized decoded images. Remote avatar hosts can still see your IP address.
- Disable automatic peer avatar fetches with Preferences or `/pref avatars off` when that privacy trade-off is undesirable. Your own `/avatar` metadata publishes its URL to a supporting network.
- Outbound IRC remains subject to the protocol's 512-byte line limit; incoming lines may be longer.

## Before sharing diagnostics

1. Reproduce without entering a real password into chat or shell history.
2. Copy only the relevant Status and warning/error lines.
3. Remove hosts, network IDs, nicks, channel names, account names, tokens, and message bodies when they are not needed.
4. Never publish credential-store exports, profile trees, transcript directories, or the local socket.

For restore and replay behavior, see [History and bouncers](/docs/guides/history-and-bouncers/). For storage failures, follow [Troubleshooting](/docs/troubleshooting/).
