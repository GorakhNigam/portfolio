// Smooth scroll + reveal + active tab indicator
const tabs = [...document.querySelectorAll('.tabs .tab')];
const indicator = document.querySelector('.tab-indicator');

function positionIndicator(active){
  const rect = active.getBoundingClientRect();
  const parentRect = active.parentElement.getBoundingClientRect();
  indicator.style.width = rect.width + 'px';
  indicator.style.left = (rect.left - parentRect.left) + 'px';
}
tabs.forEach(a=>a.addEventListener('click', e=>{
  const id=a.getAttribute('href')||'';
  if(id.startsWith('#')){e.preventDefault(); document.querySelector(id)?.scrollIntoView({behavior:'smooth'}); }
}));
// Set indicator on load
window.addEventListener('load', ()=> { if(tabs.length > 0) positionIndicator(tabs[0]); });
// Update indicator on scroll
const sections = tabs.map(t=>document.querySelector(t.getAttribute('href'))).filter(Boolean);
const obs = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if (en.isIntersecting){
      const i = sections.indexOf(en.target);
      if (i>=0) positionIndicator(tabs[i]);
    }
  });
},{threshold:.5});
sections.forEach(s=>obs.observe(s));

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); }), {threshold: .12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Year
document.querySelector('.footer p').innerHTML = `© ${new Date().getFullYear()} Gorakhnath Nigam — Built with care.`;