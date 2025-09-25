(function () {
  const iconEl = document.getElementById('sceneIcon');
  const textEl = document.getElementById('sceneText');
  const sceneEl = document.getElementById('scene');

  /**
   * Each scene lasts ~3 seconds and runs automatically.
   * id: used for body class coloring
   * icon: sprite id
   * text: content to display
   * effects: optional special classes or callbacks
   */
  const scenes = [
    {
      id: 0, // opening hold
      icon: 'ico-sun',
      text: '',
      setup: () => {
        // opening header already animates via CSS
      },
      duration: 3000,
    },
    {
      id: 1,
      icon: 'ico-sun',
      text:
        '« Ce matin-là, tout commence par un grand pas en dehors de la maison. Le cartable est prêt, le cœur un peu serré mais les yeux remplis de curiosité. »',
      setup: () => {
        iconEl.classList.add('pulse');
        textEl.classList.add('typewriter');
      },
      cleanup: () => {
        iconEl.classList.remove('pulse');
        textEl.classList.remove('typewriter');
      },
      duration: 3000,
    },
    {
      id: 2,
      icon: 'ico-walk',
      text:
        '« À l’entrée de l’école, il y a beaucoup d’enfants, de parents, de sourires… et aussi quelques larmes. C’est un moment où l’on découvre un nouvel univers. »',
      setup: () => {
        // subtle step animation via small translate loop
        stepWalk(iconEl);
      },
      cleanup: () => stopStepWalk(),
      duration: 3000,
    },
    {
      id: 3,
      icon: 'ico-group',
      text:
        '« Dans la cour, les élèves se rassemblent. On cherche des visages familiers, on entend des voix nouvelles. C’est le début d’une grande aventure collective. »',
      setup: () => {
        iconEl.classList.add('pulse');
      },
      cleanup: () => iconEl.classList.remove('pulse'),
      duration: 3000,
    },
    {
      id: 4,
      icon: 'ico-door',
      text:
        '« Les pas résonnent dans le couloir. Les murs colorés, les dessins, les rires qui s’échappent des classes… tout invite à explorer. »',
      setup: () => sceneEl.classList.add('light-sweep'),
      cleanup: () => sceneEl.classList.remove('light-sweep'),
      duration: 3000,
    },
    {
      id: 5,
      icon: 'ico-hands',
      text:
        '« Et quand on est perdu, une main tendue apparaît : un camarade, un professeur, un sourire bienveillant. On comprend qu’à l’école, on n’est jamais seul. »',
      setup: () => {
        iconEl.classList.add('glow');
      },
      cleanup: () => {
        iconEl.classList.remove('glow');
      },
      duration: 3000,
    },
    {
      id: 6,
      icon: '',
      text:
        '« Le premier jour d’école n’est pas seulement une entrée dans un bâtiment… C’est le début d’un voyage, d’une histoire qui s’écrit pas à pas. »',
      setup: () => {},
      duration: 3000,
    },
  ];

  let idx = 0;
  let timer = null;

  function applyScene(scene) {
    document.body.className = document.body.className
      .split(' ')
      .filter((c) => !/^scene-/.test(c))
      .join(' ');
    document.body.classList.add(`scene-${scene.id}`);

    // Animate out
    sceneEl.classList.remove('enter');
    sceneEl.classList.add('leave');

    window.setTimeout(() => {
      // Update icon
      iconEl.innerHTML = scene.icon ? `<use href="#${scene.icon}"></use>` : '';
      iconEl.style.display = scene.icon ? 'block' : 'none';

      // Update text
      textEl.classList.remove('typewriter');
      textEl.textContent = '';
      // Trigger enter
      sceneEl.classList.remove('leave');
      sceneEl.classList.add('enter');

      // Setup effects
      scene.setup && scene.setup();

      // If typewriter desired for scenes with long text, run quickly
      if (scene.id === 1) {
        typeText(scene.text, 28);
      } else {
        textEl.textContent = scene.text;
      }
    }, 180);
  }

  function nextScene() {
    // cleanup previous if exists
    const prev = scenes[idx];
    prev && prev.cleanup && prev.cleanup();

    idx = (idx + 1) % scenes.length;
    const scene = scenes[idx];
    applyScene(scene);

    clearTimeout(timer);
    timer = setTimeout(nextScene, scene.duration);
  }

  // Helpers: simple walking jiggle
  let walkInterval = null;
  function stepWalk(el) {
    stopStepWalk();
    let dir = 1;
    walkInterval = setInterval(() => {
      el.style.transform = `translateX(${dir * 4}px)`;
      dir *= -1;
    }, 280);
  }
  function stopStepWalk() {
    if (walkInterval) clearInterval(walkInterval);
    walkInterval = null;
    iconEl.style.transform = 'none';
  }

  function typeText(fullText, speed) {
    let pos = 0;
    textEl.textContent = '';
    const run = () => {
      if (pos <= fullText.length) {
        textEl.textContent = fullText.slice(0, pos);
        pos += 2; // faster typing
        requestAnimationFrame(() => setTimeout(run, speed));
      } else {
        textEl.classList.remove('typewriter');
      }
    };
    textEl.classList.add('typewriter');
    run();
  }

  // Kick off
  applyScene(scenes[idx]);
  timer = setTimeout(nextScene, scenes[idx].duration);
})();

