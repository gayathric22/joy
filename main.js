const titles={home:'Home',about:'About Us',manufacturing:'Facility & Specs',products:'Products',"custom-manufacturing":'OEM/ODM Workflow',quality:'Quality',responsible:'Ethics',team:'Leadership',journey:'Journey & News',faq:'FAQ',contact:'Contact',quote:'Request a Quote'};
const pageMap={home:'home',about:'about',manufacturing:'manufacturing',products:'products','custom-manufacturing':'custom-manufacturing',quality:'quality',responsible:'responsible',team:'team',journey:'journey',faq:'faq',contact:'contact',quote:'quote'};

function go(key){
  // "Get a Quote" / "Request Quote" buttons open the Cost Estimator panel (which contains the inquiry form)
  if(key==='quote'){
    if(!document.querySelector('.page.active')) go('home');
    openEstimator();
    return;
  }
  const id=pageMap[key]||'home';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.getElementById('crumbLabel').textContent=titles[key]||'Home';
  document.querySelectorAll('#desktopNav button, #subNav button').forEach(b=>b.classList.toggle('active',b.dataset.page===key));
  setMobileNav(false);
  closeEstimator();
  window.scrollTo({top:0,behavior:'smooth'});
  try{history.replaceState(null,'','#'+key);}catch(err){}
  observeReveal();
}

function setMobileNav(open){
  document.getElementById('mobileNav').classList.toggle('open',open);
  document.getElementById('menuToggle').setAttribute('aria-expanded',String(open));
}

// Fabric lab data (from JOY site)
const FABRICS=[
  {name:'Combed Poly-Viscose (PV Blend)',tag:'Ultra-Durable Daily Wear Standard',desc:'Specially formulated for school and corporate office uniforms. Offers premium drape, extreme rub-resistance, and complete machine washability with minimal shrinkage.',bars:[['Durability',95],['Breathability',80],['Softness & Feel',85],['Wrinkle Resistance',90],['Fluid Repellency',30]]},
  {name:'Silver-Ion Antimicrobial Twill',tag:'Clinical-Grade Protective Hygiene Weave',desc:'Built for nursing and healthcare uniforms, with silver-ion antimicrobial finishing and fluid resistance for long shifts.',bars:[['Durability',85],['Breathability',75],['Softness & Feel',70],['Wrinkle Resistance',80],['Fluid Repellency',90]]},
  {name:'Flame-Retardant Heavy Canvas',tag:'Industrial Safety & Heavy-Duty Workwear',desc:'Heavy-duty canvas for factory, logistics, and construction uniforms, with flame-retardant and acid-resistant treatment.',bars:[['Durability',98],['Breathability',55],['Softness & Feel',50],['Wrinkle Resistance',70],['Fluid Repellency',75]]},
  {name:'Super 120s Egyptian Cotton',tag:'Luxury Executive & VIP Comfort',desc:'Fine long-staple cotton for JOY luxury shirts and VIP custom add-ons, with a soft hand-feel and refined drape.',bars:[['Durability',70],['Breathability',95],['Softness & Feel',98],['Wrinkle Resistance',60],['Fluid Repellency',25]]}
];
function showFabric(i){
  const f=FABRICS[i];
  document.querySelectorAll('.fabric-option').forEach((b,idx)=>b.classList.toggle('active',idx===i));
  document.getElementById('fabricDetail').innerHTML=`<h3>${f.name}</h3><strong style="display:block;color:var(--ink);margin-bottom:10px">${f.tag}</strong><p>${f.desc}</p><h4 style="margin-top:20px">Fabric Performance Index</h4>`+f.bars.map(b=>`<div class="progress-row"><span>${b[0]}</span><div class="bar"><span style="width:${b[1]}%"></span></div><strong>${b[1]}%</strong></div>`).join('');
}

