---
title: Install Omairc
description: Install Omairc on Omarchy or Arch Linux, Windows, and macOS, then verify that it starts.
---

Install the current Omairc release for your platform, then launch the window once before following the connection guide.

## Omarchy and Arch-based Linux

The supported installer requires `pacman` and `sudo`, and works on Omarchy, Arch Linux, Manjaro, and EndeavourOS. Run it as your regular user, **not** as root:

```sh
curl -fsSL https://raw.githubusercontent.com/fredimachado/omairc/master/install.sh | sh
```

The script adds an `[omairc]` repository to `/etc/pacman.conf` and installs the `omairc` package. It is safe to run again: an existing repository entry is not duplicated and Omairc is upgraded to the latest release.

On Omarchy, you can instead install the release package through Omarchy:

```sh
omarchy pkg add omairc
```

Or download `omairc-*.pkg.tar.zst` from the [latest GitHub release](https://github.com/fredimachado/omairc/releases/latest) and install that exact file:

```sh
sudo pacman -U omairc-*.pkg.tar.zst
```

Launch Omairc from the application menu or run:

```sh
omairc
```

**Expected result:** the Omairc window opens. On a first run, the Connect sheet cannot be dismissed until a profile has been created.

:::note[Linux desktop integration]
Live Omarchy theme watching, desktop text scaling through the portal, and Linux desktop notifications are Linux-only integrations. They require a working desktop portal/session bus; they do not describe Windows or macOS behavior.
:::

### Update on Arch

If you used the repository installer, update through `pacman`:

```sh
sudo pacman -Sy omairc
```

## Windows 10 or later

1. Open the [latest GitHub release](https://github.com/fredimachado/omairc/releases/latest).
2. Download `omairc-<version>-windows-x64-setup.exe`.
3. Run the installer. Its default per-user location is `%LOCALAPPDATA%\Programs\Omairc`; choosing an all-users installation uses Program Files instead. The installer adds that install directory to `PATH`.
4. Start **Omairc** from the Start menu.

For a portable installation, download `omairc-<version>-windows-x64.zip`, extract the whole archive to a writable folder, and run `omairc.exe` there. Keep all extracted files together.

**Expected result:** `omairc.exe` opens the Connect sheet. The native Windows build works, but Windows is not the project's primary platform. Portal text scaling, Omarchy theme watching, and desktop notifications are not implemented on Windows.

:::caution[Do not run the executable from inside the ZIP]
Extract the complete portable archive first. Running only `omairc.exe` without its packaged Qt files can prevent the application from starting.
:::

## macOS

Install the signed and notarized app with the repository's Homebrew cask:

```sh
brew tap fredimachado/omairc https://github.com/fredimachado/omairc
brew install --cask fredimachado/omairc/omairc
```

The explicit tap URL is required because the repository is not named `homebrew-omairc`. The cask installs `/Applications/omairc.app` and a command named `omairc` on `PATH`.

You can alternatively download the matching `omairc-<version>-macos-arm64.zip` (Apple silicon) or `omairc-<version>-macos-x64.zip` (Intel) from the [latest release](https://github.com/fredimachado/omairc/releases/latest), extract it, and move `omairc.app` to `/Applications`.

Launch the app from Applications or run:

```sh
open /Applications/omairc.app
```

**Expected result:** the Omairc window opens and macOS may ask for notification permission when a notification is first needed. Profiles use the platform's Qt application preferences and state locations; passwords use macOS Keychain.

:::note
The Homebrew command may eventually become `brew install --cask omairc` if Homebrew accepts the cask. The repository-qualified command above is the currently documented route.
:::

## Common installation problems

- **The Arch script says it needs `pacman`:** use it only on an Arch-based distribution. Other Linux distributions do not currently have an official binary installation path.
- **The Arch script refuses to run as root:** rerun it as your normal account; it invokes `sudo` itself.
- **`omairc` is not found in a terminal after Windows setup:** open a new terminal so it receives the updated `PATH`, or launch Omairc from Start.
- **A macOS ZIP does not run on your Mac:** download `arm64` for Apple silicon or `x64` for Intel, and extract the app before opening it.

## Next step

[Set up your first IRC connection](/docs/getting-started/first-connection/).
