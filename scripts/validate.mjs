import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';
import { allLessons, capstoneChecks, course, glossary } from '../js/content.js';
import { evaluateAnswer, validateCapstone, validateCourse } from '../js/validators.js';

const root = process.cwd();
const errors = [];
const ok = (condition, message) => { if (!condition) errors.push(message); };
const read = (path) => readFileSync(resolve(root, path), 'utf8');

function filesUnder(path) {
  const absolute = resolve(root, path);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute).flatMap((name) => {
    const child = join(absolute, name);
    return statSync(child).isDirectory() ? filesUnder(relative(root, child)) : [relative(root, child).replaceAll('\\', '/')];
  });
}

function validateRequiredFiles() {
  const required = [
    'index.html', '404.html', 'README.md', 'LICENSE', 'package.json', '.gitignore', '.nojekyll',
    'css/styles.css', 'js/app.js', 'js/content.js', 'js/validators.js', 'assets/logo.svg',
    'docs/00_documentation_index.md', 'docs/01_requirements/01_product_requirements.md',
    'docs/02_planning/01_implementation_plan.md', 'docs/02_planning/02_task_tracker.md',
    'docs/02_planning/03_agent_execution_design.md', 'docs/03_design/03_course_mindmap.md',
    'docs/03_design/04_topic_map_library.md', 'scripts/generate-topic-maps.mjs',
    '.github/workflows/validate.yml', '.github/workflows/pages.yml',
    'starter/portfolio/index.html', 'starter/portfolio/css/styles.css', 'starter/portfolio/js/main.js'
  ];
  required.forEach((file) => ok(existsSync(resolve(root, file)), `Missing required file: ${file}`));
}

function validateJavaScript() {
  for (const file of filesUnder('js').filter((path) => ['.js', '.mjs'].includes(extname(path))).concat(filesUnder('scripts').filter((path) => ['.js', '.mjs'].includes(extname(path))))) {
    if (file.endsWith('validate.mjs')) continue;
    const source = read(file).replace(/^import .*;\s*$/gm, '').replace(/^export\s+/gm, '');
    if (source.includes('import.meta')) continue;
    try { new Function(source); }
    catch (error) { errors.push(`${file}: JavaScript syntax failed: ${error.message}`); }
  }
}

function validateContent() {
  errors.push(...validateCourse(course, glossary));
  ok(course.length >= 10, 'Course must contain at least 10 sequential modules');
  ok(allLessons.length >= 40, 'Course must contain at least 40 complete lessons');
  ok(capstoneChecks.length >= 12, 'Capstone validator must contain at least 12 checks');
  const quiz = allLessons[0].quiz;
  ok(evaluateAnswer(quiz, quiz.answer, 0).status === 'correct', 'Correct quiz path failed');
  const wrong = (quiz.answer + 1) % quiz.options.length;
  ok(evaluateAnswer(quiz, wrong, 0).status === 'hint', 'First-error hint path failed');
  ok(evaluateAnswer(quiz, wrong, 1).status === 'remediate', 'Repeated-error remediation path failed');
  ok(validateCapstone(capstoneChecks.map((item) => item.id), capstoneChecks).complete, 'Complete capstone state failed');
  const content = JSON.stringify(course).toLowerCase();
  const concepts = ['windows', 'macos', 'linux', 'file explorer', 'finder', 'git bash', 'get-content', 'git init', 'git clone', 'git add', 'git diff', 'git commit', '.gitignore', 'git switch', 'git merge', 'merge conflict', 'pull request', 'git fetch', 'git pull', 'git push', 'git stash', 'git reflog', 'git revert', 'git tag', 'cherry-pick', 'git bisect', 'git clean -n', 'git lfs', 'markdown', 'html', 'css', 'javascript', 'github actions', 'github pages', 'software development lifecycle', 'custom domain', 'dns', 'https'];
  concepts.forEach((concept) => ok(content.includes(concept), `Curriculum coverage missing: ${concept}`));
  allLessons.forEach((lesson) => {
    ok(Boolean(lesson.visual?.alt), `${lesson.id}: missing visual text alternative`);
    for (const command of lesson.commands) ok(Object.keys(command.variants).length > 0, `${lesson.id}: command has no shell variants`);
  });
}

