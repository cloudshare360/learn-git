import { allLessons, capstoneChecks, course, glossary, lessonById, shellOptions } from './content.js';
import { evaluateAnswer } from './validators.js';

const STORAGE_KEY = 'zero-to-published-state-v1';
const defaults = {
  os: 'windows', shell: 'powershell', theme: 'light', completed: [], review: [], attempts: {}, expanded: ['start'], capstone: [],
  learning: { date: '', minutes: 0, streak: 0, lastVisit: '', dailyGoalCelebrated: false }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const slug = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaults, ...saved };
  } catch {
    return { ...defaults };
  }
}

let state = loadState();
state.learning = { ...defaults.learning, ...(state.learning || {}) };
let currentLessonId = routeLessonId();

function localDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toLocaleDateString('en-CA');
}

function beginLearningDay() {
  const today = localDate();
  if (state.learning.date !== today) {
    const continued = state.learning.lastVisit === localDate(-1);
    state.learning.streak = continued ? state.learning.streak + 1 : 1;
    state.learning.date = today;
    state.learning.minutes = 0;
    state.learning.dailyGoalCelebrated = false;
  }
  state.learning.lastVisit = today;
  saveState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function routeLessonId() {
  const id = decodeURIComponent(location.hash.replace(/^#\/?/, '').split('/')[0]);
  return id === 'home' || lessonById.has(id) ? id : 'home';
}

function routeSectionId() {
  return decodeURIComponent(location.hash.replace(/^#\/?/, '').split('/')[1] || '');
}

function currentShellLabel() {
  return shellOptions[state.os]?.find((item) => item.value === state.shell)?.label || state.shell;
}

function setOS(os) {
  state.os = os;
  const valid = shellOptions[os].some((item) => item.value === state.shell);
  if (!valid) state.shell = shellOptions[os][0].value;
  saveState();
  renderShellOptions();
  renderLesson();
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, 2800);
}

function renderShellOptions() {
  const osSelect = $('#os-select');
  const shellSelect = $('#shell-select');
  osSelect.value = state.os;
  shellSelect.innerHTML = shellOptions[state.os].map(({ value, label }) => `<option value="${value}">${label}</option>`).join('');
  shellSelect.value = state.shell;
}

function statusFor(id) {
  if (state.completed.includes(id)) return 'complete';
  if (state.review.includes(id)) return 'review';
  return '';
}

function renderTree(filter = '') {
  const query = filter.trim().toLowerCase();
  const tree = $('#course-tree');
  let results = 0;
  tree.innerHTML = course.map((module) => {
    const matching = module.lessons.filter((lesson) => !query || `${lesson.title} ${lesson.outcome} ${lesson.commands.map((item) => item.goal).join(' ')}`.toLowerCase().includes(query));
    if (!matching.length) return '';
    results += matching.length;
    const expanded = query || state.expanded.includes(module.id) || matching.some((lesson) => lesson.id === currentLessonId);
    return `<section class="tree-module" data-module="${module.id}">
      <button class="tree-module-button" type="button" aria-expanded="${Boolean(expanded)}" aria-controls="module-${module.id}">
        <span class="chevron" aria-hidden="true">›</span><span class="module-number">${module.number}</span><span>${escapeHtml(module.title)}</span>
      </button>
      <ul class="tree-lessons" id="module-${module.id}" ${expanded ? '' : 'hidden'}>
        ${matching.map((lesson) => `<li><button type="button" class="tree-lesson-button" data-lesson="${lesson.id}" ${lesson.id === currentLessonId ? 'aria-current="page"' : ''}>
          <span class="lesson-status ${statusFor(lesson.id)}" aria-hidden="true"></span><span>${escapeHtml(lesson.title)}</span>
          <span class="sr-only">${statusFor(lesson.id) === 'complete' ? 'Completed' : statusFor(lesson.id) === 'review' ? 'Needs review' : 'Not started'}</span>
        </button></li>`).join('')}
      </ul>
    </section>`;
  }).join('');
  $('#search-empty').hidden = results > 0;
  updateProgress();
}

function getCommandVariant(command) {
  if (command.variants[state.shell]) return command.variants[state.shell];
  const osFallback = state.os === 'windows' ? ['powershell', 'cmd', 'gitbash'] : state.os === 'macos' ? ['zsh'] : ['bash'];
  const key = osFallback.find((item) => command.variants[item]) || Object.keys(command.variants)[0];
  return command.variants[key];
}

function renderCommands(lesson) {
  if (!lesson.commands.length) return '';
  return `<section id="commands" class="lesson-section"><h2>Commands for ${escapeHtml(currentShellLabel())}</h2>
    ${lesson.commands.map((command, index) => {
      const value = getCommandVariant(command);
      if (!value) return '';
      return `<article class="command-card">
        <div class="command-heading"><div><span class="shell-badge">${escapeHtml(currentShellLabel())}</span><h3>${escapeHtml(command.goal)}</h3></div><button type="button" class="copy-button" data-copy="command-${index}">Copy</button></div>
        <pre><code id="command-${index}">${escapeHtml(value)}</code></pre>
        <p>${escapeHtml(command.explanation)}</p>
        ${command.output ? `<div class="expected-output"><strong>Expected result</strong><pre><code>${escapeHtml(command.output)}</code></pre></div>` : ''}
      </article>`;
    }).join('')}
  </section>`;
}

function renderSimulation(lesson) {
  if (!lesson.commands.length) return '';
  const command = getCommandVariant(lesson.commands[0]);
  const expected = command?.split('\n')[0]?.trim();
  if (!expected || expected.includes('<')) return '';
  return `<section id="safe-simulator" class="lesson-section simulator-card" data-simulator-answer="${escapeHtml(expected)}">
    <p class="eyebrow">Safe simulator</p><h2>Practice without running a real command</h2>
    <p>Type the first command for “${escapeHtml(lesson.commands[0].goal)}.” This checks text only; it cannot access your computer.</p>
    <form><label for="simulator-input">${escapeHtml(currentShellLabel())} command</label><div class="simulator-prompt"><span aria-hidden="true">›</span><input id="simulator-input" name="command" autocomplete="off" spellcheck="false"></div><button class="secondary-button" type="submit">Check simulated command</button></form>
    <div class="simulator-feedback" role="status" aria-live="polite"></div>
  </section>`;
}

function renderVisual(visual) {
  const items = visual.nodes.map((node, index) => `<li><span class="visual-node-index">${index + 1}</span><span>${escapeHtml(node)}</span></li>`).join('');
  return `<figure class="learning-visual visual-${escapeHtml(visual.type)}" id="visual">
    <figcaption><span>Visual model</span><strong>${escapeHtml(visual.title)}</strong></figcaption>
    <ol>${items}</ol>
    <p class="visual-alt"><strong>Text alternative:</strong> ${escapeHtml(visual.alt)}</p>
  </figure>`;
}

function renderQuiz(lesson) {
  const quiz = lesson.quiz;
  const attempts = state.attempts[lesson.id] || 0;
  return `<section id="knowledge-check" class="lesson-section quiz-card" data-quiz="${lesson.id}">
    <p class="eyebrow">Validate your understanding</p><h2>${escapeHtml(quiz.prompt)}</h2>
    <p>This check uses the concept, example, and practice explained above. If the answer is unclear, return to the explanation before guessing.</p>
    <form>
      <fieldset><legend class="sr-only">Choose one answer</legend>
        ${quiz.options.map((option, index) => `<label class="answer-option"><input type="radio" name="answer" value="${index}"><span>${escapeHtml(option)}</span></label>`).join('')}
      </fieldset>
      <button class="primary-button check-answer" type="submit">Check answer</button>
    </form>
    <div class="quiz-feedback" role="status" aria-live="polite">${attempts ? `<p>You have attempted this check ${attempts} time${attempts === 1 ? '' : 's'}.</p>` : ''}</div>
  </section>`;
}

function renderCapstone(lesson) {
  if (!['build-capstone', 'github-pages', 'custom-domain', 'release-maintain'].includes(lesson.id)) return '';
  return `<section id="capstone-validator" class="lesson-section capstone-card"><p class="eyebrow">Capstone validator</p><h2>Production-readiness checklist</h2><p>Check an item only after you have verified it. Progress is stored in this browser.</p>
    <div class="checklist">${capstoneChecks.map((item) => `<label><input type="checkbox" data-capstone="${item.id}" ${state.capstone.includes(item.id) ? 'checked' : ''}><span>${escapeHtml(item.label)}</span></label>`).join('')}</div>
    <p><strong id="capstone-score">${state.capstone.length} of ${capstoneChecks.length}</strong> checks verified.</p></section>`;
}

function renderLesson() {
  stopSpeech();
  if (currentLessonId === 'home') {
    renderLanding();
    return;
  }
  const lesson = lessonById.get(currentLessonId) || allLessons[0];
  const index = allLessons.findIndex((item) => item.id === lesson.id);
  const terms = lesson.terms.map((key) => ({ key, name: key.replaceAll('_', ' '), definition: glossary[key] || 'Defined in this lesson.' }));
  const completed = state.completed.includes(lesson.id);

  $('#lesson-content').innerHTML = `<article class="lesson-article">
    <header class="lesson-header"><p class="breadcrumb">Module ${escapeHtml(lesson.moduleNumber)} · ${escapeHtml(lesson.moduleTitle)}</p><h1>${escapeHtml(lesson.title)}</h1><p class="lesson-outcome">${escapeHtml(lesson.outcome)}</p><div class="lesson-meta"><span>About ${lesson.duration} minutes</span><span>${completed ? '✓ Completed' : 'Not completed'}</span></div></header>
    <ol class="learning-cycle" aria-label="Lesson learning sequence"><li><strong>1. Understand</strong><span>Learn the concept and why it matters</span></li><li><strong>2. See</strong><span>Use the visual and worked steps</span></li><li><strong>3. Practice</strong><span>Apply it and inspect the result</span></li><li><strong>4. Validate</strong><span>Check understanding and review gaps</span></li></ol>
    ${lesson.prerequisites.length ? `<aside class="prerequisites"><strong>Before you begin</strong><ul>${lesson.prerequisites.map((id) => `<li><a href="#/${id}">${escapeHtml(lessonById.get(id)?.title || id)}</a></li>`).join('')}</ul></aside>` : ''}
    <section id="understand" class="lesson-section"><h2>Understand the idea</h2>${lesson.explanation.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</section>
    ${renderVisual(lesson.visual)}
    <section id="steps" class="lesson-section"><h2>Follow the steps</h2><ol class="steps-list">${lesson.steps.map((step, stepIndex) => `<li><span class="step-number">${stepIndex + 1}</span><div><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.body)}</p></div></li>`).join('')}</ol></section>
    ${renderCommands(lesson)}
    ${renderSimulation(lesson)}
    <section id="result" class="lesson-section result-card"><h2>Expected result</h2><p>${escapeHtml(lesson.expected)}</p></section>
    <section id="practice" class="lesson-section practice-card"><h2>Practice independently</h2><p>${escapeHtml(lesson.practice)}</p></section>
    <section id="mistakes" class="lesson-section"><h2>Common mistakes and recovery</h2><div class="mistake-grid">${lesson.mistakes.map((item) => `<article><h3>${escapeHtml(item.symptom)}</h3><p><strong>Why:</strong> ${escapeHtml(item.cause)}</p><p><strong>Recover:</strong> ${escapeHtml(item.recovery)}</p></article>`).join('')}</div></section>
    ${renderCapstone(lesson)}
    ${renderQuiz(lesson)}
    <nav class="lesson-pagination" aria-label="Lesson navigation">${index > 0 ? `<a href="#/${allLessons[index - 1].id}" rel="prev">← ${escapeHtml(allLessons[index - 1].title)}</a>` : '<span></span>'}${index < allLessons.length - 1 ? `<a href="#/${allLessons[index + 1].id}" rel="next">${escapeHtml(allLessons[index + 1].title)} →</a>` : '<span></span>'}</nav>
  </article>`;

  $('#terms-list').innerHTML = terms.length ? terms.map((term) => `<div><dt>${escapeHtml(term.name)}</dt><dd>${escapeHtml(term.definition)}</dd></div>`).join('') : '<div><dt>No new terms</dt><dd>Review and apply concepts from earlier lessons.</dd></div>';
  $('#on-page-nav').innerHTML = $$('.lesson-section, .learning-visual', $('#lesson-content')).map((section) => `<a href="#/${lesson.id}/${section.id}" data-scroll-to="${section.id}">${escapeHtml($('h2, figcaption strong', section)?.textContent || section.id)}</a>`).join('');
  $('#complete-button').textContent = completed ? 'Lesson completed ✓' : 'Mark lesson complete';
  $('#complete-button').disabled = completed;
  delete $('#complete-button').dataset.action;
  document.title = `${lesson.title} — Zero to Published`;
  renderTree($('#course-search').value);
  closePanels();
}

function renderLanding() {
  $('#lesson-content').innerHTML = `<article class="landing-page">
    <header class="landing-hero">
      <p class="eyebrow">No computer knowledge assumed</p>
      <h1>Go from your first folder to a published portfolio.</h1>
      <p class="landing-lead">Zero to Published is a practical Git, GitHub, and web-development course for complete beginners. You learn each idea visually, practice it safely, check your understanding, and finish by sharing real work with the world.</p>
      <div class="landing-actions"><a class="primary-link" href="#/welcome">Start from the beginning</a><a class="secondary-link" href="#/home/roadmap">See the roadmap</a></div>
      <ul class="landing-facts" aria-label="Course facts"><li><strong>${course.length}</strong><span>modules</span></li><li><strong>${allLessons.length}</strong><span>lessons</span></li><li><strong>3</strong><span>operating systems</span></li><li><strong>1</strong><span>published portfolio</span></li></ul>
    </header>
    <section class="landing-section" id="course-overview"><p class="eyebrow">Course overview</p><h2>Learn the whole workflow, not disconnected commands</h2><p>You begin with clicking, folders, filenames, paths, and terminals on Windows, macOS, or Linux. You then install Git and VS Code, record changes, work with branches, collaborate through pull requests, recover from mistakes, and use releases and automation.</p><p>The final part teaches Markdown, HTML, CSS, and JavaScript so you can build an accessible portfolio, deploy it with GitHub Actions and GitHub Pages, connect a custom domain, and maintain it like a real production project.</p></section>
    <section class="landing-section daily-plan" id="daily-plan"><p class="eyebrow">Your 30-minute daily practice</p><h2>Small, consistent sessions create durable skills</h2><div class="daily-plan-grid"><article><strong>5 min</strong><h3>Review</h3><p>Open one review item or explain yesterday’s key idea without looking.</p></article><article><strong>15 min</strong><h3>Learn</h3><p>Complete one focused lesson. Pause and repeat commands in the safe practice project.</p></article><article><strong>10 min</strong><h3>Apply</h3><p>Perform the independent task, record one commit or note, and stop at a clean checkpoint.</p></article></div><p class="daily-message">Today: <strong>${state.learning.minutes} of 30 minutes</strong> · <strong>${state.learning.streak}-day learning streak</strong>. Consistency matters more than finishing many lessons at once.</p></section>
    <section class="landing-section" id="roadmap"><p class="eyebrow">Learning roadmap</p><h2>A visible path from zero to production</h2><ol class="roadmap-list">${course.map((module) => `<li><span>${module.number}</span><div><h3>${escapeHtml(module.title)}</h3><p>${escapeHtml(module.description)}</p><a href="#/${module.lessons[0].id}">Open this module</a></div></li>`).join('')}</ol></section>
    <section class="landing-section outcomes-section" id="outcomes-section"><p class="eyebrow">What you will achieve</p><h2>At the end, you can complete a real delivery cycle</h2><div class="outcome-grid">
      <article><span aria-hidden="true">01</span><h3>Use a computer confidently</h3><p>Navigate files and folders through graphical tools and terminals, understand paths, and work safely across operating systems.</p></article>
      <article><span aria-hidden="true">02</span><h3>Use Git independently</h3><p>Create and clone repositories, inspect changes, commit focused work, branch, merge, synchronize, tag, recover, and troubleshoot.</p></article>
      <article><span aria-hidden="true">03</span><h3>Collaborate on GitHub</h3><p>Use issues, forks, remotes, feature branches, pull requests, reviews, conflicts, checks, releases, and team workflows.</p></article>
      <article><span aria-hidden="true">04</span><h3>Publish proof of your work</h3><p>Build a responsive accessible portfolio, document it in Markdown, deploy through Pages, and map an HTTPS custom domain.</p></article>
    </div></section>
    <section class="landing-section difference-section" id="difference-section"><p class="eyebrow">How this course is different</p><h2>Designed for learning, recovery, and real outcomes</h2><div class="difference-grid">
      <article><h3>No hidden prerequisites</h3><p>Computer basics are taught explicitly. Terms, buttons, paths, shells, commands, and output are introduced before use.</p></article>
      <article><h3>GUI and terminal together</h3><p>Use Explorer, Finder, VS Code, GitHub, and terminal commands instead of being locked into only one interface.</p></article>
      <article><h3>Mistakes are part of the curriculum</h3><p>Every lesson explains common failures, their causes, and the safest recovery path. Risky operations stay in disposable practice.</p></article>
      <article><h3>Accessible visual learning</h3><p>Diagrams, Markmap source, text alternatives, quizzes, remediation, progress tracking, and read-aloud highlighting support different learning needs.</p></article>
      <article><h3>Production, not a toy exercise</h3><p>The capstone includes SDLC documents, feature branches, review, GitHub Actions, Pages deployment, version tags, domains, and maintenance.</p></article>
      <article><h3>Commands stay explainable</h3><p>Every command is labeled by shell and paired with its purpose, expected state, and safety context.</p></article>
    </div></section>
    <section class="landing-cta"><h2>Ready to create something you can share?</h2><p>Choose your operating system above. Your progress remains in this browser and you can export it at any time.</p><a class="primary-link" href="#/welcome">Begin lesson 1</a></section>
  </article>`;
  $('#terms-list').innerHTML = '<div><dt>Version control</dt><dd>A system that records changes so work can be compared, shared, and recovered.</dd></div><div><dt>Portfolio</dt><dd>A public collection of work and evidence that demonstrates your skills.</dd></div>';
  $('#on-page-nav').innerHTML = [['course-overview','Overview'],['daily-plan','30-minute plan'],['roadmap','Roadmap'],['outcomes-section','Outcomes'],['difference-section','What makes it different']].map(([id,label]) => `<a href="#/home/${id}" data-scroll-to="${id}">${label}</a>`).join('');
  $('#complete-button').textContent = 'Start the course';
  $('#complete-button').disabled = false;
  $('#complete-button').dataset.action = 'start';
  document.title = 'Zero to Published — Git, GitHub & the Web';
  renderTree($('#course-search').value);
  closePanels();
}

function updateProgress() {
  const percent = Math.round((state.completed.length / allLessons.length) * 100);
  $('#course-progress').value = percent;
  $('#course-progress').textContent = `${percent}%`;
  $('#progress-text').textContent = `${percent}%`;
  $('#review-count').textContent = state.review.length;
  $('#daily-minutes').textContent = state.learning.minutes;
  $('#streak-count').textContent = state.learning.streak;
}

function motivationFor(lesson) {
  const messages = {
    start: ['You built the foundation: safe habits make every later command easier.', 'First checkpoint complete. You now know how to learn safely.'],
    'computer-basics': ['Your computer is becoming a tool you control—paths and folders are real developer skills.', 'Navigation unlocked. Every terminal workflow starts with knowing where you are.'],
    tools: ['Your workspace is ready. Setup work pays off every day you build.', 'Tooling complete—now your edits can become reliable history.'],
    'git-foundations': ['You are creating explainable history, not piles of “final” files.', 'A clean commit is evidence of deliberate work.'],
    remotes: ['Local work is now shareable. You connected your computer to a collaborative workflow.', 'Remote skills unlocked—fetch, inspect, integrate, then push.'],
    branches: ['You can develop without destabilizing shared work. That is a professional habit.', 'Feature branch progress: isolated, reviewable, recoverable.'],
    collaboration: ['You are practicing how real teams improve work together.', 'Review and conflict skills turn parallel work into one reliable result.'],
    toolkit: ['You are learning to investigate before changing—a high-value engineering habit.', 'Release knowledge unlocked. Your history can now communicate production milestones.'],
    'markdown-web': ['Your work is becoming readable to browsers, teammates, and future you.', 'Web foundation complete: structure, presentation, behavior, and quality.'],
    capstone: ['You moved one step closer to public proof of your skills.', 'Production progress: plan, build, test, deploy, verify.'],
    reference: ['Advanced tools are useful because you now understand when not to use them.', 'Troubleshooting skill grows from evidence, not random commands.']
  };
  const options = messages[lesson.moduleId] || ['Checkpoint complete. Your consistent practice is building usable skill.'];
  return options[state.completed.length % options.length];
}

function markComplete(id = currentLessonId, rerender = true) {
  if (!state.completed.includes(id)) state.completed.push(id);
  state.review = state.review.filter((item) => item !== id);
  saveState();
  if (rerender) renderLesson();
  const lesson = lessonById.get(id);
  showToast(`✓ ${motivationFor(lesson)}`);
  document.body.classList.remove('celebrate');
  requestAnimationFrame(() => document.body.classList.add('celebrate'));
  setTimeout(() => document.body.classList.remove('celebrate'), 900);
}

function handleQuiz(form) {
  const lesson = lessonById.get(form.closest('[data-quiz]').dataset.quiz);
  const chosen = new FormData(form).get('answer');
  const feedback = $('.quiz-feedback', form.parentElement);
  const result = evaluateAnswer(lesson.quiz, chosen, state.attempts[lesson.id] || 0);
  if (result.status === 'missing') {
    feedback.innerHTML = '<p class="feedback-warning">Choose an answer before checking.</p>';
    return;
  }
  if (result.status === 'correct') {
    feedback.innerHTML = `<p class="feedback-success"><strong>Correct.</strong> ${escapeHtml(lesson.quiz.explanation)}</p>`;
    state.attempts[lesson.id] = state.attempts[lesson.id] || 0;
    saveState();
    markComplete(lesson.id, false);
    $('#complete-button').textContent = 'Lesson completed ✓';
    $('#complete-button').disabled = true;
    return;
  }
  const attempts = result.attempts;
  state.attempts[lesson.id] = attempts;
  if (!state.review.includes(lesson.id)) state.review.push(lesson.id);
  saveState();
  feedback.innerHTML = attempts === 1
    ? `<p class="feedback-warning"><strong>Not yet.</strong> Hint: ${escapeHtml(lesson.quiz.hint)}</p>`
    : `<p class="feedback-warning"><strong>Review the explanation, then try a new angle.</strong> <a href="#/${lesson.id}/understand" data-scroll-to="understand">Return to “Understand the idea.”</a></p><p>${escapeHtml(lesson.quiz.alternate)}</p>`;
  updateProgress();
  renderTree($('#course-search').value);
}

function exportProgress() {
  const data = JSON.stringify({ exportedAt: new Date().toISOString(), course: 'Zero to Published', state }, null, 2);
  const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: 'zero-to-published-progress.json' });
  link.click();
  URL.revokeObjectURL(url);
  showToast('Progress exported.');
}

