# Pipeline stages

Five stages. Every company sits in exactly one. The split that carries the
most weight is between **actions** and **active**: one is the user's move,
the other is someone else's.

## actions

Things waiting on the user. This is the only list about their own move, and
it is the reason the page exists.

Belongs here:

- A reply owed to a real person, especially an unread or unanswered thread
- An assignment, take-home or case study that was assigned and not returned
- An application the user has scheduled or committed to submitting
- Prep for something happening today or tomorrow
- A referral the user asked someone for and has not followed through on
- An administrative deadline tied to the search (benefits certification,
  a portal that needs updating, a form with an expiry)

Does not belong here:

- Anything the user is waiting to hear back on. That is `active` or `stale`.
- Vague intentions with no next step. "Think about Acme" is not an action.

Write each one so the first line says what to do and the second says why it
matters, with the date and where it came from. A bare "follow up with Acme"
is not actionable three days later.

## active

Live conversations where the ball is genuinely in play: interviews booked,
loops in progress, recruiters mid-conversation, applications recently
submitted and still within normal response time.

Chip guidance:

- `["c-soon","TODAY"]` for something happening today
- `["c-next","BOOKED"]` for a confirmed future round
- `["c-wait","WAITING"]` when the company owes a response
- `["c-act","YOUR MOVE"]` when the user owes something. Anything with this
  chip should also appear in `actions`.

Include the interviewer's name and the round format when known. Those are
the details people scramble for right before a call.

## stale

No reply for long enough that it needs a nudge or a decision to close it.

There is no universal threshold. Judge against the pace that thread was
moving: a recruiter who replied within a day for two weeks and has now been
silent for ten days is stale, while an application submitted to a careers
page three weeks ago is not.

As a default, with no other signal: two weeks after a real conversation,
four weeks after an application.

Always state how long it has been and what the last contact actually was.
"Recruiter screen 15 July, six weeks silent" tells the user what to do.
"Gone quiet" does not.

## unclear

Leads that exist but were never actioned. Referrals someone offered, intros
that were promised, a posting the user flagged and never applied to.

These are the cheapest opportunities in the whole pipeline and the easiest
to lose, because they never generated an email thread to remind anyone.
Keep them visible. Do not fold them into `stale`, which implies someone is
being waited on.

## closed

Rejections, withdrawals, roles that were paused or cancelled.

Record the date and the stated reason. Quote feedback verbatim when a
company gave any, because most give none and the exceptions are worth
keeping.

Distinguish between:

- **Rejected.** They decided against the user.
- **Withdrew.** The user decided against them.
- **Paused or cancelled.** The role stopped existing. Not a judgment on the
  user, and sometimes worth revisiting later.

Keep closed entries rather than deleting them. They prevent re-applying to
the same role, they show patterns in feedback, and the full board is an
honest picture of how a search actually goes.

## Judgment calls

**A company with two threads.** One role closed, another conversation still
open with the same recruiter. Track the live one and note the closed role in
its `note` field.

**Scheduled but unconfirmed.** The user accepted a time and no invite ever
arrived. That is an action, not a booking. Scheduling handoffs drop more
often than people expect.

**Two recruiters, one company.** Flag it. Submissions can collide and it
causes real problems. Same when one agency has two people working with the
user: most will not represent a candidate twice.

**Agency recruiters.** Track the agency as its own entry alongside the
companies it introduced. The relationship outlives any single role.

**Non-job conversations.** Advisory chats, angel groups, fractional work and
consulting leads surface the same way interviews do. Keep them if the user
wants them tracked, and label them clearly so they do not read as jobs.
