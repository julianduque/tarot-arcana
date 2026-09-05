/* Recognition checks support retrieval; they do not certify reading skill. */
(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const slug = document.querySelector('script[data-current]')?.dataset.current;
    document.querySelectorAll('.quiz-q').forEach((q,index) => {
      const buttons=[...q.querySelectorAll('[data-choice]')];
      // A response belongs to this question and these choices, even as lessons evolve.
      const question=[q.querySelector('.quiz-prompt')?.textContent, ...buttons.map(b=>b.textContent), q.dataset.answer].join('\u001f');
      const feedback=q.querySelector('[data-explain]');
      const result=document.createElement('p');result.className='quiz-result';result.setAttribute('role','status');q.append(result);
      const retry=document.createElement('button');retry.type='button';retry.textContent='Try again';retry.className='study-button';retry.hidden=true;q.append(retry);
      function choose(choice,persist) {
        if (!buttons.some(b=>b.dataset.choice===choice)) return;
        for(const b of buttons){b.disabled=true;b.classList.toggle('correct',b.dataset.choice===q.dataset.answer);b.classList.toggle('incorrect',b.dataset.choice===choice&&choice!==q.dataset.answer);}
        result.textContent=choice===q.dataset.answer?'Correct. Compare your reasoning with the explanation.':'Reconsider this answer. The explanation identifies the distinction.';
        if(feedback)feedback.hidden=false;retry.hidden=false;
        if(persist&&slug){const api=window.TarotCourseNav;const quiz={...(api.getState()[slug]?.quiz||{}),[index]:{choice,question}};api.updateLesson(slug,{quiz});}
      }
      for(const b of buttons)b.addEventListener('click',()=>choose(b.dataset.choice,true));
      retry.addEventListener('click',()=>{for(const b of buttons){b.disabled=false;b.classList.remove('correct','incorrect');}if(feedback)feedback.hidden=true;result.textContent='';retry.hidden=true;if(slug){const api=window.TarotCourseNav;const quiz={...(api.getState()[slug]?.quiz||{})};delete quiz[index];api.updateLesson(slug,{quiz});}buttons[0]?.focus();});
      const saved=window.TarotCourseNav?.getState()[slug]?.quiz?.[index];if(saved?.question===question)choose(saved.choice,false);
    });
    document.querySelectorAll('.recall-card').forEach(card=>{
      const reveal=card.querySelector('.recall-reveal'), answer=card.querySelector('.recall-answer');if(!reveal||!answer)return;
      reveal.setAttribute('aria-expanded','false');
      reveal.addEventListener('click',()=>{answer.hidden=!answer.hidden;reveal.textContent=answer.hidden?'Reveal discussion':'Hide discussion';reveal.setAttribute('aria-expanded',String(!answer.hidden));});
    });
  });
})();
