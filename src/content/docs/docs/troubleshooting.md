---
title: Troubleshooting Omairc
description: Diagnose Omairc GUI, CLI, connection, send, storage, notification, theme, avatar, typing, LIST, and macOS bundle problems in order.
---

Start with the narrowest observable failure. Do not delete profiles, logs, or credential entries first: that removes evidence and can trigger duplicate history. Status is the first place to inspect for network and command failures; the application warning/error log is the next step.

## Collect a baseline

1. Record `omairc --version` and your operating system/package type.
2. Confirm whether the GUI window is running and responsive.
3. From a terminal run `omairc connections`. Control commands return compact JSON; `--help` and `--version` return plain text.
4. In the GUI, open the affected network's **Status** and note its state and newest error.
5. Reproduce once, redact sensitive values, and retain the relevant application log lines. Storage locations vary; see [Security and storage](/docs/concepts/security-and-storage/).

## The GUI does not start, or a second launch does nothing

1. Run `omairc --help`. If it is not found, fix the installation or `PATH` before debugging IRC.
2. Check whether Omairc is already running. A second launch intentionally raises the single existing process instead of opening another connection.
3. Start from a terminal once and inspect warning/error output and the application log.
4. On Linux, distinguish display/Qt plugin startup errors from IRC failures. On Windows portable installs, keep the deployed Qt and runtime DLLs beside `omairc.exe`.
5. Use `omairc --demo-server` only as an isolated UI check; demo state is temporary and does not test your server or stored profile.

## The CLI says Omairc is not running

1. Start the desktop window as the same OS user and keep it running.
2. Verify `omairc connections` uses the binary from the same installation (`Get-Command omairc` on PowerShell or `command -v omairc` in a shell).
3. Do not run the CLI with `sudo`; that changes the user and runtime location.
4. If there are multiple connections, pass the `id` returned by `connections`, not the display name or host.
5. On macOS, use the Homebrew PATH helper or the executable inside the app bundle. Do not guess or connect directly to `omairc.sock`.

