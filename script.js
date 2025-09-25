// Timeline controller for automatic scene playback

const SCENES_ORDER = [
  'opening',
  'step-1',
  'step-2',
  'step-3',
  'step-4',
  'step-5',
  'closing',
];

const DURATION_MS = 3000; // each scene ~3s

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function setActiveScene(sceneName) {
  const all = qsa('.scene');
  all.forEach(s => s.classList.remove('is-active'));
  const next = document.querySelector(`.scene[data-scene="${sceneName}"]`);
  if (next) {
    next.classList.add('is-active');
    // entry micro animation
    next.classList.add('enter');
    requestAnimationFrame(() => next.classList.add('active'));
    setTimeout(() => { next.classList.remove('enter', 'active'); }, 720);
  }
}

function playOpeningEffects() {
  const typing = qs('.title__typing');
  const underline = qs('.underline');
  const icons = qsa('.icon-wrap');

  typing.classList.add('typewriter');
  underline.classList.add('underline-draw');

  // Stagger icons with a subtle bounce
  icons.forEach((el, idx) => {
    setTimeout(() => el.classList.add('is-in'), 160 + idx * 110);
  });
}

function applyIconMotionFor(sceneEl) {
  const icon = sceneEl.querySelector('[data-icon]');
  if (!icon) return;
  const name = icon.getAttribute('data-icon');
  const map = {
    sun: 'motion-sun',
    walker: 'motion-walker',
    group: 'motion-group',
    door: 'motion-door',
    hands: 'motion-hands',
  };
  const cls = map[name];
  if (cls) icon.firstElementChild?.classList.add(cls);
}

function emphasizeKeywords(sceneEl) {
  const el = sceneEl.querySelector('.scene__text');
  if (!el) return;
  const text = el.textContent || '';
  const replacements = [
    ['sourires', 'sourires'],
    ['larmes', 'larmes'],
    ['collective', 'collective'],
    ['jamais seul', 'jamais&nbsp;seul'],
  ];
  let html = text;
  replacements.forEach(([word, label]) => {
    const re = new RegExp(`(${word})`, 'ig');
    html = html.replace(re, '<strong>$1</strong>');
  });
  el.innerHTML = html;
}

function initScenes() {
  // mount initial active state
  setActiveScene('opening');
  playOpeningEffects();
}

function startTimeline() {
  let idx = 0;

  function step() {
    const name = SCENES_ORDER[idx % SCENES_ORDER.length];
    setActiveScene(name);

    const el = document.querySelector(`.scene[data-scene="${name}"]`);
    if (el) {
      applyIconMotionFor(el);
      if (name.startsWith('step')) emphasizeKeywords(el);
      if (name === 'closing') orchestrateClosing(el);
    }

    idx += 1;
  }

  step();
  return setInterval(step, DURATION_MS);
}

document.addEventListener('DOMContentLoaded', () => {
  initScenes();
  startTimeline();
  // Remove date mentions: not displayed anywhere; ensured by content.
});

function orchestrateClosing(sceneEl) {
  const icons = sceneEl.querySelectorAll('.mini');
  icons.forEach((el, i) => {
    el.style.transition = 'transform 700ms cubic-bezier(.2,.8,.2,1), opacity 700ms';
    el.style.transform = 'translateY(10px)';
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    }, 150 + i * 120);
  });
}