function validateHtmlAndAssets() {
  for (const file of ['index.html', '404.html', 'starter/portfolio/index.html']) {
    const html = read(file);
    ok(/<html[^>]+lang=/i.test(html), `${file}: missing document language`);
    ok(/<meta[^>]+viewport/i.test(html), `${file}: missing viewport`);
    ok(/<title>[^<]+<\/title>/i.test(html), `${file}: missing title`);
    for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      const target = match[1];
      if (/^(https?:|#|mailto:)/.test(target)) continue;
      ok(!target.startsWith('/'), `${file}: root-absolute path is not project-Pages safe: ${target}`);
      const clean = target.split(/[?#]/)[0];
      ok(existsSync(resolve(root, dirname(file), clean)), `${file}: missing local asset ${target}`);
    }
  }
  const shell = read('index.html');
  ['<header', '<main', '<aside', 'Skip to lesson', 'aria-label="Course contents"'].forEach((needle) => ok(shell.includes(needle), `index.html missing semantic landmark: ${needle}`));
  ['listen-button', 'speech-controls', 'speech-play', 'daily-minutes', 'streak-count'].forEach((needle) => ok(shell.includes(needle), `index.html missing learning support control: ${needle}`));
  const app = read('js/app.js');
  ['renderLanding', 'Course overview', 'Learning roadmap', 'What you will achieve', 'How this course is different', 'Your 30-minute daily practice', 'SpeechSynthesisUtterance', 'speech-reading', 'motivationFor'].forEach((needle) => ok(app.includes(needle), `Application missing landing/read-aloud/daily-learning feature: ${needle}`));
  const lessonRenderer = app.slice(app.indexOf('function renderLesson'), app.indexOf('function renderLanding'));
  const renderOrder = ['id="understand"', 'renderVisual(lesson.visual)', 'id="steps"', 'renderCommands(lesson)', 'id="result"', 'id="practice"', 'id="mistakes"', 'renderQuiz(lesson)'].map((needle) => lessonRenderer.indexOf(needle));
  ok(renderOrder.every((position) => position >= 0) && renderOrder.every((position, index) => index === 0 || position > renderOrder[index - 1]), 'Lesson rendering must explain, show, practice, recover, then validate in that order');
}

function validateDocumentation() {
  const docs = filesUnder('docs').filter((path) => path.endsWith('.md'));
  for (const file of docs) {
    const markdown = read(file);
    ok(/^# /m.test(markdown), `${file}: missing H1`);
    const relativeWithinStage = file.match(/^docs\/\d{2}_[^/]+\/([^/]+)$/)?.[1];
    if (relativeWithinStage) ok(/^\d{2}_[a-z0-9_]+\.md$/.test(relativeWithinStage), `${file}: SDLC files require NN_filename.md`);
    for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].replace(/^<|>$/g, '');
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const clean = target.split('#')[0];
      if (!clean) continue;
      ok(existsSync(resolve(root, dirname(file), normalize(clean))), `${file}: broken documentation link ${target}`);
    }
  }
  const mindmap = read('docs/03_design/03_course_mindmap.md');
  ok(mindmap.includes('markmap:'), 'Markmap source requires markmap front matter');
  ok((mindmap.match(/^## /gm) || []).length >= 10, 'Course mind map does not cover every major module');
  const topicLibrary = read('docs/03_design/04_topic_map_library.md');
  ok(topicLibrary.includes('scripts/generate-topic-maps.mjs'), 'Topic map library must describe the generator source');
  const generatedMarkmaps = filesUnder('docs/03_design/topic_maps/markmap').filter((path) => path.endsWith('_markmap.md'));
  const generatedDiagrams = filesUnder('docs/03_design/topic_maps/mermaid').filter((path) => path.endsWith('_diagram.md'));
  ok(generatedMarkmaps.length === course.length, `Expected ${course.length} generated topic Markmap files, found ${generatedMarkmaps.length}`);
  ok(generatedDiagrams.length === course.length, `Expected ${course.length} generated topic diagram files, found ${generatedDiagrams.length}`);
  generatedMarkmaps.forEach((file) => ok(read(file).includes('markmap:'), `${file}: generated Markmap file must include markmap front matter`));
}

function validateWorkflows() {
  const validate = read('.github/workflows/validate.yml');
  const pages = read('.github/workflows/pages.yml');
  ['pull_request:', 'contents: read', 'npm test'].forEach((needle) => ok(validate.includes(needle), `validate workflow missing ${needle}`));
  ['pages: write', 'id-token: write', 'needs: validate', 'configure-pages', 'upload-pages-artifact', 'deploy-pages', 'environment:', 'concurrency:'].forEach((needle) => ok(pages.includes(needle), `Pages workflow missing ${needle}`));
}

validateRequiredFiles();
validateJavaScript();
validateContent();
validateHtmlAndAssets();
validateDocumentation();
validateWorkflows();

if (errors.length) {
  console.error(`Validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validation passed: ${course.length} modules, ${allLessons.length} lessons, ${filesUnder('docs').filter((file) => file.endsWith('.md')).length} documentation files, ${capstoneChecks.length} capstone checks.`);
