'use strict';

const SCENE_MS = 3000; // 3s per scene
const ORDER = ['opening','depart','arrivee','assemblee','couloir','aide','closing'];

function qs(sel, root=document){return root.querySelector(sel)}
function qsa(sel, root=document){return Array.from(root.querySelectorAll(sel))}

function mountInlineSVGIcons(){
  const iconMap = {
    sun: '#ic-sun',
    walk: '#ic-walk',
    group: '#ic-group',
    door: '#ic-door',
    hands: '#ic-hands'
  };
  qsa('[data-icon]').forEach(el=>{
    const key = el.getAttribute('data-icon');
    const ref = iconMap[key];
    if(!ref) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 64 64');
    svg.setAttribute('class','use');
    svg.setAttribute('aria-hidden','true');
    const use = document.createElementNS('http://www.w3.org/2000/svg','use');
    use.setAttributeNS('http://www.w3.org/1999/xlink','href',ref);
    svg.appendChild(use);
    el.appendChild(svg);
  });
}

function setSceneVisibility(activeKey){
  qsa('.scene').forEach(s=>{
    const isActive = s.dataset.scene === activeKey;
    s.setAttribute('aria-hidden', isActive ? 'false' : 'true');
  });
}

function playPerSceneEffects(key){
  const scene = qs(`.scene[data-scene="${key}"]`);
  if(!scene) return;
  const icon = scene.querySelector('.scene-icon svg');
  switch(key){
    case 'opening': {
      // Pulse icons row
      qsa('.icons-row .icon svg').forEach((el,i)=>{
        el.style.animation = `pulse 1.8s ease ${0.2 + i*0.15}s 2`;
      });
      break;
    }
    case 'depart': {
      if(icon) icon.style.animation = 'pulse 2s ease 0s 2';
      break;
    }
    case 'arrivee': {
      if(icon) icon.style.transform = 'translateX(0)';
      if(icon) icon.animate([
        {transform:'translateX(-6px)'},
        {transform:'translateX(8px)'},
        {transform:'translateX(0)'}
      ], {duration:1200, easing:'ease'});
      break;
    }
    case 'assemblee': {
      // subtle scale in/out
      if(icon) icon.animate([
        {transform:'scale(0.96)'},
        {transform:'scale(1)'},
        {transform:'scale(0.98)'}
      ], {duration:1400, easing:'ease'});
      break;
    }
    case 'couloir': {
      if(icon) icon.style.transformOrigin = 'left center';
      if(icon) icon.style.animation = 'door-open 1.2s ease forwards';
      break;
    }
    case 'aide': {
      if(icon) icon.style.animation = 'glow 1.6s ease 0s 2';
      break;
    }
    case 'closing': {
      // nothing extra
      break;
    }
  }
}

function runTimeline(){
  let idx = 0;
  setSceneVisibility(ORDER[idx]);
  playPerSceneEffects(ORDER[idx]);
  const timer = setInterval(()=>{
    idx += 1;
    if(idx >= ORDER.length){
      clearInterval(timer);
      // gentle fade-out at end
      document.body.animate([{opacity:1},{opacity:0.96},{opacity:1}],{duration:800});
      return;
    }
    setSceneVisibility(ORDER[idx]);
    playPerSceneEffects(ORDER[idx]);
  }, SCENE_MS);
}

function removeDateIfPresent(){
  // No date element exists in our HTML, function is a no-op for safety
}

function setupAudio(){
  const audioCtx = (window.AudioContext||window.webkitAudioContext)? new (window.AudioContext||window.webkitAudioContext)() : null;
  if(!audioCtx) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReducedMotion) return; // keep it subtle
  function ping(time, freq){
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.06, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.4);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.5);
  }
  // schedule light chimes at opening and closing
  const now = audioCtx.currentTime + 0.1;
  ping(now, 880);
  ping(now + (SCENE_MS*ORDER.length)/1000 - 0.6, 660);
}

window.addEventListener('DOMContentLoaded', ()=>{
  mountInlineSVGIcons();
  removeDateIfPresent();
  setupAudio();
  runTimeline();
});