If JSON contains `"uncertain":true` after `send`, do **not** retry immediately. Read the target and follow the confirmation procedure in [Use Omairc with an agent](/docs/guides/agents/#handle-a-send-with-an-uncertain-result).

## A network will not connect or keeps reconnecting

Check in this order:

1. Confirm host, port, TLS setting, and network reachability.
2. Read Status for DNS, TCP, TLS certificate, registration, nick-in-use, SASL, watchdog, or server-throttle errors.
3. Separate **Password** (`PASS`) from **NickServ** credentials. Unlock/fix the credential store if automatic connect stopped because a secret could not be read.
4. For ZNC, verify its account/upstream-network format and inspect `*status` with `/znc`; a bouncer network value cannot contain a space or slash.
5. Wait through the built-in reconnect backoff rather than repeatedly applying the profile. `/disconnect` or `/quit` intentionally stops that network's reconnect loop.

Never work around a TLS certificate failure by disabling TLS unless you understand and accept the exposure.

## A message does not send or appears twice

1. Confirm the connection state is **Connected** and the target exists.
2. In a shell, quote `'#channel'` and text containing spaces. Use `--` before dash-prefixed targets or ambiguous arguments.
3. Keep slash commands in the GUI composer; CLI `send` is a `PRIVMSG`, not a command executor.
4. Check Status for invalid target, membership, flood control, or outbound length errors.
5. For `"uncertain":true`, read before one possible retry. Duplicate-looking muted rows may instead be overlapping bouncer/server/local history; see [History and bouncers](/docs/guides/history-and-bouncers/#how-duplicate-suppression-works).

## A password will not save or automatic connect stops

1. Read the message in Connect: Omairc explicitly reports session-only storage.
2. Unlock and test the platform credential service (Keychain, Secret Service, or Credential Manager) in the same desktop session.
3. Ensure QtKeychain and its platform backend are present in source/portable installations.
4. Enter the secret again and Apply. Do not place it in ordinary config or command arguments as a workaround.
5. If unresolved, report the storage error category and platform—not the secret or a credential export.

## Unread, inbox, or notifications look wrong

1. Decide whether you mean GUI unread/mention state, the session inbox, or the independent CLI `--unread` cursor.
2. Test with a live mention or direct message while the window is unfocused. Replay intentionally does not alert.
3. Check `/muted`, `/highlights`, and `/monitored`; mutes suppress mention attention, and reconnect MONITOR hydration is quiet.
4. On Linux, check desktop notification permissions, do-not-disturb, and a working D-Bus session. An invalid session-bus address makes notification integration no-op rather than block.
5. On macOS, check Omairc's notification authorization in System Settings. Notifications are not currently implemented on Windows. See [Notifications and attention](/docs/guides/notifications-and-attention/#desktop-and-platform-boundaries).

## Theme or text scaling does not follow the desktop

Omarchy live-theme watching and portal text scaling are Linux-only. On Linux, verify the desktop portal and session bus, then restart the portal and Omairc if the portal is stale. An invalid `DBUS_SESSION_BUS_ADDRESS` disables these reads. On Windows and macOS, do not expect the Omarchy theme watcher; this is a platform boundary, not a profile failure.

## Avatars or a network icon do not load

1. Run `/pref avatars` and enable peer avatars if desired.
2. Confirm the network supports the relevant metadata (`draft/metadata-2`) or icon capability and supplied an HTTPS URL.
3. A letter fallback means the URL was absent, unsafe, unreachable, returned an unsuitable image, or exceeded image safety limits.
4. Check DNS/HTTPS without weakening URL validation. Host redirects, private/local addresses, and oversized images can be refused deliberately.
5. Remember that enabling peer avatars lets remote image hosts observe your IP. See [Security and storage](/docs/concepts/security-and-storage/#network-protections-and-limits).

## Typing indicators do not appear

Typing requires IRCv3 message tags/client typing support from the server and the other client. Channel typing appears on member rows; direct-message typing appears in the transcript. An active hint expires after a short interval and a paused hint after about 30 seconds. Missing capability support, a disconnected peer, expiry, or another client not publishing tags is normal—not evidence that chat is broken.

## `/list` remains loading or shows old results

1. Keep the affected network focused and check Status. The server may answer with try-again/too-many-matches errors or not terminate LIST.
2. Wait for Omairc's timeout; it leaves **Loading channels…**, records the reason, and allows a later retry.
3. Run `/list` again to refresh. The same mask otherwise uses that network's in-memory cache until disconnect.
4. Do not compare rows across networks: each connection owns its own LIST request and cache.
5. If reproducible, collect Status around `321`/`322`/`323`, `263`, or `416` without exposing private topics.

## A macOS app bundle or CLI fails

1. Match the release archive to Apple Silicon (`arm64`) or Intel (`x64`), then move/extract the app normally rather than copying only its executable.
2. Prefer the notarized release or Homebrew cask. For Homebrew, the repository URL is currently required:

   ```sh
   brew tap fredimachado/omairc https://github.com/fredimachado/omairc
   brew install --cask fredimachado/omairc/omairc
   ```

3. Launch the bundle with `open /path/to/omairc.app`. The CLI executable is `omairc.app/Contents/MacOS/omairc`; the Homebrew helper already executes it inside the bundle.
4. Do not move the `Contents/MacOS/omairc` file out of its bundle. Qt plugins and `qt.conf` are bundle-relative. Current releases handle launching that in-bundle executable through a symlink.
5. If Gatekeeper rejects an official tagged release, record the exact assessment and archive name; do not remove quarantine or disable security globally as a first fix.

## Escalate with useful evidence

Include the version, OS/architecture, package type, one symptom, exact steps, redacted CLI JSON, relevant Status lines, and relevant application warning/error lines. State whether `--demo-server` reproduces the UI symptom. Never attach profile trees, transcript directories, credential exports, passwords, or tokens.
