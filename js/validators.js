export function evaluateAnswer(quiz, selectedIndex, previousAttempts = 0) {
  if (selectedIndex === null || selectedIndex === undefined || selectedIndex === '') {
    return { status: 'missing', attempts: previousAttempts, complete: false };
  }
  const correct = Number(selectedIndex) === quiz.answer;
  if (correct) return { status: 'correct', attempts: previousAttempts, complete: true, message: quiz.explanation };
  const attempts = previousAttempts + 1;
  return attempts === 1
    ? { status: 'hint', attempts, complete: false, review: true, message: quiz.hint }
    : { status: 'remediate', attempts, complete: false, review: true, message: quiz.alternate };
}

export function validateCourse(course, glossary) {
  const errors = [];
  const ids = new Set();
  const lessons = course.flatMap((module) => module.lessons);
  for (const lesson of lessons) {
    if (ids.has(lesson.id)) errors.push(`Duplicate lesson id: ${lesson.id}`);
    ids.add(lesson.id);
    for (const field of ['title', 'outcome', 'expected', 'practice', 'visual', 'quiz']) {
      if (!lesson[field]) errors.push(`${lesson.id}: missing ${field}`);
    }
    for (const field of ['explanation', 'steps', 'mistakes']) {
      if (!Array.isArray(lesson[field]) || !lesson[field].length) errors.push(`${lesson.id}: empty ${field}`);
    }
    if (!Array.isArray(lesson.quiz?.options) || lesson.quiz.options.length < 2) errors.push(`${lesson.id}: quiz needs at least two choices`);
    if (!Number.isInteger(lesson.quiz?.answer) || lesson.quiz.answer < 0 || lesson.quiz.answer >= lesson.quiz.options.length) errors.push(`${lesson.id}: invalid quiz answer`);
    for (const term of lesson.terms || []) if (!glossary[term]) errors.push(`${lesson.id}: unknown glossary term ${term}`);
  }
  for (const lesson of lessons) for (const prerequisite of lesson.prerequisites || []) if (!ids.has(prerequisite)) errors.push(`${lesson.id}: unknown prerequisite ${prerequisite}`);
  return errors;
}

export function validateCapstone(selectedIds, checks) {
  const validIds = new Set(checks.map((item) => item.id));
  const selected = [...new Set(selectedIds)].filter((id) => validIds.has(id));
  return { selected, complete: selected.length === checks.length, completed: selected.length, total: checks.length };
}
