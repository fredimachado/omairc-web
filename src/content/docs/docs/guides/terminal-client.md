---
title: Use the terminal client
description: Install and run omairc-tui, the Omairc terminal client, and understand what it shares with the desktop app.
---

Omairc ships two clients: the desktop window and `omairc-tui`, a terminal client written in Go. The terminal client speaks the same IRC protocol, follows the same workflows and keyboard chords, and uses the same window title. Its rendering differs, and it has a few behavior differences listed below. Use it over SSH, inside `tmux`, or on a machine where you prefer to stay in the terminal.

## When to use it

- You work in a terminal, over SSH, or inside a multiplexer.
- You want the keyboard-only workflow without a Qt window.
- You already have Omairc profiles and want the same networks in a terminal.

The terminal client is a full IRC client. It is not the local control CLI: the JSON commands in the [CLI reference](/docs/reference/cli/) control the desktop window, and `omairc-tui` does not open that control socket.

## Install

These installs need a release that carries `omairc-tui` assets, so check the [latest release](https://github.com/fredimachado/omairc/releases/latest) first. `install.sh`, the desktop installer, still installs the Qt client only.

### Linux or macOS without a package manager

```sh
curl -fsSL https://raw.githubusercontent.com/fredimachado/omairc/master/install-tui.sh | sh
```

`install-tui.sh` resolves the latest release, downloads the static binary for your OS and architecture, checks its `--version`, and installs it to `~/.local/bin`. Re-run it to upgrade. The same script is a release asset:

```sh
curl -fsSL https://github.com/fredimachado/omairc/releases/latest/download/install-tui.sh | sh
```

Read `install-tui.sh` before piping it if you prefer.

### Arch and Omarchy

Once the `[omairc]` pacman repository is configured (see [Install Omairc](/docs/getting-started/installation/)):

```sh
sudo pacman -S omairc-tui
```

### Go 1.25 or newer

`@vX.Y.Z` is the module version; the git tag on the same commit is `tui/vX.Y.Z`.

```sh
go install github.com/fredimachado/omairc/tui/cmd/omairc-tui@vX.Y.Z
```

### Homebrew

```sh
brew tap fredimachado/omairc https://github.com/fredimachado/omairc
brew install fredimachado/omairc/omairc-tui
```

### Windows

There is no setup program for the terminal client. Use Scoop:

```powershell
scoop bucket add omairc https://github.com/fredimachado/omairc
scoop install omairc-tui
```

Or unzip `omairc-tui-<version>-windows-amd64.zip` from the [latest release](https://github.com/fredimachado/omairc/releases/latest) and run `omairc-tui.exe` in Windows Terminal.

## Run the client

```sh
omairc-tui                  # start the terminal client
omairc-tui --demo-server    # seed the two-network demo world and skip Connect
omairc-tui --help
omairc-tui --version
```

**Expected result:** the terminal client opens its Connect sheet and takes the terminal window. The window title shows the selected conversation.

## What it shares with the desktop app

Both clients read and write the same platform locations:

- **Profiles and preferences** — the same stored network profiles, `/pref` toggles, network order, and collapse state.
- **Credentials** — the same platform credential store (macOS Keychain, Linux Secret Service, or Windows Credential Manager).
- **Transcripts** — the same local conversation store, so restored lines are available in either client.

:::caution[Connect a network in one client at a time]
The desktop app and the terminal client are independent IRC sessions. Connecting the same network in both at once gives the server two logins with the same nick, which it may reject, disconnect, or rename. Disconnect one client before connecting the other.
:::

## What differs from the desktop app

- **Presentation.** The terminal client renders into the terminal with half-block avatars when the terminal supports 24-bit color (otherwise a nick identicon) and terminal colors. On Omarchy and other Linux systems it follows the live `colors.toml` theme; elsewhere it falls back to a fixed dark palette.
- **Desktop notifications.** The terminal client notifies on Linux (freedesktop service) and macOS when `osascript` is available. It does not send Windows notifications, even though the desktop app does.
- **Session-only lists.** The terminal client keeps your ignore, mute, monitor, and highlight lists for the current session only. They are not written to your saved preferences, so restarting `omairc-tui` clears them. The desktop app persists them.
- **One extra chord.** `Alt+U` jumps to the first new message. Every other chord matches the desktop app.

Everything else, including slash commands, unread and inbox handling, history, and settings, matches the desktop client. See [Keyboard shortcuts](/docs/reference/keyboard-shortcuts/), [Slash commands](/docs/reference/slash-commands/), and [History, local logs, and bouncers](/docs/guides/history-and-bouncers/).

## Windows Terminal chords

On Windows, Windows Terminal keeps some chords for itself before the terminal client sees them. The terminal client accepts an alternate for each affected chord, and its in-app sheet lists both:

| Action | Chord |
|---|---|
| Walk conversations | `Alt+Down` / `Alt+Up`, or `Ctrl+Alt+Down` / `Ctrl+Alt+Up` |
| Walk networks | `Alt+Left` / `Alt+Right`, or `Ctrl+Alt+Left` / `Ctrl+Alt+Right` |
| Collapse / expand network | `Alt+Shift+Left` / `Alt+Shift+Right`, or `Ctrl+Shift+Left` / `Ctrl+Shift+Right` |
| Move network | `Alt+Shift+Up` / `Alt+Shift+Down`, or `Ctrl+Alt+Shift+Up` / `Ctrl+Alt+Shift+Down` |
| Open Connect | `Ctrl+,` or `Ctrl+]` |
| Cycle Connect tabs | `Ctrl+Tab` or `Ctrl+PgDn` |

The aliases apply only on Windows. The desktop app binds only the two Connect alternates (`Ctrl+]` and `Ctrl+PgDn`); the movement alternates are specific to the terminal client.

## Crash log

If the terminal client panics or hits a runtime fatal, it writes the stack to `<state>/omairc/omairc-tui.log`, beside the desktop app's `omairc.log`. The file stays empty until something crashes. See [Troubleshooting](/docs/troubleshooting/) if you need to find the state directory.

## Related

- [Install Omairc](/docs/getting-started/installation/)
- [Create your first connection](/docs/getting-started/first-connection/)
- [Use Omairc with an agent](/docs/guides/agents/)
