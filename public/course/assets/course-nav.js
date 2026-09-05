/* Course navigation and browser-local practice records. v1 tracked visits only. */
(() => {
  'use strict';
  const course = window.TAROT_COURSE;
  if (!course) return;
  const key = `tarot-arcana:course-study:v2:${course.slug}`;
  const valid = new Set(course.lessons.map(l => l.slug));
  const read = (name, fallback) => { try { return JSON.parse(localStorage.getItem(name)) ?? fallback; } catch { return fallback; } };
  const normalize = raw => {
    const state = {};
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return state;
    for (const slug of valid) {
      const item = raw[slug];
      if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
      state[slug] = {visited: item.visited === true, practiced: item.practiced === true, review: item.review === true,
        note: typeof item.note === 'string' ? item.note : '', quiz: item.quiz && typeof item.quiz === 'object' && !Array.isArray(item.quiz) ? item.quiz : {}};
    }
    return state;
  };
  let volatile = {};
  function getState() {
    let raw = read(key, null);
    if (raw === null) {
      raw = {};
      const old = read(`tarot-arcana:course-progress:v1:${course.slug}`, []);
      if (Array.isArray(old)) for (const slug of old) if (valid.has(slug)) raw[slug] = {visited: true};
    }
    return {...normalize(raw), ...volatile};
  }
  function updateLesson(slug, patch) {
    if (!valid.has(slug)) return false;
    const state = getState();
    state[slug] = {...(state[slug] || {}), ...patch};
    try { localStorage.setItem(key, JSON.stringify(state)); delete volatile[slug]; return true; }
    catch { volatile[slug] = state[slug]; return false; }
  }
  function el(tag, text, cls) { const e = document.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e; }
  function link(lesson) { const a = el('a', lesson.title); a.href = `/course/lessons/${lesson.slug}.html`; return a; }
  function summary() {
    const values = Object.values(getState());
    return `${values.filter(v=>v.practiced).length} of ${course.lessons.length} lessons practiced · ${values.filter(v=>v.visited).length} visited · ${values.filter(v=>v.review).length} to review`;
  }
  function exportRecords() {
    const blob = new Blob([JSON.stringify({course: course.slug, version: 2, exportedAt: new Date().toISOString(), lessons: getState()}, null, 2)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'tarot-course-practice.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const script = document.querySelector('script[data-current], script[data-mode]');
    if (!script) return;
    const main = document.querySelector('main.course');
    const slug = script.dataset.current;
    if (script.dataset.mode === 'index') {
      const target = document.querySelector(script.dataset.target || '#course-index');
      function render() {
        target.replaceChildren(el('p', summary(), 'course-progress-label'));
        const ol = el('ol', '', 'course-lesson-list');
        const state = getState();
        for (const [index, lesson] of course.lessons.entries()) {
          const li = el('li'); const a=link(lesson); a.textContent=String(index+1).padStart(2,'0')+' · '+lesson.title; li.append(a);
          const item = state[lesson.slug] || {};
          li.append(el('span', `${lesson.track} · ${item.practiced ? 'Practiced' : item.visited ? 'Visited' : 'Not started'}${item.review ? ' · Review' : ''}`, 'course-lesson-track'));
          ol.append(li);
        }
        target.append(ol);
        const exp = el('button', 'Export practice records', 'study-button'); exp.type='button'; exp.addEventListener('click',exportRecords); target.append(exp);
      }
      render(); window.addEventListener('storage',render); return;
    }
    const idx = course.lessons.findIndex(l=>l.slug===slug); if (idx<0) return;
    updateLesson(slug, {visited:true});
    const top = el('nav','','course-nav course-nav-top'); top.setAttribute('aria-label','Course');
    const home = el('a',course.title,'course-nav-index');home.href='/course';
    top.append(home,el('span',`Lesson ${idx+1} of ${course.lessons.length}`,'course-nav-position')); main.prepend(top);
    const section = el('section','','practice-record');section.setAttribute('aria-labelledby','practice-record-heading');
    section.append(el('h2','Your practice record'));section.firstChild.id='practice-record-heading';
    section.append(el('p','Mark practice after doing the exercises. This records your own assessment; opening a lesson records a visit. Notes stay in this browser. Export them to keep a separate copy.'));
    const state = getState()[slug] || {};
    const noteLabel=el('label','What did you observe, revise, or leave unresolved?');noteLabel.htmlFor='practice-note';
    const note=el('textarea');note.id='practice-note';note.rows=6;note.value=state.note||'';
    const status=el('p','','save-status');status.setAttribute('role','status');
    const save=el('button','Save reflection','study-button');save.type='button';
    save.addEventListener('click',()=>{status.textContent=updateLesson(slug,{note:note.value})?'Reflection saved in this browser.':'Browser storage is unavailable. Export your record before closing this page.';});
    section.append(noteLabel,note,save);
    for (const [field,label] of [['practiced','I completed the practice'],['review','I want to review this lesson']]) {
      const wrap=el('label','','practice-check');const input=el('input');input.type='checkbox';input.checked=state[field]===true;
      input.addEventListener('change',()=>{status.textContent=updateLesson(slug,{[field]:input.checked})?summary():'Browser storage is unavailable. Export your record before closing this page.';});wrap.append(input,document.createTextNode(label));section.append(wrap);
    }
    const exp=el('button','Export practice records','study-button');exp.type='button';exp.addEventListener('click',()=>{updateLesson(slug,{note:note.value});exportRecords();});section.append(exp,status);main.append(section);
    const bottom=el('nav','','course-nav course-nav-bottom');bottom.setAttribute('aria-label','Previous and next lessons');
    if(idx>0)bottom.append(link(course.lessons[idx-1]));else bottom.append(el('span','Start of course'));
    if(idx+1<course.lessons.length)bottom.append(link(course.lessons[idx+1]));else bottom.append(home.cloneNode(true));main.append(bottom);
  });
  window.TarotCourseNav = {getState, updateLesson};
})();
