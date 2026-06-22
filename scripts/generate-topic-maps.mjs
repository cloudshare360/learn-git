import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { course } from '../js/content.js';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const designDir = join(root, 'docs', '03_design');
const topicMapsDir = join(designDir, 'topic_maps');
const markmapDir = join(topicMapsDir, 'markmap');
const mermaidDir = join(topicMapsDir, 'mermaid');

const normalizeText = (text = '') => text.replace(/\s+/g, ' ').trim();
const shorten = (text, max = 96) => {
  const normalized = normalizeText(text);
  return normalized.length <= max ? normalized : `${normalized.slice(0, max - 1).trimEnd()}…`;
};
const escapeMarkdown = (text = '') => text.replace(/`/g, '\\`');
const escapeMermaid = (text = '') => shorten(text).replace(/"/g, "'").replace(/</g, '&lt;').replace(/>/g, '&gt;');
const twoDigit = (value) => String(value).padStart(2, '0');

function markmapContent(module) {
  const lines = [
    '---',
    'markmap:',
    '  colorFreezeLevel: 2',
    '  initialExpandLevel: 2',
    '  maxWidth: 320',
    '---',
    '',
    `# ${module.number}. ${module.title}`,
    '',
    '## Module overview',
    '',
    `- Goal: ${escapeMarkdown(module.description)}`,
    `- Lesson count: ${module.lessons.length}`,
    `- Visual types: ${[...new Set(module.lessons.map((lesson) => lesson.visual?.type).filter(Boolean))].join(', ')}`,
    '',
    '## Lessons',
    ''
  ];

  for (const lesson of module.lessons) {
    lines.push(`### ${escapeMarkdown(lesson.title)}`);
    lines.push('');
    lines.push(`- Outcome: ${escapeMarkdown(lesson.outcome)}`);
    if (lesson.prerequisites?.length) {
      lines.push('- Prerequisites:');
      lesson.prerequisites.forEach((item) => lines.push(`  - ${escapeMarkdown(item)}`));
    }
    if (lesson.terms?.length) {
      lines.push('- Terms:');
      lesson.terms.forEach((term) => lines.push(`  - ${escapeMarkdown(term)}`));
    }
    if (lesson.steps?.length) {
      lines.push('- Key actions:');
      lesson.steps.slice(0, 5).forEach((step) => lines.push(`  - ${escapeMarkdown(step.title)}`));
    }
    if (lesson.commands?.length) {
      lines.push('- Command goals:');
      lesson.commands.slice(0, 4).forEach((command) => lines.push(`  - ${escapeMarkdown(command.goal)}`));
    }
    if (lesson.visual) lines.push(`- Visual: ${escapeMarkdown(`${lesson.visual.type} — ${lesson.visual.title}`)}`);
    if (lesson.practice) lines.push(`- Practice: ${escapeMarkdown(shorten(lesson.practice, 140))}`);
    lines.push('');
  }

  return `${lines.join('\n').trim()}\n`;
}

function mermaidSequence(module) {
  const lines = ['flowchart TD', `  M["${escapeMermaid(`${module.number}. ${module.title}`)}"]`];

  module.lessons.forEach((lesson, index) => {
    const lessonId = `L${index + 1}`;
    lines.push(`  ${lessonId}["${escapeMermaid(lesson.title)}"]`);
    lines.push(`  M --> ${lessonId}`);
    if (index > 0) lines.push(`  L${index} --> ${lessonId}`);
  });

  return lines.join('\n');
}

function mermaidConcepts(module) {
  const lines = ['flowchart LR', `  M["${escapeMermaid(`${module.number}. ${module.title}`)}"]`];

  module.lessons.forEach((lesson, index) => {
    const lessonId = `L${index + 1}`;
    lines.push(`  ${lessonId}["${escapeMermaid(lesson.title)}"]`);
    lines.push(`  M --> ${lessonId}`);
    lines.push(`  ${lessonId} --> O${index + 1}["${escapeMermaid(`Outcome: ${lesson.outcome}`)}"]`);
    if (lesson.terms?.length) lines.push(`  ${lessonId} --> T${index + 1}["${escapeMermaid(`Terms: ${lesson.terms.join(', ')}`)}"]`);
    if (lesson.commands?.length) lines.push(`  ${lessonId} --> C${index + 1}["${escapeMermaid(`Commands: ${lesson.commands.map((command) => command.goal).join(' | ')}`)}"]`);
    if (lesson.visual) lines.push(`  ${lessonId} --> V${index + 1}["${escapeMermaid(`Visual: ${lesson.visual.type} — ${lesson.visual.title}`)}"]`);
  });

  return lines.join('\n');
}

function mermaidContent(module) {
  const lessonSummary = module.lessons
    .map((lesson) => `- **${lesson.title}** — ${escapeMarkdown(shorten(lesson.outcome, 140))}`)
    .join('\n');

  return [
    `# ${module.number}. ${module.title} — Code Diagrams`,
    '',
    module.description,
    '',
    '## Lesson sequence',
    '',
    '```mermaid',
    mermaidSequence(module),
    '```',
    '',
    '## Concept coverage',
    '',
    '```mermaid',
    mermaidConcepts(module),
    '```',
    '',
    '## Text summary',
    '',
    lessonSummary,
    ''
  ].join('\n');
}

function libraryContent(modules) {
  const lines = [
    '# Topic Map Library',
    '',
    'This library is generated from `js/content.js` by `scripts/generate-topic-maps.mjs`.',
    'Each course module has:',
    '',
    '1. A Markmap-compatible Markdown outline.',
    '2. A Mermaid-based companion document with code diagrams for lesson flow and concept coverage.',
    '',
    '## Module map set',
    ''
  ];

  modules.forEach((module) => {
    const fileStem = `${twoDigit(module.number)}_${module.id}`;
    lines.push(`### ${module.number}. ${module.title}`);
    lines.push('');
    lines.push(`- Markmap: [${fileStem}_markmap.md](topic_maps/markmap/${fileStem}_markmap.md)`);
    lines.push(`- Mermaid diagrams: [${fileStem}_diagram.md](topic_maps/mermaid/${fileStem}_diagram.md)`);
    lines.push(`- Lessons: ${module.lessons.map((lesson) => lesson.title).join(' · ')}`);
    lines.push('');
  });

  return `${lines.join('\n').trim()}\n`;
}

rmSync(topicMapsDir, { recursive: true, force: true });
mkdirSync(markmapDir, { recursive: true });
mkdirSync(mermaidDir, { recursive: true });

course.forEach((module) => {
  const fileStem = `${twoDigit(module.number)}_${module.id}`;
  writeFileSync(join(markmapDir, `${fileStem}_markmap.md`), markmapContent(module), 'utf8');
  writeFileSync(join(mermaidDir, `${fileStem}_diagram.md`), mermaidContent(module), 'utf8');
});

writeFileSync(join(designDir, '04_topic_map_library.md'), libraryContent(course), 'utf8');

console.log(`Generated ${course.length} topic Markmap files and ${course.length} Mermaid diagram files.`);
