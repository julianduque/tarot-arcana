/* Course navigation + localStorage progress tracking, shared across every
   lesson in this workspace (and reusable by future teach workspaces).
   Depends on a preceding <script src=".../manifest.js"> defining
   window.TAROT_COURSE = {slug, title, lessons: [{slug, title, track}]}.

   Usage on a lesson page (relative paths from lessons/*.html):
     <script src="../manifest.js"></script>
     <script src="../assets/course-nav.js" data-current="0001-ai-evals-fundamentals"></script>

   Usage on the course index page (relative paths from index.html):
     <script src="./manifest.js"></script>
     <script src="./assets/course-nav.js" data-mode="index" data-target="#course-index"></script>
*/
(function () {
  function storageKey(course) {
    return "tarot-arcana:course-progress:v1:" + course;
  }

  function getProgress(course) {
    try {
      var raw = localStorage.getItem(storageKey(course));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function markVisited(course, slug) {
    var done = getProgress(course);
    if (done.indexOf(slug) === -1) {
      done.push(slug);
      try {
        localStorage.setItem(storageKey(course), JSON.stringify(done));
      } catch {
        /* localStorage unavailable (private mode, file:// edge case) — progress just won't persist */
      }
    }
    return done;
  }

  function progressBarHtml(doneCount, total) {
    var pct = total ? Math.round((doneCount / total) * 100) : 0;
    return (
      '<div class="course-progress" role="progressbar" aria-valuenow="' +
      pct +
      '" aria-valuemin="0" aria-valuemax="100">' +
      '<div class="course-progress-fill" style="width:' +
      pct +
      '%"></div></div>' +
      '<p class="course-progress-label">' +
      doneCount +
      " of " +
      total +
      " lessons complete (" +
      pct +
      "%)</p>"
    );
  }

  function renderLessonNav(course, currentSlug) {
    var lessons = course.lessons;
    var idx = lessons.findIndex(function (l) {
      return l.slug === currentSlug;
    });
    if (idx === -1) return;

    markVisited(course.slug, currentSlug);
    var done = getProgress(course.slug);

    var prev = idx > 0 ? lessons[idx - 1] : null;
    var next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

    var top = document.createElement("div");
    top.className = "course-nav course-nav-top";
    top.innerHTML =
      '<a class="course-nav-index" href="/course">' +
      course.title +
      "</a>" +
      '<span class="course-nav-position">Lesson ' +
      (idx + 1) +
      " of " +
      lessons.length +
      "</span>";
    var main = document.querySelector("main.course") || document.body;
    main.insertBefore(top, main.firstChild);

    var bottom = document.createElement("div");
    bottom.className = "course-nav course-nav-bottom";
    bottom.innerHTML =
      (prev
        ? '<a class="course-nav-prev" href="/course/lessons/' + prev.slug + '.html">&larr; ' + prev.title + "</a>"
        : '<span class="course-nav-prev course-nav-disabled">&larr; Start of course</span>') +
      (next
        ? '<a class="course-nav-next" href="/course/lessons/' + next.slug + '.html">' + next.title + " &rarr;</a>"
        : '<span class="course-nav-next course-nav-disabled">Last lesson &mdash; back to <a href="/course">index</a></span>');
    main.appendChild(bottom);

    var progress = document.createElement("div");
    progress.className = "course-progress-wrap";
    progress.innerHTML = progressBarHtml(done.length, lessons.length);
    bottom.insertAdjacentElement("beforebegin", progress);
  }

  function renderIndex(course, targetSelector) {
    var target = document.querySelector(targetSelector);
    if (!target) return;
    var done = getProgress(course.slug);

    var html = progressBarHtml(done.length, course.lessons.length);
    html += '<ol class="course-lesson-list">';
    course.lessons.forEach(function (lesson) {
      var isDone = done.indexOf(lesson.slug) !== -1;
      html +=
        '<li class="' + (isDone ? "course-lesson-done" : "") + '">' +
        '<a href="/course/lessons/' + lesson.slug + '.html">' +
        (isDone ? "✓ " : "") +
        lesson.title +
        "</a>" +
        (lesson.track ? '<span class="course-lesson-track">' + lesson.track + "</span>" : "") +
        "</li>";
    });
    html += "</ol>";
    target.innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var course = window.TAROT_COURSE;
    if (!course) return;

    // document.currentScript is only valid during synchronous script execution,
    // not inside this async listener — find our own <script> tag by its attributes instead.
    var self = document.querySelector("script[data-current], script[data-mode]");
    if (!self) return;

    var mode = self.getAttribute("data-mode");
    if (mode === "index") {
      renderIndex(course, self.getAttribute("data-target") || "#course-index");
    } else {
      var current = self.getAttribute("data-current");
      if (current) renderLessonNav(course, current);
    }
  });

  window.TarotCourseNav = { getProgress: getProgress, markVisited: markVisited };
})();
