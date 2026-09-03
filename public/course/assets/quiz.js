/* Reusable retrieval-practice widgets for lessons in this workspace.
   Two shapes, both plain markup + data attributes, no build step:

   1. Multiple choice (recognition):
      <div class="quiz">
        <div class="quiz-q" data-answer="b">
          <p class="quiz-prompt">...</p>
          <div class="quiz-options">
            <button data-choice="a">...</button>
            <button data-choice="b">...</button>
          </div>
          <p class="quiz-feedback" data-explain hidden>Why the answer is what it is.</p>
        </div>
      </div>

   2. Free recall (retrieval, harder than recognition):
      <div class="recall-card">
        <p class="recall-prompt">Question to answer from memory first.</p>
        <button class="recall-reveal">Reveal answer</button>
        <div class="recall-answer" hidden>Answer text.</div>
      </div>
*/
(function () {
  function initMultipleChoice() {
    document.querySelectorAll(".quiz-q").forEach(function (q) {
      var answer = q.getAttribute("data-answer");
      var buttons = q.querySelectorAll(".quiz-options button");
      var feedback = q.querySelector(".quiz-feedback");

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var picked = btn.getAttribute("data-choice");
          buttons.forEach(function (b) { b.disabled = true; });
          if (picked === answer) {
            btn.classList.add("correct");
          } else {
            btn.classList.add("incorrect");
            buttons.forEach(function (b) {
              if (b.getAttribute("data-choice") === answer) b.classList.add("correct");
            });
          }
          if (feedback) feedback.hidden = false;
        });
      });
    });
  }

  function initRecallCards() {
    document.querySelectorAll(".recall-card").forEach(function (card) {
      var reveal = card.querySelector(".recall-reveal");
      var answer = card.querySelector(".recall-answer");
      if (!reveal || !answer) return;
      reveal.addEventListener("click", function () {
        answer.hidden = !answer.hidden;
        reveal.textContent = answer.hidden ? "Reveal answer" : "Hide answer";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMultipleChoice();
    initRecallCards();
  });
})();