// Success story tabs
const CASES={
  healthcare:{label:'Healthcare · Leading Hospital Chain',stats:[['Needed','5,000 Antimicrobial Scrubs'],['Delivered','28 Days Turnaround'],['Result','100% Satisfaction']],text:'Extended to a 3-year contract with quarterly orders.'},
  industrial:{label:'Industrial Export · European Workwear Client',stats:[['Volume','10,000+ Units'],['Consistency','Uniform across batches'],['Customs','Flawless documentation']],text:'Consistent quality and on-time customs documentation across a European workwear line.'},
  education:{label:'Education · Schools & Colleges',stats:[['Schools','200+ Institutions'],['Wash Tests','30+ washes, no fading'],['Deadlines','Never missed']],text:'Multi-year uniform partnership across branches in Tamil Nadu and Karnataka.'}
};
function showCase(k,btn){
  const c=CASES[k];
  document.querySelectorAll('.case-tabs button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('caseBody').innerHTML=`<span class="eyebrow">${c.label}</span><div class="case-stats">`+c.stats.map(s=>`<div><span>${s[0]}</span><strong>${s[1]}</strong></div>`).join('')+`</div><p>${c.text}</p>`;
}

// Garment illustrations used when a web photo cannot load
const ART={
  polo:`<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M62 38 Q100 58 138 38 L172 66 L154 92 L140 80 L140 170 L60 170 L60 80 L46 92 L28 66 Z" fill="#315d49"/><path d="M88 46 Q100 58 112 46" stroke="#1f4333" stroke-width="3" fill="none"/><line x1="100" y1="60" x2="100" y2="82" stroke="#c3a477" stroke-width="3"/></svg>`,
  shirt:`<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M62 36 L80 30 Q100 50 120 30 L138 36 L186 130 L168 140 L140 86 L140 172 L60 172 L60 86 L32 140 L14 130 Z" fill="#24382f"/><line x1="100" y1="50" x2="100" y2="172" stroke="#c3a477" stroke-width="2"/></svg>`,
  uniform:`<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M62 38 Q100 58 138 38 L172 66 L154 92 L140 80 L140 170 L60 170 L60 80 L46 92 L28 66 Z" fill="#1f4333"/><rect x="112" y="82" width="22" height="26" rx="3" fill="rgba(255,255,255,.18)" stroke="#c3a477" stroke-width="1.5"/></svg>`,
  jacket:`<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M70 34 L100 54 L130 34 L168 56 L152 172 L48 172 L32 56 Z" fill="#1d2b24"/><line x1="100" y1="54" x2="100" y2="172" stroke="#c3a477" stroke-width="1.5"/></svg>`
};
function artFor(alt){
  alt=(alt||'').toLowerCase();
  if(/woven|shirt|linen|formal|button/.test(alt)) return 'shirt';
  if(/uniform|industrial|workwear|corporate|school|nursing/.test(alt)) return 'uniform';
  if(/luxury|fashion|blazer|designer|vip/.test(alt)) return 'jacket';
  return 'polo';
}
function swapForArt(img){
  if(img.dataset.swapped) return;
  img.dataset.swapped='1';
  const wrap=document.createElement('div');
  wrap.className='art-wrap';
  wrap.innerHTML=ART[artFor(img.alt)];
  img.replaceWith(wrap);
}
document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>swapForArt(img));
  if(img.complete && img.naturalWidth===0) swapForArt(img);
});

document.getElementById('menuToggle').addEventListener('click',()=>setMobileNav(!document.getElementById('mobileNav').classList.contains('open')));

function filterProducts(cat){
  document.querySelectorAll('.product-card').forEach(c=>{
    c.style.display=(cat==='all'||c.dataset.category===cat)?'':'none';
  });
  document.querySelectorAll('#filterBar button').forEach(b=>{
    b.className = b.dataset.filter===cat ? 'btn' : 'btn outline';
  });
}

document.querySelectorAll('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{
  const item=btn.parentElement;
  const open=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!open) item.classList.add('open');
}));

function searchFAQ(){
  const q=document.getElementById('faqSearch').value.toLowerCase();
  document.querySelectorAll('.faq-item').forEach(i=>{
    i.style.display=i.textContent.toLowerCase().includes(q)?'':'none';
  });
}

// ---------- Cost Estimator panel ----------
const BUSINESS_EMAIL='info.joyexports@gmail.com';
const DEFAULT_ORDER_QTY=1000;
const fmtIN=n=>Number(n).toLocaleString('en-IN');
let estLastFocus=null;

