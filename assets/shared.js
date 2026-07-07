
function initDropdown(){
 const triggers=document.querySelectorAll('.dropdown-trigger,.footer-trigger');
 triggers.forEach(t=>{
   const menu=t.parentElement.querySelector('.dropdown-menu,.footer-menu');
   if(!menu) return;
   t.addEventListener('click',e=>{
      e.stopPropagation();
      menu.classList.toggle('open');
   });
 });
 document.addEventListener('click',()=>{
   document.querySelectorAll('.dropdown-menu,.footer-menu').forEach(m=>m.classList.remove('open'));
 });
}

function toggleContacts(){
  const drawer=document.getElementById('contactDrawer');
  const list=document.getElementById('contactList');
  if(!drawer||!list) return;
  drawer.classList.toggle('active');
  list.classList.toggle('open');
}

document.addEventListener('click',function(event){
  const drawer=document.getElementById('contactDrawer');
  const list=document.getElementById('contactList');
  if(!drawer||!list) return;
  if(!drawer.contains(event.target)){
    drawer.classList.remove('active');
    list.classList.remove('open');
  }
});

window.addEventListener('DOMContentLoaded',initDropdown);
(function(){
  const cv=document.getElementById('stars');
  if(!cv) return;
  const cx=cv.getContext('2d');

  function resize(){
    cv.width=window.innerWidth;
    cv.height=window.innerHeight;
    cx.fillStyle='#000000';
    cx.fillRect(0,0,cv.width,cv.height);
  }

  resize();
  window.addEventListener('resize',resize);
})();
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.06});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
