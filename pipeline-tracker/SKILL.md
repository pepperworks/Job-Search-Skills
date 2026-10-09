---
name: pipeline-tracker
description: Build or refresh a job search dashboard that tracks every company in the user's pipeline, what stage each one is at, and which ones are waiting on them. Use whenever the user asks to see, build, update, re-sync, or refresh their job search dashboard, pipeline, application tracker, or "where things stand" across their search. Also use when they ask what they owe people, who has gone quiet, what fell through the cracks, or which applications are still open. Not for a single company (use interview-prep) or for editing a resume (use resume-tailor).
---

# Pipeline Tracker

Build a single page that answers one question: **what is waiting on me right
now?** Everything else on the dashboard exists to support that answer.

A job search goes wrong in a specific way. Threads pile up, a few go quiet,
one or two need a reply that never gets sent, and the person loses track of
which is which. They remember the companies they are excited about and
forget the ones where they owe someone an email. This skill makes that
distinction the center of the page.

The steps below name kinds of tools (email, calendar, notes, file storage,
web), not specific products. Use whatever is connected and skip the rest.
With nothing connected, ask the user to paste a list of companies and where
each one stands, and build from that.

## Step 1: Establish the window

Ask how far back to look, or infer it. If a dashboard already exists, the
window is everything since its last sync date. If this is the first build,
go back to when the search started, usually two to four months.

**Confirm today's date before you start.** Use a shell command or another
reliable source rather than assuming. A tracker built against the wrong date
misstates every "silent for N weeks" figure on the page, and those figures
are the reason the page is useful.

## Step 2: Gather the pipeline

Work through these in parallel where you can.

- **Email, received.** Search the window for recruiting language: interview,
  recruiter, next steps, offer, moving forward, not moving forward, role,
  candidate, application. Collect every company that appears.
- **Email, sent.** Search sent mail over the same window. This is not
  optional and it is the step most often skipped. A thread looks unanswered
  in search results when the user already replied, because search returns
  the matching message rather than the latest one.
- **Calendar.** Past events confirm which conversations actually happened.
  Future events are live commitments. Scheduling-tool invites (Calendly,
  Ashby, ModernLoop and similar) carry the role title, round format and
  interviewer names in the invite body, so read it rather than just the
  title. Check every calendar the user has, not only the default one.
- **Meeting notes**, if they keep them. Earlier rounds often recorded comp
  ranges, team structure and process stages that belong on the dashboard.
- **Their own additions.** Calendar entries the user wrote themselves
  ("Apply: Acme", "Follow up: Dana") are real pipeline items and belong in
  the actions list.

## Step 3: Classify each company

Put every company in exactly one stage, and attach the evidence that puts it
there. The stages are in `references/pipeline-stages.md`, which also covers
the judgment calls.

The one that matters most: **separate what the user owes from what they are
owed.** A company awaiting the user's reply is an action. A company that owes
the user an answer is waiting. These feel similar and are opposites.

Before writing any status, open the thread and read it to the end. Search
snippets truncate, and a decision usually lands in the last message.

## Step 4: Build the page

Copy `assets/dashboard-template.html`, set the config values at the top and
replace the `DATA` object. The template is one self-contained file that
needs no connectors to open, so it works the same for everyone. It loads one
web font when online and falls back to system fonts when not.

Put every dated commitment from Step 2 into `DATA.upcoming`: interviews,
take-home due dates, deadlines. Include the time, who it is with and the
format. The page hides items once their date has passed, and hides the whole
card when nothing is coming up.

Set `SYNCED` to today's date. The page warns the user when that date is more
than a week old.

Deliver it however the user's environment keeps things: a saved page they
can reopen, or an HTML file.

## Step 5: Say what changed

In chat, not on the page. Lead with anything that resolved since the last
sync, especially rejections, since those are the updates people most want
summarized rather than discovered. Then the two or three things genuinely
waiting on them. Keep it short. The page holds the detail.

## Refreshing an existing dashboard

Re-run steps 1 through 4 over the window since the last sync. Then:

- Move anything that resolved into closed, with the date and the stated
  reason if there was one.
- Re-age the silent entries. "Three weeks quiet" on a stale page is wrong
  and reads as authoritative.
- Drop actions the user already handled. Check sent mail before claiming
  anything is still outstanding.
- Update `SYNCED`.

Nothing on the page updates by itself, so the sync date is doing real work.
Never leave it stale, and rebuild `upcoming` from the calendar every time.

## Standing rules

- **Every status traces to a specific message, event or note, with a date.**
  If you cannot point at the evidence, say the status is unknown rather than
  guessing.
- **Check sent mail before saying anything is unanswered.** The most common
  error this skill can make is telling someone to reply to a thread they
  already replied to. It costs trust immediately.
- **Count silence in real elapsed time** from the last message in the
  thread, and say the duration rather than "a while."
- Quote rejection feedback verbatim when a company gave any. Most do not,
  and the ones that do are worth preserving.
- Distinguish a paused role from a rejection. They feel the same and are not.
- Flag when one recruiting firm has two people working with the user, or
  when two recruiters are pitching the same company. Both cause real
  problems and neither is visible from a single thread.
- A referral that was offered and never actioned is a lead, not a dead end.
  Keep those visible instead of dropping them.
- Never invent a company, a stage, or a reason for a rejection.
- Keep the page honest about volume. A long closed list is an accurate
  picture of a search, not a failure, and seeing the whole board is the
  point.
- No em dashes on the page or in the summary. Use commas, colons or periods.
