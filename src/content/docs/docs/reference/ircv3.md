---
title: IRCv3 support
description: Omairc capability negotiation, SASL, history, metadata, presence, and fallback behavior.
---

Omairc requests only capabilities the server advertises and continues with reduced functionality when optional capabilities are absent or withdrawn through `cap-notify`.

## Negotiated capabilities

| Capability | Omairc use |
|---|---|
| `sasl` | Account authentication when credentials are configured. |
| `away-notify` | Live away state. |
| `batch` | Groups history/playback and metadata traffic. |
| `draft/metadata-2` | Member and self metadata; requested only with `batch`. |
| `message-tags` | Tagged messages and typing client tags. |
| `multi-prefix` | Preserves multiple channel privileges. |
| `chghost` | Live user/host changes. |
| `cap-notify` | Runtime capability additions/removals. |
| `echo-message` | Server-confirmed display of sent messages. |
| `server-time` | Server timestamps. |
| `chathistory` or `draft/chathistory` | Recent channel history; requested only with `batch`, and only one spelling is enabled. |
| `znc.in/playback` | ZNC playback batches; requires `batch`. |
| `labeled-response` | Associates replies with requests; requires `message-tags`. |
| `account-tag` | Message account identity; requires `message-tags`. |
| `account-notify` | Live account changes. |
| `extended-join` | Account and real name on JOIN. |

Capabilities are requested in dependency-safe rounds. Rejected optional capabilities do not stop registration. Features that depend on them are hidden, approximated from normal IRC events, or reported as unsupported.

## SASL

Omairc requests `sasl` only when an account and password are available and the server advertises a compatible value. It prefers `SCRAM-SHA-256` when explicitly listed, otherwise uses `PLAIN` when the advertisement is empty or lists `PLAIN`. Authentication completes before `CAP END` and registration.

SASL rejection, abort, malformed SCRAM exchange, invalid server proof, registration before outstanding SCRAM completes, or an oversized one-frame PLAIN payload is treated as authentication failure rather than silently registering unauthenticated. Connection/server passwords and NickServ credentials are separate from the SASL account.

## History and bouncer playback

After joining a channel with `chathistory`/`draft/chathistory`, Omairc asks for `CHATHISTORY LATEST <channel> * <limit>`. The client limit is **100**, reduced when the server's `CHATHISTORY` ISUPPORT value sets a smaller positive maximum; zero means no server maximum. Batches are bounded internally at 256 lines and retain the newest lines.

History and ZNC playback are inserted chronologically and deduplicated using available message IDs/timestamps. Playback batches can arrive without the `chathistory` capability; Omairc accepts recognized `znc.in/playback` batches when batching is available. Failed or unsupported history simply leaves the locally available transcript intact. Locally persisted logs remain the source for the CLI's snapshot reads; the CLI does not itself issue `CHATHISTORY`.

## Metadata, typing, and presence

With `draft/metadata-2`, Omairc subscribes up to the server-advertised subscription limit to supported profile keys, including display name, pronouns, status, bot, homepage, color, and avatar. `/status` and `/avatar` set self metadata and report server failure; without metadata support, these enhancements are unavailable rather than guessed.

Typing uses the IRCv3 `+typing` client tag over `TAGMSG` and therefore requires `message-tags`. Incoming `active`/`paused` typing remains visible through the protocol's 30-second paused hold; `done` or expiry removes it. Without tags, no typing indicator is shown.

Omairc combines `away-notify`, `account-notify`, `extended-join`, `chghost`, and normal JOIN/PART/NICK/QUIT events to keep member identity and presence current. It may probe channel away state when richer notification is unavailable. IRC `MONITOR` is an ISUPPORT feature rather than a negotiated CAP: `/monitor` reports when the network does not advertise it, and `/monitored` can show online, offline, or unknown.

## Graceful fallback

- No `server-time`: receipt/local timestamps are used.
- No `echo-message`: Omairc locally echoes successful sends instead of waiting for server echo.
- No account/presence capabilities: basic nicks and membership still work, but richer identity may be missing or stale until standard replies arrive.
- No history/playback: live chat and local logs continue normally.
- Capability withdrawal: dependent UI and protocol behavior are disabled without disconnecting.

## Related

- [Slash commands](/docs/reference/slash-commands/)
- [CLI reference](/docs/reference/cli/)
- [Keyboard shortcuts](/docs/reference/keyboard-shortcuts/)
