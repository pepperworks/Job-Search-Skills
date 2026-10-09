# Job Search Skills for Claude

Three add-ons that turn Claude into a job search assistant. They're free, and you don't need to know how to code to use them.

| Skill | What it does for you |
| --- | --- |
| **Resume Tailor** | You give it your resume and a job posting. It rewrites your resume to fit that job, hands you a Word file, and tells you how good a match you are. |
| **Interview Prep** | You tell it who you're interviewing with. It gives you a one-page cheat sheet, likely questions with answers drawn from your own experience, and a practice interview if you want one. |
| **Pipeline Tracker** | It builds one page showing every company you're talking to, where each one stands, and who is waiting on a reply from you. |

All three follow one rule: **Claude describes what you've really done in the best light. It never makes things up.** If a job asks for something you don't have, it tells you.

## Install (about 5 minutes)

You need a Claude account. That's it.

### Step 1: Download the three files

Click each link. A file ending in `.zip` will save to your Downloads folder.

- [Download Resume Tailor](https://github.com/pepperworks/Job-Search-Skills/raw/main/downloads/resume-tailor.zip)
- [Download Interview Prep](https://github.com/pepperworks/Job-Search-Skills/raw/main/downloads/interview-prep.zip)
- [Download Pipeline Tracker](https://github.com/pepperworks/Job-Search-Skills/raw/main/downloads/pipeline-tracker.zip)

Don't open the files. Claude needs them exactly as they downloaded.

> **On a Mac using Safari?** Safari sometimes opens the file for you and turns it into a folder. If you see a folder instead of a `.zip` file, right-click the folder and choose **Compress**. Use the `.zip` that creates.

### Step 2: Let Claude create files

1. Open Claude and go to **Settings**.
2. Choose **Capabilities**.
3. Turn on **Code execution and file creation**.

This is what lets Claude hand you a finished Word document.

### Step 3: Add each skill to Claude

1. In Claude, open **Customize**, then **Skills**.
2. Click the **+** button, then **Create skill**.
3. Choose **Upload a skill**.
4. Pick one of the files you downloaded.
5. Do this two more times for the other two files.

Each skill shows up in your list with a switch next to it. Make sure the switch is on.

Menus in Claude change from time to time. If yours looks different, Anthropic keeps the current steps here: [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude).

## How to use them

Start a new chat and type what you want in plain words. Claude picks the right skill on its own.

**To tailor your resume:** attach your resume, paste in the job posting, and say:

> Tailor my resume for this job.

**To get ready for an interview:**

> Help me prep for my interview with Acme on Thursday. Here's the job posting and my resume.

Then, when you want to rehearse:

> Run a practice interview with me.

**To see where everything stands:**

> Build my job search dashboard. Here are the companies I've applied to and what's happened with each.

## Make it do more

These work with nothing but a chat window. They get better if you connect Claude to your email and calendar, because then Claude can find the recruiter's emails, your interview times, and the threads you forgot to answer, without you pasting anything in.

## Good to know

- **Your information stays yours.** These skills are instructions for Claude. They don't send your resume anywhere else.
- **Check the work.** Read your tailored resume before you send it. Claude is told not to invent anything, and you're still the one who knows what's true.
- **Something not working?** Check that all three switches are on, and that Step 2 is done.

---

<details>
<summary>For developers</summary>

Each folder is a standard skill: a `SKILL.md` plus supporting files.

- **Claude Code:** copy the skill folders into `~/.claude/skills/` (or `.claude/skills/` in a project).
- **Rebuild the downloads** after editing a skill: `./package.sh` writes fresh zips to `downloads/`.
- **Resume generator:** `resume-tailor/scripts/generate_resume.js` needs Node.js and the `docx` package. The JSON schema and style options (font, accent color, Letter or A4, section order) are documented at the top of that file.
- **Your own baseline:** replace `resume-tailor/references/master_resume.json` with your resume to skip attaching it each time. It holds your contact details, so think before pushing a fork public.
- **Dashboard calendar:** `pipeline-tracker/assets/dashboard-template.html` hides its calendar card unless `CALENDAR_TOOL` is set.

</details>

## License

MIT. See `LICENSE`.
