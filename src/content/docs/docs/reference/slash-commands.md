---
title: Slash commands
description: Syntax, aliases, scope, and behavior for every Omairc composer command.
---

Type commands in a conversation or Status composer. Commands are case-insensitive. Typing `//text` sends `/text` as ordinary chat. After `/` plus a character, the completion list fuzzy-matches names and aliases; `Tab` inserts the canonical name, arrows select, and `Escape` dismisses it.

“Conversation only” below means a channel or direct message, not Status. An invalid or wrong-scope command is refused and remains in the composer.

## Messaging and conversations

| Syntax (aliases) | Scope | Behavior |
|---|---|---|
| `/me <text>` | Conversation only | Sends a CTCP ACTION. |
| `/join [channel] [key][, ...]` (`/j`) | Either | Joins comma-separated channels with optional keys. With no channel, joins the latest invitation. Opens the last named channel; a failed join still opens its buffer and shows the reason. |
| `/part [channel]` (`/leave`) | Either | Parts the named/current channel; channels only. |
| `/query <nick> [text]` | Either | Opens/selects a DM and optionally sends text. |
| `/msg <nick> <text>` | Either | Sends without opening or selecting a DM. |
| `/notice <target> <text>` | Either | Sends a NOTICE. |
| `/clear` | Either | Clears the current conversation or Status transcript locally. |
| `/close` | Conversation only | Closes a DM; refused on channels. |
| `/list [mask]` | Either | Opens the searchable channel list. Results stream and sort by users; Enter joins/focuses. Reuses the same-mask list until disconnect, except issuing it while open refreshes. |

## Identity, availability, and preferences

| Syntax | Behavior |
|---|---|
| `/nick <nickname>` | Changes nick. |
| `/away [reason]` | Sets manual away status; `/back` clears it. |
| `/back` | Clears away status; arguments are ignored. |
| `/autoaway [off|on|duration [reason]|reason [text]]` | Configures the global idle timer (off by default). It applies AWAY to every registered network not manually away. |
| `/pref [directs|avatars|unread] [on|off]` | With no arguments lists all three global preferences; a name reads one; `on`/`off` changes it. Avatar output includes the IP note. |
| `/status [text]` | Reads or sets standing metadata; `/status clear` unsets it. This is not AWAY. |
| `/avatar [url|email]` | Reads or sets avatar metadata. Requires HTTPS, or converts email to a Gravatar SHA-256 URL; `/avatar clear` unsets it. |
| `/disconnect [reason]` (`/quit`) | Disconnects the focused network and leaves it idle. `/q` is not an alias. |

## Information and CTCP

| Syntax | Behavior |
|---|---|
| `/topic [text]` | Shows or changes the current channel topic; conversation only. |
| `/whois [nick]` | In a DM, omitted nick means the peer. Replies appear in the asking conversation and Status; from Status they remain there. A channel requires a nick. |
| `/ping [nick]` | Sends CTCP PING; omitted nick is allowed only in a DM. Channel targets are refused. |
| `/time [nick]` | Sends CTCP TIME with the same target/reply rules as `/ping`. |
| `/version [nick]` | Sends CTCP VERSION with the same target/reply rules as `/ping`. |
| `/help` | Prints the command catalog in the active surface. |

## Moderation and modes

| Syntax | Scope / effect |
|---|---|
| `/mode <channel> [[+|-]modechars [parameters]]` | Sends a channel mode query/change. |
| `/kick [channel] <nick> [reason]` | Uses the current channel when omitted. |
| `/invite <nick> [channel]` | Uses the current channel when omitted. |
| `/op <nick>` / `/deop <nick>` | Conversation only; sets/removes operator mode in a channel. |
| `/voice <nick>` / `/devoice <nick>` | Conversation only; sets/removes voice in a channel. |
| `/ban <mask>` | Conversation only; adds a channel ban. |

## Local filtering and presence lists

| Syntax | Behavior |
|---|---|
| `/ignore <nick>` / `/unignore <nick>` | Hides/restores that nick's DMs, notices, and invitations. Channel text remains visible. |
| `/ignored` | Lists ignored nicks on Status. |
| `/monitor <nick>` / `/unmonitor <nick>` | Adds/removes an IRC `MONITOR` watch. If unsupported, Omairc reports that instead. |
| `/monitored` | Lists watched nicks and online/offline/unknown state on Status. |
| `/mute [target]` / `/unmute [target]` | Uses the current conversation when omitted. Chat still arrives, but mentions do not notify or badge. Status requires a target. |
| `/muted` | Lists muted targets on Status. |
| `/highlight <word>` / `/unhighlight <word>` | Adds/removes a custom highlight word. |
| `/highlights` | Lists custom highlight words. |

## Services and raw IRC

| Syntax (aliases) | Behavior |
|---|---|
| `/ns <text>` | Sends to NickServ without opening a DM. |
| `/cs <text>` | Sends to ChanServ without opening a DM. |
| `/znc <text>` | Quiet-sends to `*status` without opening a DM. |
| `/raw <line>` (`/quote`) | Sends a raw IRC line. Use only when you understand the server command. |

## Related

- [Keyboard shortcuts](/docs/reference/keyboard-shortcuts/)
- [IRCv3 support](/docs/reference/ircv3/)
