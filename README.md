# Job Search Skills for Claude

Two skills that make Claude useful for the repetitive parts of a job search.

| Skill | What it does |
| --- | --- |
| `resume-tailor` | Takes your resume and a job posting, rewrites the summary, skills order, and bullet wording to match the posting, builds a clean, ATS-friendly `.docx`, and tells you how well you fit the role. Works for students and career changers too. |
| `interview-prep` | Builds a prep brief for a specific interview: a one-screen cheat sheet, a full brief on the company and interviewer, likely questions with draft answers from your real experience, and a mock interview with feedback if you want to practice. |

Both follow one rule: **reframe what you've actually done, never invent it.**
Claude will tell you where a posting asks for something your resume doesn't
show instead of papering over it.

## Install

A skill is a folder with a `SKILL.md` in it.

- **Claude Code:** copy `resume-tailor/` and `interview-prep/` into
  `~/.claude/skills/` (or `.claude/skills/` inside a project).
- **Claude apps:** run `./package.sh` to produce `dist/resume-tailor.zip` and
  `dist/interview-prep.zip`, then add each zip as a custom skill in Claude's
  settings.

## Use

**Resume.** Attach or paste your resume and a job posting, then ask:

> Tailor my resume for this role.

You get a `.docx` named for the company and role, plus a fit check: what
the posting wants that you clearly have, what's a stretch, and what's
missing.

To skip attaching your resume each time, replace
`resume-tailor/references/master_resume.json` with your own content before
installing. The file ships with a fictional sample that shows the format.

**Interview.**

> Prep me for my interview with Acme tomorrow.

With calendar, email, and file storage connected, Claude finds the invite,
the recruiter's emails, and your resume on its own. Without them, it asks
you for the posting, your resume, and whatever the recruiter sent. To
rehearse out loud, ask:

> Run a mock interview for this role.

## Make it yours

- **Look and feel:** add a `style` block to your resume JSON to change font,
  accent color, or page size (`letter` or `a4`). Options are listed at the
  top of `resume-tailor/scripts/generate_resume.js`.
- **Standing corrections:** if a fact about you keeps getting repeated wrong,
  add it to the bottom of `resume-tailor/references/style_rules.md`.
- **Your field:** the defaults are written to work across roles. If your
  field has its own conventions (academic CVs, portfolios, federal resumes),
  edit `style_rules.md` to say so.

## Requirements

`resume-tailor` needs Node.js and the `docx` npm package (`npm install docx`)
wherever Claude runs code. `interview-prep` needs nothing, and gets better
with calendar, email, and web search available.

## Privacy

Your resume stays wherever you put it. If you fork this repo and add your
own `master_resume.json`, remember it holds your phone number and email
before you push it anywhere public.

## License

MIT. See `LICENSE`.