function resetProgress() {
  if (!confirm('Reset all lesson progress, quiz attempts, and preferences on this browser? This cannot be undone unless you exported progress.')) return;
  state = { ...defaults, completed: [], review: [], attempts: {}, expanded: ['start'], capstone: [], learning: { ...defaults.learning } };
  beginLearningDay();
  saveState();
  document.documentElement.dataset.theme = state.theme;
  renderShellOptions();
  renderLesson();
  showToast('Progress reset.');
}

let speechBlocks = [];
let speechBlockIndex = 0;
let speechPaused = false;

function clearSpeechHighlight() {
  $$('.speech-reading', $('#lesson-content')).forEach((element) => element.classList.remove('speech-reading'));
  if (globalThis.CSS?.highlights) CSS.highlights.delete('tts-word');
}

function textRange(element, start, length) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let offset = 0;
  let startNode;
  let startOffset = 0;
  let endNode;
  let endOffset = 0;
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const next = offset + node.textContent.length;
    if (!startNode && start >= offset && start <= next) {
      startNode = node;
      startOffset = Math.min(start - offset, node.textContent.length);
    }
    if (startNode && start + length <= next) {
      endNode = node;
      endOffset = Math.min(start + length - offset, node.textContent.length);
      break;
    }
    offset = next;
  }
  if (!startNode || !endNode) return null;
  const range = new Range();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, Math.max(endOffset, startOffset + (startNode === endNode ? 1 : 0)));
  return range;
}

