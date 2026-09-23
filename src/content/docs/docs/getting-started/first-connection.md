---
title: Create your first connection
description: Fill in Omairc's first-run Connect sheet, handle passwords securely, and verify the connection.
---

On first launch, Omairc opens a mandatory Connect sheet with a suggested Libera Chat profile: `irc.libera.chat`, port `6697`, TLS enabled, and `#omarchy` in Autojoin. Supply your identity and apply the profile to connect.

## Before you connect

Have these details from the network operator or your bouncer provider:

- server hostname and port;
- whether TLS is required;
- a nickname;
- any server or NickServ password;
- optional channels to join automatically.

:::caution
Do not disable TLS merely to work around a failed connection. Confirm the host, port, and TLS requirements with the network first.
:::

## Fill in the profile

1. In **Name**, enter a label for the network, such as `Libera Chat`. This label is shown in the sidebar; it does not change the server address. If left empty, Omairc uses the host as the display name.
2. In **Host**, enter only the server hostname, such as `irc.libera.chat`. Do not include `ircs://` or a port.
3. Enter the **Port**. `6697` is the suggested TLS port for Libera Chat. Use the value supplied by your network.
4. Leave **TLS** on when the server offers a TLS endpoint.
5. Enter your **Nick**. This is the name people see in chat and is required.
6. Optionally enter **Username** and **Real name**. When blank, Omairc uses the nick for the corresponding registration value.
7. In **Autojoin**, enter channels separated by commas or spaces, for example `#omarchy #omairc`. Include `#` to avoid ambiguity. Omairc joins them after connecting.
8. Turn on **Connect automatically on startup** only if this profile should connect whenever Omairc starts.

### Choose the right password field

- **Server password** is normally the IRC `PASS` value. If no NickServ password is set, Omairc can also use it as the SASL secret.
- **NickServ password** is the preferred SASL secret. If SASL does not succeed, Omairc sends it to NickServ with `IDENTIFY`.

Omairc uses SCRAM-SHA-256 when the server advertises it and otherwise SASL PLAIN. The Connect sheet does not currently provide separate SASL account or bouncer-network fields, so profiles that require those separate values may not be configurable through this UI.

:::note[How secrets are stored]
Omairc saves passwords in the platform credential store when available: Secret Service through QtKeychain on Linux, Windows Credential Manager, or macOS Keychain. Passwords are not written into the ordinary profile. If secure storage is unavailable, the Connect sheet reports that the secret is session-only; you must enter it again in a later session. Use the **forget saved…** links to remove stored server or NickServ passwords.
:::

## Apply and verify

1. Select **Apply**, or press `Ctrl+Enter` (`Cmd+Enter` on macOS).
2. Watch the network's connection state and Status view.
3. Confirm that the autojoin channel appears under **CHANNELS** and its transcript opens.

**Expected result:** the profile remains in the sidebar, its state reaches connected, and the selected autojoin channel shows a composer at the bottom. Press `Ctrl+\`` (`Cmd+\`` on macOS) to inspect Status if registration fails.

## Common mistakes

- **Apply remains unavailable:** Host, Port, and Nick are required. A nick, username, real name, or autojoin entry that cannot be sent is also rejected with a message in the sheet.
- **The host is wrong:** enter `irc.example.net`, not `ircs://irc.example.net:6697`.
- **The password is in the wrong field:** use NickServ password for the normal services account secret; reserve Server password for a server/bouncer `PASS` unless your network tells you otherwise.
- **You expected the display name to select a different server:** Name is only the label; Host controls the destination.
- **The channel does not appear:** verify that Autojoin contains the channel name (normally including `#`) and check Status for a join error.

## Add or edit a network later

Open Connect with `Ctrl+,` (`Cmd+,` on macOS). Use **+ Add network** or `Ctrl+N`, select a profile in the left rail, and apply changes with `Ctrl+Enter`. A connected profile can also be disconnected from this sheet.

## Next steps

- [Navigate networks, channels, direct messages, and Status](/docs/guides/navigation/)
- [Send and find messages](/docs/guides/messaging/)
- [Set everyday preferences](/docs/guides/preferences/)
