// Lightweight SVG icon registry and injector
// Provides: insertIcon(targetElement, name, { size, color })

const ICONS = {
  sun: ({ color = '#f3b21a' } = {}) => `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="gSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffd76b"/>
          <stop offset="70%" stop-color="${color}"/>
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="14" fill="url(#gSun)" />
      <g stroke="${color}" stroke-width="4" stroke-linecap="round">
        <line x1="32" y1="4" x2="32" y2="14" />
        <line x1="32" y1="50" x2="32" y2="60" />
        <line x1="4" y1="32" x2="14" y2="32" />
        <line x1="50" y1="32" x2="60" y2="32" />
        <line x1="11" y1="11" x2="18" y2="18" />
        <line x1="46" y1="46" x2="53" y2="53" />
        <line x1="46" y1="18" x2="53" y2="11" />
        <line x1="11" y1="53" x2="18" y2="46" />
      </g>
    </svg>
  `,

  walker: ({ color = '#ea7a2f' } = {}) => `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="40" cy="14" r="6" fill="${color}"/>
      <path d="M24 30 L38 24 L44 30 L36 34 L30 48" stroke="${color}" stroke-width="5"/>
      <path d="M28 34 L20 44" stroke="${color}" stroke-width="5"/>
      <path d="M30 48 L22 58" stroke="${color}" stroke-width="5"/>
      <path d="M36 34 L48 44" stroke="${color}" stroke-width="5"/>
    </svg>
  `,

  group: ({ color = '#b87333' } = {}) => `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <g fill="${color}">
        <circle cx="20" cy="22" r="6"/>
        <circle cx="44" cy="22" r="6"/>
        <circle cx="32" cy="18" r="7"/>
        <rect x="10" y="32" width="16" height="10" rx="5"/>
        <rect x="26" y="30" width="12" height="12" rx="6"/>
        <rect x="38" y="32" width="16" height="10" rx="5"/>
      </g>
    </svg>
  `,

  door: ({ color = '#f28cb1' } = {}) => `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect x="16" y="8" width="28" height="48" rx="2" fill="${color}"/>
      <rect x="12" y="6" width="32" height="52" rx="3" fill="none" stroke="${color}" stroke-width="3"/>
      <circle cx="38" cy="32" r="2" fill="#fff"/>
    </svg>
  `,

  hands: ({ color = '#17b978' } = {}) => `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true" fill="none">
      <path d="M18 38 C18 30 28 28 30 36 L32 44 C34 50 26 52 24 46 L22 40 Z" fill="${color}"/>
      <path d="M46 26 C38 26 38 36 46 36 L50 36 C56 36 56 44 50 44 L44 44 C38 44 36 36 40 32" fill="${color}"/>
    </svg>
  `,
};

function insertIcon(target, name, opts = {}) {
  const iconFn = ICONS[name];
  if (!iconFn) return;
  const size = opts.size || 72;
  const wrapper = document.createElement('div');
  wrapper.className = 'svg-icon';
  wrapper.style.width = `${size}px`;
  wrapper.style.height = `${size}px`;
  wrapper.innerHTML = iconFn(opts);
  target.innerHTML = '';
  target.appendChild(wrapper);
}

function mountAllIcons() {
  document.querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.getAttribute('data-icon');
    insertIcon(el, name, {});
  });
}

document.addEventListener('DOMContentLoaded', mountAllIcons);

window.__icons = { insertIcon };

