/* Progressive enhancement: static studies and reference tables remain readable. */
(() => {
  'use strict';
  const data=window.TAROT_CORRESPONDENCES;if(!data)return;
  const cards=data.cards;
  const points={1:[250,65],2:[390,165],3:[110,165],4:[390,300],5:[110,300],6:[250,375],7:[390,490],8:[110,490],9:[250,575],10:[250,665]};
  const NS='http://www.w3.org/2000/svg';
  function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
  function svgEl(tag,attrs,text){const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs||{}))n.setAttribute(k,v);if(text)n.textContent=text;return n;}
  function select(label,options,parent){const wrap=el('label',label,'study-field');const s=el('select');for(const[value,text]of options){const o=el('option',text);o.value=value;s.append(o);}wrap.append(s);parent.append(wrap);return s;}
  function term(dl,label,value){if(value===null||value===undefined)return;dl.append(el('dt',label),el('dd',String(value)));}
  function cardName(card,deck){return deck==='thoth'?card.thothName:card.rwsName;}
  function tree(host, onCard){
    const svg=svgEl('svg',{viewBox:'0 0 500 735',class:'study-tree',role:'group','aria-label':'Golden Dawn Tree of Life: select a connecting path to inspect its trump. The card selector provides the same choices.'});
    svg.append(svgEl('title',{},'Golden Dawn Tree of Life — paths 11–32'));
    svg.append(svgEl('desc',{},'Ten numbered spheres; 22 paths. Selected paths and sphere numbers are also described in text. This diagram always uses Golden Dawn path assignments.'));
    for(const c of cards.filter(c=>c.kind==='major')){
      const [a,b]=c.endpoints.map(n=>points[n]);const g=svgEl('g',{'data-path-card':c.id,role:'button',tabindex:0,'aria-label':`Golden Dawn path ${c.gdPath}: ${c.rwsName}, ${c.gdLetter}`});
      g.append(svgEl('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],class:'path-hit'}));
      g.append(svgEl('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],class:'path-line'}));
      g.addEventListener('click',()=>onCard(c.id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onCard(c.id);}});svg.append(g);
    }
    svg.append(svgEl('text',{x:110,y:24,class:'pillar-label'},'Severity'),svgEl('text',{x:390,y:24,class:'pillar-label'},'Mercy'));
    for(const s of data.sephiroth){const[x,y]=points[s.number];const g=svgEl('g',{'data-sphere':s.number});g.append(svgEl('circle',{cx:x,cy:y,r:27,class:'sphere'}),svgEl('text',{x,y:y+6,class:'sphere-number'},String(s.number)),svgEl('text',{x,y:y+48,class:'sphere-label'},s.name));svg.append(g);}
    host.append(svg);
    return card=>{svg.querySelectorAll('[data-path-card]').forEach(g=>{const selected=card.kind==='major'&&g.dataset.pathCard===card.id;g.classList.toggle('selected',selected);g.setAttribute('aria-pressed',String(selected));});svg.querySelectorAll('[data-sphere]').forEach(g=>g.classList.toggle('selected',card.kind==='major'?card.endpoints.includes(Number(g.dataset.sphere)):Number(g.dataset.sphere)===(card.number||card.seat)));};
  }
  function wheel(host,onCard){
    const svg=svgEl('svg',{viewBox:'0 0 500 500',class:'decan-wheel',role:'group','aria-label':'Golden Dawn decan wheel. Select a numbered sector or use the card selector.'});
    svg.append(svgEl('title',{},'36 decans, beginning with 0 degrees Aries at the top; read clockwise'));
    const order=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
    const xy=(radius,angle)=>[250+radius*Math.sin(angle),250-radius*Math.cos(angle)];
    const small=cards.filter(c=>c.kind==='pip'&&c.number>1).sort((a,b)=>order.indexOf(a.sign)-order.indexOf(b.sign)||a.decan[0]-b.decan[0]);
    small.forEach((c,i)=>{
      const a=i*Math.PI/18,b=(i+1)*Math.PI/18;const p=xy(188,a),q=xy(188,b),r=xy(108,b),s=xy(108,a);
      const g=svgEl('g',{'data-decan-card':c.id,tabindex:0,role:'button','aria-label':`${c.rwsName}, ${c.decan[0]} to ${c.decan[1]} degrees ${c.sign}, ${c.planet}`});
      g.append(svgEl('path',{d:`M ${p} A188 188 0 0 1 ${q} L${r} A108 108 0 0 0 ${s} Z`,class:'decan-sector'}));const t=xy(150,(a+b)/2);g.append(svgEl('text',{x:t[0],y:t[1]+5,class:'sector-number'},String(c.number)));
      g.addEventListener('click',()=>onCard(c.id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onCard(c.id);}});svg.append(g);
    });
    order.forEach((sign,i)=>{const p=xy(220,(i*3+1.5)*Math.PI/18);svg.append(svgEl('text',{x:p[0],y:p[1]+4,class:'sign-label'},sign));});
    svg.append(svgEl('text',{x:250,y:235,class:'wheel-centre'},'36 decans'),svgEl('text',{x:250,y:260,class:'wheel-sub'},'10° each'),svgEl('text',{x:250,y:283,class:'wheel-sub'},'Golden Dawn'));
    host.append(svg);return card=>svg.querySelectorAll('[data-decan-card]').forEach(g=>{const selected=g.dataset.decanCard===card.id;g.classList.toggle('selected',selected);g.setAttribute('aria-pressed',String(selected));});
  }
  function explorer(host,index){
    const selection=el('p','','selection-caption');selection.setAttribute('role','status');
    const controls=el('div','','explorer-controls');const mode=select('Compare with', [['rws','Rider–Waite–Smith (RWS)'],['thoth','Thoth — Crowley / Harris']],controls);
    const family=select('Card family',[['all','All 78 cards'],['major','Major Arcana'],['Wands','Wands — Fire'],['Cups','Cups — Water'],['Swords','Swords — Air'],['Pentacles','Pentacles / Disks — Earth']],controls);
    const picker=select('Card',[],controls);host.append(controls,selection);
    const layout=el('div','','explorer-layout');const diagram=el('div','','explorer-diagram');const detail=el('div','','explorer-detail');detail.id=`correspondence-detail-${index}`;detail.setAttribute('aria-live','polite');detail.setAttribute('aria-atomic','true');layout.append(diagram,detail);host.append(layout);
    const kind=host.dataset.diagram||'tree';
    function pick(id){family.value='all';populate(id);render();}
    const highlight=kind==='wheel'?wheel(diagram,pick):tree(diagram,pick);
    const legend=el('p',kind==='wheel'?'Read clockwise from Aries at the top. Sector numbers are pip numbers, not calendar dates. Selection names the sign, degree range, and ruler.':'Diagram: Golden Dawn path assignments. Spheres are sephiroth; connecting lines are paths. Thoth name and letter differences appear in the comparison, without relabelling this Tree.','diagram-legend');diagram.append(legend);
    function populate(id){picker.replaceChildren();const list=cards.filter(c=>family.value==='all'||(family.value==='major'?c.kind==='major':c.suit===family.value));for(const c of list){const o=el('option',cardName(c,mode.value));o.value=c.id;picker.append(o);}if(list.some(c=>c.id===id))picker.value=id;}
    function render(){const c=cards.find(c=>c.id===picker.value);if(!c)return;selection.textContent=(mode.value==='thoth'?'Thoth':'RWS')+' · '+cardName(c,mode.value)+(c.kind==='major'?' · Golden Dawn path '+c.gdPath:c.kind==='pip'&&c.number>1?' · '+c.planet+' in '+c.sign:' · '+c.element);highlight(c);detail.replaceChildren();detail.append(el('p',mode.value==='thoth'?'Thoth comparison · Crowley / Harris':'RWS study · Waite / Smith','tradition-label'));
      detail.append(el('h3',cardName(c,mode.value)));
      const dl=el('dl','','correspondence-facts');term(dl,'RWS card',c.rwsName);term(dl,'Thoth counterpart',c.thothName);
      if(c.kind==='major'){
        term(dl,'RWS / Thoth numeral',`${c.rwsNumber} / ${c.thothNumber}`);term(dl,'Golden Dawn letter',c.gdLetter);term(dl,'Thoth letter',c.thothLetter);term(dl,'Astrological attribution',c.astrology);
        term(dl,'Golden Dawn path',`${c.gdPath}: ${c.endpoints.map(n=>`${n} ${data.sephiroth[n-1].name}`).join(' ↔ ')}`);
      }else{
        term(dl,'Suit element',c.element);term(dl,'World in this framework',c.world);
        if(c.kind==='pip'){
          term(dl,'Sephirah',`${c.number} · ${data.sephiroth[c.number-1].name}`);term(dl,'Golden Dawn title',c.gdTitle);term(dl,c.number===1?'Thoth designation / source heading':'Thoth card title',c.thothTitle);
          term(dl,'Decan',c.number===1?'None — Ace / elemental root':`${c.decan[0]}–${c.decan[1]}° ${c.sign}`);if(c.planet)term(dl,'Decan ruler',c.planet);
        }else{term(dl,'Element within element',`${c.rankElement} of ${c.element}`);term(dl,'Court seat in this framework',`${c.seat} · ${data.sephiroth[c.seat-1].name}`);}
      }
      detail.append(dl);
      if(c.kind==='major'&&[4,17].includes(c.rwsNumber))detail.append(el('p','Thoth changes the letter attribution: Emperor = Tzaddi / Aries; Star = Heh / Aquarius. The highlighted line remains the Golden Dawn path. Do not infer a Thoth path endpoint from this diagram.','tradition-note'));
      if(c.kind==='court')detail.append(el('p','The RWS elemental crosswalk is this course’s declared convention. Thoth Knight corresponds here to RWS King; Thoth Prince to RWS Knight. Compare their images and meanings rather than treating them as identical.','tradition-note'));
      if(kind==='wheel'&&(c.kind!=='pip'||c.number===1))detail.append(el('p','Only the 36 numbered pips, Two through Ten, occupy decan sectors. This selection has no highlighted sector.','tradition-note'));
      const lesson=window.TAROT_COURSE?.lessons[c.lesson-1];if(lesson){const a=el('a','Read the full card study');a.href=`/course/lessons/${lesson.slug}.html#study-${c.id}`;detail.append(a);}
    }
    const hash=new URLSearchParams(location.hash.slice(1));const requested=hash.get('card');if(hash.get('deck')==='thoth')mode.value='thoth';
    family.value=host.dataset.family||'all';populate(requested||host.dataset.card||(kind==='wheel'?'wands-02':'major-00'));render();
    picker.addEventListener('change',render);family.addEventListener('change',()=>{populate();render();});mode.addEventListener('change',()=>{const id=picker.value;populate(id);render();});
    const share=el('button','Copy link to this correspondence','study-button');share.type='button';const notice=el('p','','save-status');notice.setAttribute('role','status');share.addEventListener('click',async()=>{const url=new URL('/course/reference/correspondences.html',location.origin);url.hash=new URLSearchParams({card:picker.value,deck:mode.value}).toString();try{await navigator.clipboard.writeText(url.href);notice.textContent='Correspondence link copied.';}catch{notice.replaceChildren(document.createTextNode('Correspondence link: '));const a=el('a',url.href);a.href=url.href;notice.append(a);}});host.append(share,notice);
  }
  function dignities(host){
    const controls=el('div','','dignity-controls');const options=['Fire','Water','Air','Earth'].map(x=>[x,x]);
    const left=select('Left neighbour',options,controls),centre=select('Centre card',options,controls),right=select('Right neighbour',options,controls);left.value=host.dataset.left||'Earth';centre.value=host.dataset.centre||'Air';right.value=host.dataset.right||'Earth';host.append(controls);
    const output=el('div','','dignity-output');output.setAttribute('aria-live','polite');host.append(output);
    function affinity(a,b){if(a===b)return {word:'same element',effect:1};if(['FireWater','WaterFire','AirEarth','EarthAir'].includes(a+b))return {word:'contrary',effect:-1};if(['FireAir','AirFire','WaterEarth','EarthWater'].includes(a+b))return {word:'supportive',effect:1};return {word:'neutral in this course method',effect:0};}
    function render(){const a=affinity(centre.value,left.value),b=affinity(centre.value,right.value);let verdict='No strengthening or weakening from this method';if(a.effect>0&&b.effect>0)verdict='Centre strengthened';else if(a.effect<0&&b.effect<0)verdict='Centre weakened';else if(a.effect*b.effect<0)verdict='Mixed influences on the centre';else if(a.effect+b.effect>0)verdict='Some support for the centre';else if(a.effect+b.effect<0)verdict='Some weakening of the centre';output.replaceChildren(el('h3',verdict),el('p',`${left.value} → ${centre.value}: ${a.word}. ${right.value} → ${centre.value}: ${b.word}.`),el('p','This compares each neighbour with the centre. Strength describes emphasis or capacity to act; it does not prove that a card, event, or decision is good.'));
    }[left,centre,right].forEach(s=>s.addEventListener('change',render));render();
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-correspondence-explorer]').forEach(explorer);document.querySelectorAll('[data-dignity-lab]').forEach(dignities);
    document.querySelectorAll('main.course').forEach(main=>{
      const headings=[...main.querySelectorAll('h2')].filter(h=>!h.closest('[data-correspondence-explorer], .practice-record'));
      if(headings.length>3){const nav=el('nav','','lesson-contents');nav.setAttribute('aria-label','On this page');const d=el('details');const s=el('summary','On this page');d.append(s);const ol=el('ol');headings.forEach((h,i)=>{if(!h.id)h.id=`section-${i+1}`;const li=el('li');const a=el('a',h.textContent);a.href='#'+h.id;li.append(a);ol.append(li);});d.append(ol);nav.append(d);main.querySelector('.lesson-intro, h1')?.insertAdjacentElement('afterend',nav);}
    });
  });
})();