function updateSpeechButtons(reading) {
  $('#speech-play').disabled = reading && !speechPaused;
  $('#speech-pause').disabled = !reading;
  $('#speech-stop').disabled = !reading;
  $('#speech-pause').textContent = speechPaused ? 'Resume' : 'Pause';
}

function speakNextBlock() {
  clearSpeechHighlight();
  if (speechBlockIndex >= speechBlocks.length) {
    $('#speech-status').textContent = 'Finished';
    updateSpeechButtons(false);
    return;
  }
  const element = speechBlocks[speechBlockIndex];
  const text = element.textContent.trim().replace(/\s+/g, ' ');
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = Number($('#speech-rate').value);
  utterance.onstart = () => {
    element.classList.add('speech-reading');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    $('#speech-status').textContent = `Reading section ${speechBlockIndex + 1} of ${speechBlocks.length}`;
    updateSpeechButtons(true);
  };
  utterance.onboundary = (event) => {
    if (event.name !== 'word' || !globalThis.CSS?.highlights || !globalThis.Highlight) return;
    const remaining = text.slice(event.charIndex);
    const length = event.charLength || remaining.match(/^\S+/)?.[0].length || 1;
    const range = textRange(element, event.charIndex, length);
    if (range) CSS.highlights.set('tts-word', new Highlight(range));
  };
  utterance.onend = () => { speechBlockIndex += 1; speakNextBlock(); };
  utterance.onerror = (event) => {
    if (event.error === 'canceled' || event.error === 'interrupted') return;
    $('#speech-status').textContent = 'Reading stopped because the browser voice was unavailable.';
    updateSpeechButtons(false);
  };
  speechSynthesis.speak(utterance);
}

