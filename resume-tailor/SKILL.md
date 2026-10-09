---
name: resume-tailor
description: Tailor the user's resume to a specific job posting and produce a formatted, ATS-friendly .docx. Use whenever the user pastes or links a job description and asks to customize, tailor, or adjust their resume for it, asks for "a resume for this role," mentions applying somewhere, or asks to update or regenerate their resume in general (even with no job posting, in which case rebuild the baseline as-is). Also use the first time someone wants to set up their baseline resume for future tailoring.
---

# Resume Tailor

One baseline resume, tailored per job. This skill holds a consistent house
style and a repeatable way to adapt content to a posting, so each new
application doesn't mean re-deciding formatting or reintroducing layout bugs.

The core rule: **reframe real experience, never invent it.** Every line in
the output must trace to something the user actually did.

## Workflow

1. **Get the baseline resume.** In order of preference:
   - A resume the user attached or pasted in this conversation.
   - Their current resume in connected file storage (Google Drive, OneDrive,
     etc.), if a connector is available. Ask what it's called if a search
     doesn't find it quickly.
   - `references/master_resume.json`, if the user has replaced the sample
     content with their own.

   The bundled `master_resume.json` ships as a **fictional sample** (its
   `_note` field says so). Never tailor from the sample. If that's all you
   have, ask the user for their resume first.

   Whatever the source, translate it into the JSON schema documented at the
   top of `scripts/generate_resume.js` before going further. Copy facts
   exactly: titles, dates, numbers. If something in the source is ambiguous
   (a date range, a metric with no unit), ask rather than guess.

2. **Shore up a thin baseline before tailoring it.** Tailoring can't fix a
   resume that lists duties with no outcomes. If most bullets lack a result,
   a number, or a sense of scope, ask up to five targeted questions about
   the most recent and most relevant roles (how many, how much, how often,
   what changed because of it, who it was for) and fold the answers in. Use
   only what the user tells you. If they don't know a number, leave it out.
   Skip this when the baseline is already strong or the user is in a hurry.

   For students, new grads, and career changers, use `projects` and
   `sectionOrder` (see the schema) to put education, projects, or
   transferable work above a thin job history.

3. **Read `references/style_rules.md`.** It covers layout, the tailoring
   philosophy, and the reasons behind each rule. Apply it without asking.
   If the user has told you their own standing preferences or corrections
   (a number that's often misquoted, a role that's often mis-framed), those
   override the defaults.

4. **If there's a job description, tailor the content:**
   - Identify the 2-3 themes the posting returns to most.
   - Reorder the `skills` categories so the most relevant one leads.
   - Rewrite the `summary` to foreground those themes using the user's real
     background.
   - Reword bullets to mirror the posting's vocabulary where the underlying
     fact supports it. Leave a bullet alone rather than stretch it to cover
     a requirement the user doesn't meet.
   - Never change chronology. Job order and dates stay as they are.

   With no job description, use the baseline unchanged.

5. **Write the content to a JSON file and generate the docx:**
   ```bash
   cd scripts
   npm install docx   # once per environment
   node generate_resume.js content.json <First>_<Last>_Resume_<Company>_<RoleShort>.docx
   ```
   The script refuses to build if it finds an em dash (unless the user opted
   out via `style.allowEmDashes`) and tells you where it is. It also computes
   the right-aligned date tab stop from the real page geometry. Don't
   hand-roll either.

6. **Check the output before handing it over.** If you can render it (for
   example LibreOffice to PDF, then PDF to image, or a docx skill's
   validator), look at the pages: dates flush with the right margin, no
   near-empty trailing page, strongest material on page one. If you can't
   render it in this environment, say so instead of implying you checked.

7. **Deliver with a fit check.** Give the user the file plus a short note:
   - **Covered:** the posting's main requirements their resume clearly shows.
   - **Stretch:** requirements met only partly or by a close parallel.
   - **Missing:** requirements the resume doesn't show at all.
   - **Changed:** the themes you targeted and the bullets you reworded.

   Be straight about it. If the role looks like a long shot, say so and say
   why; that helps them decide where to spend their time. The gaps also tell
   them what to prepare for in an interview. If they keep resumes in
   connected storage and want this one saved there, save it with the others.

## Files

- `scripts/generate_resume.js`: the docx generator. The header comment is the
  JSON schema.
- `references/style_rules.md`: house style and tailoring philosophy. Short;
  read it every time.
- `references/master_resume.json`: fictional sample showing the schema.
  Users can replace it with their own baseline.
