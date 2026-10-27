const revealItems=document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});
  revealItems.forEach(item=>observer.observe(item));
} else revealItems.forEach(item=>item.classList.add('visible'));

const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));

const topBtn=document.querySelector('.top');
window.addEventListener('scroll',()=>topBtn.classList.toggle('show',window.scrollY>420),{passive:true});
topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
document.getElementById('year').textContent=new Date().getFullYear();

const themeBtn=document.querySelector('.theme-btn');
themeBtn?.addEventListener('click',()=>{const light=document.body.classList.toggle('light-mode');themeBtn.innerHTML=light?'☾ <span> DARK</span>':'☼ <span>THEME</span>';themeBtn.setAttribute('aria-pressed',String(light))});

document.querySelectorAll('.interest').forEach(card=>{
  const toggle=()=>{const expanded=card.classList.toggle('expanded');card.setAttribute('aria-expanded',String(expanded))};
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle()}});
});

const surpriseMessages=[
  '💡 Ý tưởng hay thường bắt đầu từ một câu hỏi nhỏ.',
  '🚀 Tiến bộ từng chút một vẫn là tiến bộ.',
  '✨ Thử nghiệm, học hỏi, rồi làm tốt hơn!',
  '🧠 Stay curious. Keep creating.'
];
let surpriseIndex=0;
document.querySelector('.surprise-btn')?.addEventListener('click',()=>{
  document.querySelector('.surprise-message').textContent=surpriseMessages[surpriseIndex];
  surpriseIndex=(surpriseIndex+1)%surpriseMessages.length;
});


// Reading progress bar and current-section navigation
const progressBar=document.querySelector('.reading-progress span');
const updateProgress=()=>{
  const scrollable=document.documentElement.scrollHeight-window.innerHeight;
  const progress=scrollable>0?(window.scrollY/scrollable)*100:0;
  if(progressBar) progressBar.style.width=progress+'%';
};
window.addEventListener('scroll',updateProgress,{passive:true});
window.addEventListener('resize',updateProgress);
updateProgress();

const sectionLinks=[...document.querySelectorAll('.nav-links a')];
const pageSections=sectionLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        sectionLinks.forEach(link=>{
          const active=link.getAttribute('href')==='#'+entry.target.id;
          link.classList.toggle('active',active);
          if(active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
        });
      }
    });
  },{rootMargin:'-25% 0px -60% 0px'});
  pageSections.forEach(section=>sectionObserver.observe(section));
}