function startSpeech() {
  if (!('speechSynthesis' in window)) return;
  stopSpeech();
  speechBlocks = $$('h1, h2, h3, p, .steps-list li, .roadmap-list li', $('#lesson-content')).filter((element) =>
    element.textContent.trim() && !element.closest('nav, form, pre, .quiz-card, .checklist') && !element.parentElement?.closest('h1, h2, h3, p, li')
  );
  speechBlockIndex = 0;
  speechPaused = false;
  $('#speech-status').textContent = 'Starting…';
  speakNextBlock();
}

function toggleSpeechPause() {
  if (!speechSynthesis.speaking) return;
  if (speechPaused) speechSynthesis.resume(); else speechSynthesis.pause();
  speechPaused = !speechPaused;
  $('#speech-status').textContent = speechPaused ? 'Paused' : `Reading section ${speechBlockIndex + 1} of ${speechBlocks.length}`;
  updateSpeechButtons(true);
}

function stopSpeech() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  speechBlocks = [];
  speechBlockIndex = 0;
  speechPaused = false;
  clearSpeechHighlight();
  if ($('#speech-status')) $('#speech-status').textContent = 'Ready';
  if ($('#speech-play')) updateSpeechButtons(false);
}

function closePanels() {
  $$('.course-panel.open, .tools-panel.open').forEach((panel) => panel.classList.remove('open'));
  ['#course-menu-button', '#tools-menu-button'].forEach((button) => $(button)?.setAttribute('aria-expanded', 'false'));
  $('#panel-backdrop').hidden = true;
}

