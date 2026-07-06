
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
  let W,H,stars=[];

  function resize(){
    W=cv.width=window.innerWidth;
    H=cv.height=window.innerHeight;
    stars=Array.from({length:220},()=>({
      x:Math.random()*W,
      y:Math.random()*H,
      r:Math.random()*1.1+.15,
      speed:0.18+Math.random()*0.32,
      ph:Math.random()*Math.PI*2
    }));
  }

  function draw(t){
    // solid near-black backdrop, no colored haze
    const bg=cx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#0d0d0d');
    bg.addColorStop(.35,'#080808');
    bg.addColorStop(.7,'#030303');
    bg.addColorStop(1,'#000000');
    cx.fillStyle=bg;
    cx.fillRect(0,0,W,H);

    // single, very soft monochrome vignette (replaces the old colored orbs)
    const vg=cx.createRadialGradient(W*0.5,H*0.08,0,W*0.5,H*0.08,Math.max(W,H)*0.65);
    vg.addColorStop(0,'rgba(255,255,255,0.035)');
    vg.addColorStop(1,'rgba(0,0,0,0)');
    cx.fillStyle=vg;
    cx.fillRect(0,0,W,H);

    cx.save();
    stars.forEach((s,i)=>{
      const twinkle=.35+.65*Math.sin(t*0.0012+s.ph+i*0.2);
      s.y+=(s.speed+Math.sin(t*0.0004+i)*0.03);
      if(s.y>H+10){s.y=-10;s.x=Math.random()*W;}
      cx.beginPath();
      cx.arc(s.x,s.y,s.r,0,Math.PI*2);
      cx.fillStyle=`rgba(255,255,255,${0.12+twinkle*0.55})`;
      cx.fill();
      if(i%13===0){
        cx.beginPath();
        cx.moveTo(s.x,s.y);
        cx.lineTo(s.x+12,s.y-12);
        cx.strokeStyle=`rgba(255,255,255,${0.05+twinkle*0.06})`;
        cx.stroke();
      }
    });
    cx.restore();
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize',resize);
  requestAnimationFrame(draw);
})();
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.06});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
