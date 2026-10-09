/**
 * generate_resume.js
 *
 * Turns a resume content JSON file into a formatted, ATS-friendly .docx.
 * House style is described in ../references/style_rules.md.
 *
 * Usage:
 *   npm install docx
 *   node generate_resume.js <input.json> <output.docx>
 *
 * Input JSON schema (only "name" is required; omit anything you don't have):
 * {
 *   "name": "JORDAN A. RIVERA",
 *   "tagline": "Product Leader | Platform & Growth",
 *   "contact": {
 *     "location": "Chicago, IL",
 *     "phone": "555-010-0142",
 *     "email": "jordan@example.com",
 *     "website": "https://example.com", "websiteLabel": "example.com",
 *     "linkedin": "https://linkedin.com/in/example", "linkedinLabel": "linkedin.com/in/example",
 *     "pronouns": "they/them"
 *   },
 *   "summary": "3-line professional summary paragraph...",
 *   "skills": [ { "label": "Product", "items": "A, B, C" }, ... ],
 *   "experience": [
 *     // single-role entry: renders as "Company, Title" with dates right-aligned
 *     { "company": "Northwind Labs", "title": "Senior Product Manager", "dates": "2022 - Present",
 *       "bullets": ["...", "..."] },
 *     // several roles at one company: one company header, a line per role
 *     { "company": "Fabrikam Software", "dates": "2017 - 2022",
 *       "roles": [
 *         { "title": "Product Manager", "dates": "2019 - 2022", "bullets": ["..."] },
 *         { "title": "Business Analyst", "dates": "2017 - 2019", "bullets": ["..."] }
 *       ] }
 *   ],
 *   "projects": [ { "name": "Capstone: Transit Delay Predictor", "dates": "2025", "bullets": ["..."] } ],
 *   "education": [ { "degree": "B.A. Economics, Example State University", "details": "Graduated with honors" } ],
 *   "additional": [ "Certifications, volunteering, languages, one per line" ],
 *
 *   // Optional. Sections print in this order; leave one out to hide it.
 *   // Students and career changers often want education or projects higher.
 *   "sectionOrder": ["summary", "skills", "experience", "projects", "education"],
 *
 *   // Optional. Defaults shown.
 *   "style": {
 *     "font": "Arial",
 *     "accentColor": "1F3864",     // hex, no #. Name, company names, section headings.
 *     "pageSize": "letter",        // "letter" or "a4"
 *     "allowEmDashes": false,      // false = refuse to build if an em dash is found
 *     "educationHeading": "Education",
 *     "projectsHeading": "Projects"
 *   }
 * }
 *
 * Keys starting with "_" (such as "_note") are ignored.
 * Dates use a plain hyphen or en dash: "2018 - 2021".
 */
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  LevelFormat, ExternalHyperlink, TabStopType, BorderStyle,
} = require("docx");

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("Usage: node generate_resume.js <input.json> <output.docx>");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));
if (!data.name) {
  console.error('The resume JSON needs at least a "name".');
  process.exit(1);
}
const style = data.style || {};

// --- Guardrail: no em dashes (U+2014) unless the user opted in. -------------
// Fail loudly rather than silently shipping one; they are easy to miss on a
// visual skim.
function findEmDashes(obj, path = "") {
  const hits = [];
  if (typeof obj === "string") {
    if (obj.includes("—")) hits.push(`${path}: "${obj}"`);
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => hits.push(...findEmDashes(v, `${path}[${i}]`)));
  } else if (obj && typeof obj === "object") {
    for (const k of Object.keys(obj)) {
      if (k.startsWith("_")) continue;
      hits.push(...findEmDashes(obj[k], path ? `${path}.${k}` : k));
    }
  }
  return hits;
}
if (!style.allowEmDashes) {
  const hits = findEmDashes(data);
  if (hits.length) {
    console.error("Found em dash(es) in the resume content. Replace each with a comma or period, or set style.allowEmDashes to true:");
    hits.forEach((h) => console.error("  " + h));
    process.exit(1);
  }
}

// --- Style constants ---------------------------------------------------------
const FONT = style.font || "Arial";
const ACCENT = (style.accentColor || "1F3864").replace(/^#/, "");
const GRAY = "444444";
const PAGE = String(style.pageSize || "letter").toLowerCase() === "a4"
  ? { width: 11906, height: 16838 }
  : { width: 12240, height: 15840 }; // DXA
const MARGIN_TOP = 720;     // 0.5"
const MARGIN_BOTTOM = 720;
const MARGIN_LEFT = 900;    // 0.625"
const MARGIN_RIGHT = 900;
// The right-aligned date tab MUST be derived from the actual page width and
// margins. docx-js ships a TabStopPosition.MAX constant, but it is hardcoded
// to an A4 content width with default margins (9026 DXA), which leaves dates
// short of the true right edge on any other geometry. Never use MAX here.
const CONTENT_WIDTH = PAGE.width - MARGIN_LEFT - MARGIN_RIGHT;

const sectionHeading = (text) => new Paragraph({
  spacing: { before: 140, after: 60 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT, space: 2 } },
  children: [new TextRun({ text, bold: true, size: 21, color: ACCENT, font: FONT, allCaps: true, characterSpacing: 10 })],
});

const bulletPara = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 40 },
  children: [new TextRun({ text, size: 20, font: FONT })],
});