function openPanel(buttonSelector, panelSelector) {
  const button = $(buttonSelector);
  const panel = $(panelSelector);
  const willOpen = !panel.classList.contains('open');
  closePanels();
  if (willOpen) {
    panel.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
    $('#panel-backdrop').hidden = false;
    $('.close-panel, input, button', panel)?.focus();
  }
}

$('#course-tree').addEventListener('click', (event) => {
  const moduleButton = event.target.closest('.tree-module-button');
  if (moduleButton) {
    const module = moduleButton.closest('[data-module]').dataset.module;
    const expanded = moduleButton.getAttribute('aria-expanded') === 'true';
    moduleButton.setAttribute('aria-expanded', String(!expanded));
    $(`#module-${module}`).hidden = expanded;
    state.expanded = expanded ? state.expanded.filter((id) => id !== module) : [...new Set([...state.expanded, module])];
    saveState();
  }
  const lessonButton = event.target.closest('[data-lesson]');
  if (lessonButton) location.hash = `#/${lessonButton.dataset.lesson}`;
});

$('#lesson-content').addEventListener('click', async (event) => {
  const scrollLink = event.target.closest('[data-scroll-to]');
  if (scrollLink) {
    event.preventDefault();
    const targetId = scrollLink.dataset.scrollTo;
    history.replaceState(null, '', `#/${currentLessonId}/${targetId}`);
    $(`#${targetId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const copyButton = event.target.closest('[data-copy]');
  if (copyButton) {
    const text = $(`#${copyButton.dataset.copy}`).textContent;
    try { await navigator.clipboard.writeText(text); showToast('Command copied. Review placeholders before running it.'); }
    catch { showToast('Copy was unavailable. Select the command text manually.'); }
  }
});
$('#lesson-content').addEventListener('submit', (event) => { if (event.target.matches('.quiz-card form')) { event.preventDefault(); handleQuiz(event.target); } });
$('#lesson-content').addEventListener('submit', (event) => {
  if (!event.target.closest('[data-simulator-answer]')) return;
  event.preventDefault();
  const card = event.target.closest('[data-simulator-answer]');
  const actual = new FormData(event.target).get('command').trim().replace(/\s+/g, ' ');
  const expected = card.dataset.simulatorAnswer.trim().replace(/\s+/g, ' ');
  $('.simulator-feedback', card).innerHTML = actual === expected
    ? '<p class="feedback-success"><strong>Correct.</strong> The simulator matched the command and did not execute it.</p>'
    : '<p class="feedback-warning"><strong>Not yet.</strong> Compare spelling, spaces, dashes, and the current shell’s command card.</p>';
});
$('#lesson-content').addEventListener('change', (event) => {
  if (!event.target.matches('[data-capstone]')) return;
  const id = event.target.dataset.capstone;
  state.capstone = event.target.checked ? [...new Set([...state.capstone, id])] : state.capstone.filter((item) => item !== id);
  saveState();
  $('#capstone-score').textContent = `${state.capstone.length} of ${capstoneChecks.length}`;
});

$('#course-search').addEventListener('input', (event) => renderTree(event.target.value));
$('#os-select').addEventListener('change', (event) => setOS(event.target.value));
$('#shell-select').addEventListener('change', (event) => { state.shell = event.target.value; saveState(); renderLesson(); });
$('#complete-button').addEventListener('click', (event) => { if (event.currentTarget.dataset.action === 'start') location.hash = '#/welcome'; else markComplete(); });
$('#export-button').addEventListener('click', exportProgress);
$('#reset-button').addEventListener('click', resetProgress);
$('#review-button').addEventListener('click', () => { $('#course-search').value = ''; renderTree(); const target = state.review[0]; if (target) location.hash = `#/${target}`; else showToast('No lessons need review.'); });
$('#theme-button').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = state.theme; saveState(); $('#theme-button').setAttribute('aria-label', `Switch to ${state.theme === 'dark' ? 'light' : 'dark'} theme`); });
$('#listen-button').addEventListener('click', () => { const controls = $('#speech-controls'); controls.hidden = !controls.hidden; $('#listen-button').setAttribute('aria-expanded', String(!controls.hidden)); if (!controls.hidden) $('#speech-play').focus(); });
$('#speech-play').addEventListener('click', startSpeech);
$('#speech-pause').addEventListener('click', toggleSpeechPause);
$('#speech-stop').addEventListener('click', stopSpeech);
$('#speech-rate').addEventListener('change', () => { if (speechSynthesis.speaking) startSpeech(); });
$('#course-menu-button').addEventListener('click', () => openPanel('#course-menu-button', '#course-panel'));
$('#tools-menu-button').addEventListener('click', () => openPanel('#tools-menu-button', '#tools-panel'));
$$('[data-close]').forEach((button) => button.addEventListener('click', closePanels));
$('#panel-backdrop').addEventListener('click', closePanels);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closePanels(); });
window.addEventListener('hashchange', () => {
  currentLessonId = routeLessonId();
  const section = routeSectionId();
  renderLesson();
  if (section) requestAnimationFrame(() => $(`#${section}`)?.scrollIntoView({ block: 'start' }));
  else $('#lesson').focus();
});

document.documentElement.dataset.theme = state.theme;
beginLearningDay();
renderShellOptions();
if (!('speechSynthesis' in window)) { $('#listen-button').disabled = true; $('#listen-button').title = 'Text to speech is unavailable in this browser'; }
if (!location.hash) history.replaceState(null, '', '#/home');
renderLesson();

setInterval(() => {
  if (document.hidden) return;
  state.learning.minutes += 1;
  if (state.learning.minutes >= 30 && !state.learning.dailyGoalCelebrated) {
    state.learning.dailyGoalCelebrated = true;
    showToast('★ Daily goal complete. Thirty focused minutes today is meaningful progress.');
  }
  saveState();
  updateProgress();
}, 60_000);
