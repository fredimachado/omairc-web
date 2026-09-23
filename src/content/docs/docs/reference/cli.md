---
title: CLI reference
description: Complete Omairc local control CLI reference, including JSON output, read cursors, limits, and send safety.
---

The `omairc` executable either opens the GUI or controls an already-running Omairc window. Control commands use a same-user local socket and the window's existing IRC connections; they do not start another connection. `--help` and `--version` are plain text. Every control command emits one compact JSON object on stdout.

```sh
omairc                         # open or activate the window
omairc --demo-server           # open the furnished in-process demo
omairc --help
omairc --version
```

## Commands

| Command | Result |
|---|---|
| `omairc help [command]` | Plain-text help. `omairc <command> --help` is equivalent. |
| `omairc connections` | Lists connections. Alias: `omairc list`. |
| `omairc status [--network ID]` | Shows one connection. |
| `omairc send [--network ID] TARGET TEXT...` | Sends without changing UI selection. |
| `omairc read [--network ID] [TARGET] [--last N\|--since DURATION\|--unread]` | Reads a transcript snapshot without changing UI selection. |
| `omairc names [--network ID] TARGET` | Snapshots members of a joined channel; not a new `NAMES` round trip. |
| `omairc conversations [--network ID]` | Lists channels and DMs without clearing GUI badges. |
| `omairc raise` | Activates the existing window. |

`--network` always takes the ID returned by `connections`, not a display name. You may omit it only when exactly one connection exists. Quote shell-sensitive channels: `omairc send '#garden' 'hello from the greenhouse'`. For a target or text beginning with `-`, use `--` before positional arguments.

## Read windows and cursors

- Default: `--last 50`. `--last N` accepts **1–100**.
- `--since` accepts a positive integer plus `s`, `m`, `h`, or `d` (for example `15m`), and the socket protocol also accepts an ISO-8601 timestamp. Results are the newest 100 at most.
- `--unread` returns lines after the CLI cursor. Targeted reads have a target cursor; untargeted reads have a network cursor. A non-empty successful read advances that cursor to its newest returned line.
- The CLI cursor is independent of GUI unread state. Reads neither select a conversation nor clear GUI badges.
- Cursors are stored below the platform state location under `omairc/`; `$XDG_STATE_HOME` overrides it when set.
- With no target, all channels and DMs on that network are merged chronologically. A named target must already exist. Only `message`, `notice`, and `action` kinds are returned; join/part event lines are excluded.
- The three window flags are mutually exclusive. If a 100-line cap omits older matches, top-level `"truncated": true` is present.

## JSON contracts

Success always includes `"ok":true`. Response rows omit empty strings and false boolean flags, so treat an absent string as empty and an absent flag as false. Numeric fields such as `port` and `unread` remain present even when zero; top-level protocol booleans such as `"ok":false` are never omitted.

```json
{"ok":true,"connections":[{"id":"net-fable","name":"FableNet","host":"irc.example.invalid","port":6697,"tls":true,"nick":"samplebot","state":"Connected","selected":true}]}
```

`status` returns the same connection object under `status`. State labels are `Offline`, `Connecting`, `Connected`, `Disconnecting`, or `Reconnecting`.

```json
{"ok":true,"messages":[{"network":"net-fable","target":"#garden","sender":"fern","timestamp":"2026-01-02T03:04:05.000Z","message":"fictional hello","kind":"message","msgid":"example-42"}]}
```

```json
{"ok":true,"members":[{"nick":"fern","label":"@fern","status":"online"}]}
```

```json
{"ok":true,"conversations":[{"target":"#garden","channel":true,"topic":"Fictional plants only","unread":2},{"target":"moss","unread":0}]}
```

`send` and `raise` return `{"ok":true}`. Failures return `{"ok":false,"error":"..."}`, write the message to stderr, and exit 1. Parse errors, unknown/missing network IDs, unsuitable targets, no running socket (1-second connect/write waits), and invalid/missing responses (3-second response limit; 64 KiB line limit) are failures. Help/version exit 0; successful control commands exit 0.

:::caution[An uncertain send is not safe to retry]
If the send was written but no valid acknowledgement arrives, Omairc exits **2** with `{"ok":false,"uncertain":true,"error":"...may already have been delivered"}`. Do not send it again blindly. First use `omairc read <target> --last 100` and inspect the target; retry only if you can establish that the message is absent.
:::

## Related

- [Slash commands](/docs/reference/slash-commands/)
- [IRCv3 support](/docs/reference/ircv3/)