const dateRun = (dates) => new TextRun({ text: `\t${dates}`, size: 20, font: FONT, color: GRAY, italics: true });

const jobHeader = (heading, dates) => new Paragraph({
  spacing: { before: 100, after: 20 },
  keepNext: true,
  tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
  children: [
    new TextRun({ text: heading, bold: true, size: 22, font: FONT, color: ACCENT }),
    ...(dates ? [dateRun(dates)] : []),
  ],
});

const roleLine = (title, dates) => new Paragraph({
  spacing: { before: 40, after: 20 },
  keepNext: true,
  tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
  children: [
    new TextRun({ text: title, bold: true, italics: true, size: 20, font: FONT }),
    ...(dates ? [dateRun(dates)] : []),
  ],
});

// --- Build the document body -------------------------------------------------
const children = [];

// Header
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 20 },
  children: [new TextRun({ text: data.name, bold: true, size: 34, font: FONT, color: ACCENT })],
}));
if (data.tagline) {
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: data.tagline, size: 20, font: FONT, italics: true, color: GRAY })],
  }));
}

// Contact line: only the fields that were supplied, joined with separators.
const c = data.contact || {};
const plain = (text) => new TextRun({ text, size: 18, font: FONT, color: GRAY });
const link = (url, label) => new ExternalHyperlink({
  link: url,
  children: [new TextRun({ text: label || url, size: 18, font: FONT, style: "Hyperlink" })],
});
const contactParts = [];
if (c.location) contactParts.push(plain(c.location));
if (c.phone) contactParts.push(plain(c.phone));
if (c.email) contactParts.push(plain(c.email));
if (c.website) contactParts.push(link(c.website, c.websiteLabel));
if (c.linkedin) contactParts.push(link(c.linkedin, c.linkedinLabel));
if (c.pronouns) contactParts.push(plain(c.pronouns));
if (contactParts.length) {
  const runs = [];
  contactParts.forEach((p, i) => { if (i) runs.push(plain("  |  ")); runs.push(p); });
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: runs }));
}

// Each section is built on its own so the order can change (see sectionOrder).
const sections = {
  summary() {
    if (!data.summary) return [];
    return [
      sectionHeading("Professional Summary"),
      new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: data.summary, size: 20, font: FONT })] }),
    ];
  },

  skills() {
    if (!(data.skills || []).length) return [];
    const out = [sectionHeading("Core Skills")];
    for (const s of data.skills) {
      out.push(new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: `${s.label}: `, bold: true, size: 20, font: FONT }),
          new TextRun({ text: s.items, size: 20, font: FONT }),
        ],
      }));
    }
    return out;
  },

  experience() {
    if (!(data.experience || []).length) return [];
    const out = [sectionHeading("Professional Experience")];
    for (const job of data.experience) {
      if (job.roles) {
        out.push(jobHeader(job.company, job.dates));
        for (const r of job.roles) {
          out.push(roleLine(r.title, r.dates));
          for (const b of r.bullets || []) out.push(bulletPara(b));
        }
      } else {
        // single role: title shares the line with the company, company first
        out.push(jobHeader(job.title ? `${job.company}, ${job.title}` : job.company, job.dates));
        for (const b of job.bullets || []) out.push(bulletPara(b));
      }
    }
    return out;
  },

  projects() {
    if (!(data.projects || []).length) return [];
    const out = [sectionHeading(style.projectsHeading || "Projects")];
    for (const p of data.projects) {
      out.push(jobHeader(p.name, p.dates));
      for (const b of p.bullets || []) out.push(bulletPara(b));
    }
    return out;
  },

  // Education accepts an array of entries; a single object works too.
  education() {
    const eduList = Array.isArray(data.education) ? data.education : (data.education ? [data.education] : []);
    const additional = Array.isArray(data.additional) ? [...data.additional] : (data.additional ? [data.additional] : []);
    if (!eduList.length && !additional.length) return [];
    const out = [sectionHeading(style.educationHeading || "Education")];
    for (const e of eduList) {
      if (e.degree) out.push(new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: e.degree, bold: true, size: 20, font: FONT })] }));
      const details = e.details || e.honors;
      if (details) out.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: details, size: 20, italics: true, font: FONT })] }));
      if (e.additional) additional.push(e.additional);
    }
    for (const line of additional) {
      out.push(new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: line, size: 20, font: FONT })] }));
    }
    return out;
  },
};

const DEFAULT_ORDER = ["summary", "skills", "experience", "projects", "education"];
const order = Array.isArray(data.sectionOrder) && data.sectionOrder.length ? data.sectionOrder : DEFAULT_ORDER;
const unknown = order.filter((k) => !sections[k]);
if (unknown.length) {
  console.error(`Unknown section(s) in sectionOrder: ${unknown.join(", ")}. Valid: ${DEFAULT_ORDER.join(", ")}`);
  process.exit(1);
}
for (const key of order) children.push(...sections[key]());

// --- Assemble and write ------------------------------------------------------
const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 20, color: "222222" } } } },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 200 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE.width, height: PAGE.height },
        margin: { top: MARGIN_TOP, right: MARGIN_RIGHT, bottom: MARGIN_BOTTOM, left: MARGIN_LEFT },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Wrote ${outputPath}`);
});