function openEstimator(){
  const el=document.getElementById('estimator');
  if(!el.classList.contains('open')) estLastFocus=document.activeElement;
  setMobileNav(false);
  el.classList.add('open');
  document.body.classList.add('modal-open');
  calcEstimate();
  el.querySelector('.modal-body').scrollTop=0;
  el.querySelector('.modal-box').focus({preventScroll:true});
}
function closeEstimator(){
  const el=document.getElementById('estimator');
  if(!el.classList.contains('open')) return;
  el.classList.remove('open');
  document.body.classList.remove('modal-open');
  if(estLastFocus&&estLastFocus.focus) estLastFocus.focus({preventScroll:true});
}
document.addEventListener('keydown',e=>{
  const el=document.getElementById('estimator');
  if(!el.classList.contains('open')) return;
  if(e.key==='Escape'){closeEstimator();return;}
  if(e.key==='Tab'){ // keep keyboard focus inside the panel
    const f=[...el.querySelectorAll('button,input,select,textarea,a[href]')].filter(x=>!x.disabled&&x.offsetParent!==null);
    if(!f.length) return;
    const first=f[0],last=f[f.length-1];
    if(e.shiftKey&&(document.activeElement===first||document.activeElement===el.querySelector('.modal-box'))){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
});

function calcEstimate(){
  const qty=parseInt(document.getElementById('estQty').value)||DEFAULT_ORDER_QTY;
  const cat=document.getElementById('estCat').value;
  const scope=document.getElementById('estScope').value;
  document.getElementById('estQtyVal').textContent=fmtIN(qty)+' Pieces';
  let daily=350;
  if(cat==='fashion') daily=270;
  if(cat==='uniform') daily=300;
  if(scope==='stitch-pack') daily*=1.3;
  const days=Math.ceil(qty/daily)+5;
  const mach=Math.min(23,Math.max(4,Math.ceil(qty/500)));
  document.getElementById('estTime').textContent=`${days} - ${days+4} Days`;
  document.getElementById('estMach').textContent=`${mach} Machines`;
  // keep the form's Order Quantity in step with the slider until the visitor types their own figure
  const fq=document.getElementById('estFormQty');
  if(fq&&!fq.dataset.edited) fq.value=fmtIN(qty);
}

function showToast(t,d){
  document.getElementById('toastTitle').textContent=t;
  document.getElementById('toastDesc').textContent=d;
  const el=document.getElementById('toast');
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),4000);
}

// ---------- Inquiry email (shared by the Contact page form and the estimator panel form) ----------
function openInquiryEmail(rows,noteEl){
  const body=rows.map(x=>x[0]?x[0]+': '+x[1]:'').join('\n');
  if(noteEl) noteEl.textContent='Your email app should open with the inquiry details. Please send the email to complete your request.';
  showToast('Inquiry ready','Your email app will open with the details. Send the email to complete your inquiry.');
  window.location.href='mailto:'+BUSINESS_EMAIL+'?subject='+encodeURIComponent('JOY Website — Bulk Order Inquiry')+'&body='+encodeURIComponent(body);
}

function submitRFQ(e){
  if(e) e.preventDefault();
  const form=document.getElementById('quoteForm');
  if(!form) return;
  if(!form.reportValidity()) return;
  const v=id=>{
    const el=document.getElementById(id);
    return el ? el.value.trim() : '';
  };
  const note=document.getElementById('formNote');
  openInquiryEmail([
    ['Full Name',v('name')],
    ['Company',v('company')],
    ['Email',v('email')],
    ['Phone',v('phone')||'(not provided)'],
    ['Garment Category',v('category')],
    ['Scope',v('scope')],
    ['Estimated Quantity',v('quantity')],
    ['Specifications',v('message')]
  ],note);
}

const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function setFieldError(input,msg){
  const err=document.getElementById(input.id+'-err');
  if(err) err.textContent=msg||'';
  input.classList.toggle('invalid',!!msg);
  input.setAttribute('aria-invalid',msg?'true':'false');
}
// The current HTML contains the contact-page form (#quoteForm) only.
// The estimator panel is a calculator, so do not bind a second, nonexistent #estForm.
function initInquiryForm(){
  const form=document.getElementById('quoteForm');
  if(!form) return;
  form.addEventListener('input',e=>{
    if(e.target.classList.contains('invalid')) setFieldError(e.target,'');
  });
  form.addEventListener('change',e=>{
    if(e.target.classList.contains('invalid')) setFieldError(e.target,'');
  });
}


function observeReveal(){
  const targets=document.querySelectorAll('.page.active .section-head,.page.active .card,.page.active .tile,.page.active .panel-card,.page.active .process-card,.page.active .machine,.page.active .qc,.page.active .team-card,.page.active .gal,.page.active .metric,.page.active .trust-item,.page.active .why-card,.page.active .quote-card,.page.active .award-card,.page.active .news-card,.page.active .sustain-card');
  if(!('IntersectionObserver' in window)){targets.forEach(el=>el.classList.add('in'));return;}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12});
  targets.forEach(el=>{if(!el.classList.contains('in')){el.classList.add('reveal');io.observe(el);}});
}

initInquiryForm();
showFabric(0);
calcEstimate();
const initial=(location.hash||'#home').slice(1);
go(pageMap[initial]?initial:'home');
