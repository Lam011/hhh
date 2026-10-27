const revealItems=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});
revealItems.forEach(item=>observer.observe(item));

const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));

const topBtn=document.querySelector('.top');
window.addEventListener('scroll',()=>topBtn.classList.toggle('show',window.scrollY>420),{passive:true});
topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
document.getElementById('year').textContent=new Date().getFullYear();
