# Resume style rules

Default formatting and content rules for every resume this skill produces.
They exist so the same decisions don't get re-made (or the same bugs
re-introduced) on each application. A user's stated preference always wins
over a default here.

## Content structure

- **Header**: name centered and bold, optional tagline under it, then one
  centered contact line (location, phone, email, links). Include only the
  fields the user supplied.
- **Professional Summary**: 3 lines max. A skimmable pitch, not a bio. Cut
  anything that isn't load-bearing for the specific role.
- **Core Skills**: grouped into labeled categories (for example "Data &
  Analytics:", "Leadership:", "Technical:"). This is where ATS keyword
  matching happens, so the category order, and which categories exist,
  should shift with the target job. Lead with the category the posting leans
  on hardest.
- **Professional Experience**: each entry reads **Company, Title**, not
  "Title at Company". The recognizable name goes first. If someone held
  several roles at one company back to back, group them under one company
  header with the overall date range, and list each role (most recent first)
  with its own dates and bullets. Don't split them into separate entries.
- **Length**: one page for roughly under 8-10 years of experience. Past
  that, two pages is normal; don't shrink fonts or cram to force one. Either
  way the strongest, most relevant material belongs on page one, and a
  second page with only a few lines on it should be tightened back to one.
- **Education** goes at the bottom once someone is past being a recent
  graduate. For students, new grads, and career changers, set `sectionOrder`
  so education or projects sit above a thin job history.
- **Projects** (optional) are for coursework, capstones, side projects,
  open source, or freelance work that proves a skill the job history
  doesn't. Leave the section out when the experience already carries it.

## Formatting rules

- **No em dashes by default.** Use a comma, or a period and a new sentence.
  They read as a stylistic tic and are easy to miss on a skim, so the
  generator fails loudly when it finds one. A user who wants them can set
  `"style": { "allowEmDashes": true }`.
- **Right-aligned dates use a computed tab stop, never
  `TabStopPosition.MAX`.** That docx-js constant is hardcoded to an A4
  content width (9026 DXA). On any other page size or margin it leaves dates
  short of the real right edge, which looks like the dates are floating. The
  generator derives the position from page width minus margins. Don't
  replace it with a hardcoded number.
- **One font throughout** (Arial by default), one accent color for the name,
  company names and section headings, gray for dates and the tagline. Both
  are configurable under `style`, but keep them consistent within a resume
  and across a user's tailored versions.
- **Real Word bullets** (`LevelFormat.BULLET`), never a typed bullet
  character. Keeps the file editable and the glyphs consistent.
- **ATS-safe layout**: single column, no tables, text boxes, images, or
  headers/footers carrying content.

## Tailoring to a specific job

1. **Read the posting for what it prioritizes**, not just keywords. Which
   2-3 themes does it return to ("platform enabling other teams," "influence
   without authority," "regulated environments")? Those shape the summary
   and the skill-category order.
2. **Reuse real facts, reframe the language.** Never invent metrics,
   technologies, titles, or responsibilities. Rewording a bullet into the
   posting's vocabulary is fine when the underlying fact supports it:
   describing a shared component library as "a platform that let other teams
   ship independently" is a legitimate reframe of a true fact.
3. **If there's a real gap**, don't cover it with vague language that
   implies experience the user lacks. Draw the closest honest parallel, or
   leave it alone, and tell the user about the gap.
4. **Chronology is fixed.** Reorder skill categories and reword bullets
   freely. Don't reorder, merge, or re-date jobs.
5. **Numbers are copied, never rounded up or recomputed.** If the baseline
   says 15%, the tailored version says 15%.
6. **Name the file after the target**, for example
   `Jordan_Rivera_Resume_Acme_SeniorPM.docx`, so versions don't collide.

## User-specific corrections

People often have facts that get repeated wrong (an old metric in a stale
copy, a role that keeps getting described as something it wasn't). When a
user tells you one, treat it as standing for the rest of the conversation,
fix it everywhere it appears, and mention the fix. Users who install this
skill for themselves can record theirs below.

<!-- Add your own standing corrections here, one per bullet. Example:
- The 2023 retention lift was 15%, not 40%. Older copies say 40% and are wrong.
-->
