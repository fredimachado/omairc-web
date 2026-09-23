---
title: Use Omairc with an agent
description: Install the Omairc agent skill and safely read or send IRC through the local CLI.
---

Omairc's bundled agent skill teaches an agent to control an **already-running** Omairc window. The CLI uses a same-user local socket; it does not log in to IRC again, change the selected conversation, or provide a remote API.

## Install the skill

Prerequisites:

- Install Omairc and put `omairc` on `PATH`.
- Use an agent host that supports the [Agent Skills](https://agentskills.io/) format and the `skills` installer.

Review third-party code before installing it globally, then install the skill from Omairc's public repository:

```sh
npx skills add fredimachado/omairc/skills -g
```

The package contains `skills/omairc/SKILL.md` and its CLI JSON reference. Re-run the command when you want the current version. Installation does not start Omairc or grant an agent IRC credentials; the running desktop process remains the only IRC client.

:::caution
An agent using this skill can read visible conversations and send messages as you. Review its proposed target and text, do not expose its local control socket, and give unattended agents the least filesystem and command access they need.
:::

## Follow the safe workflow

1. Start the Omairc window and connect normally.
2. Ask the agent to run `omairc connections` (the alias `list` also works).
3. When more than one row is returned, use its `id` with `--network <network-id>`. A profile name or host is not a network ID.
4. Discover existing targets with `omairc conversations --network <network-id>` and, for a joined channel, members with `omairc names --network <network-id> '#channel'`.
5. Read before acting:

   ```sh
   omairc read --network <network-id> '#channel' --last 20
   ```

6. Send only after confirming the target and text:

   ```sh
   omairc send --network <network-id> '#channel' 'hello there'
   ```

Quote channel names because `#` begins a comment in common shells. `send` sends conversation text, not composer slash commands: do not pass `/join`, `/msg`, or other GUI commands through it.

Every control command writes one compact JSON object. Success has `"ok":true`; errors have `"ok":false` and `"error"`. `--help` and `--version` are plain text and do not require a running window.

## Handle a send with an uncertain result

If `send` successfully wrote to the local socket but lost the reply, it exits with status 2 and returns `"uncertain":true`. The message **may already have been sent**.

1. Do not immediately retry.
2. Read recent lines from the same target:

   ```sh
   omairc read --network <network-id> '#channel' --last 20
   ```

3. Check for your own nick and the exact text. A peer can send identical text, so use both checks.
4. Stop if it is present. If it is absent, send once.

This procedure reduces duplicate messages; it cannot turn a lost acknowledgement into proof.

## Understand the two unread cursors

`omairc read --unread` advances a CLI cursor stored in Omairc's platform state area. That cursor is independent of the GUI's New messages mark, unread count, and mention badge. Reading from the CLI does not mark the GUI read, and opening a conversation in the GUI does not consume CLI unread output.

The cursor is shared by agents and terminals for the same local user, per network or per network-and-target. Do not use it as a durable queue for multiple independent consumers. Use `--since` or `--last` when consumers must not interfere. `--since` and `--unread` return at most the newest 100 matching lines and report `"truncated":true` if older matches were dropped.

## Boundaries

- `read`, `send`, `names`, and `conversations` do not move the GUI selection.
- `read` returns chat messages, notices, and actions—not Status events such as joins and parts.
- `names` snapshots the current member panel; it does not issue a new IRC `NAMES` request.
- A target must already exist in the window. The CLI does not create a channel or direct message.
- Run `raise` only when the user asked to activate the existing window.
- Keep the local runtime directory private. Same-user socket checks are a local boundary, not a reason to run untrusted software under your account.

For local data and credential boundaries, see [Security and storage](/docs/concepts/security-and-storage/). If the CLI cannot find the window, follow [Troubleshooting](/docs/troubleshooting/).
