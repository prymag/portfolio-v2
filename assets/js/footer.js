export function initFooter() {
  const phrases = [
    'ssh prymag@perrymark.dev',
    'cd ~',
    'mkdir project && cd project',
    'touch index.php',
    'echo "<?php phpinfo();" > index.php',
    'touch Dockerfile',
    'echo "FROM php:8.4-alpine" > Dockerfile',
    'echo "COPY ./ /var/www/html/" >> Dockerfile',
    'docker build -t app .',
    'docker run -d -p 443:443 -p 80:80 --name my-app app',
    'docker ps',
    'docker rm -f my-app',
    'rm -rf *',
    '^_^ :) :D',
    'clear'
  ];

  const el      = document.getElementById('footer-typed');
  const cur     = document.getElementById('footer-cursor');
  const history = document.getElementById('terminal-history');

  if (!el || !cur || !history) return;

  let phraseIndex = 0;

  function type(text, onDone) {
    let i = 0;
    function step() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(step, i === 1 ? 600 : 55 + Math.random() * 35);
      } else {
        onDone();
      }
    }
    step();
  }

  function backspace(onDone) {
    let text = el.textContent;
    function step() {
      if (text.length === 0) { onDone(); return; }
      text = text.slice(0, -1);
      el.textContent = text;
      setTimeout(step, 40 + Math.random() * 30);
    }
    step();
  }

  function pressEnter(onDone) {
    // Keep only 1 history line — replace if one already exists
    let line = history.querySelector('.terminal-history-line');
    if (!line) {
      line = document.createElement('div');
      line.className = 'terminal-history-line';
      history.appendChild(line);
    }
    line.textContent = '> ' + el.textContent;

    // Clear the active input
    el.textContent = '';
    onDone();
  }

  function reset() {
    // Simulate `clear` — wipe history and input, restart
    const line = history.querySelector('.terminal-history-line');
    if (line) line.textContent = '\u00a0';
    el.textContent = '';
    phraseIndex = 0;
    setTimeout(run, 600);
  }

  function run() {
    const current = phrases[phraseIndex];
    const isLast  = phraseIndex === phrases.length - 1;

    type(current, function () {
      setTimeout(function () {
        if (current === 'rm -rf *' || current === '^_^ :) :D') {
          // Simulate backspace-deleting the command instead of Enter
          backspace(function () {
            phraseIndex++;
            setTimeout(run, 400);
          });
        } else if (isLast) {
          // `clear` command — press Enter, then wipe everything and loop
          pressEnter(function () {
            setTimeout(reset, 400);
          });
        } else {
          pressEnter(function () {
            phraseIndex++;
            setTimeout(run, 400);
          });
        }
      }, 1500);
    });
  }

  const observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      setTimeout(run, 400);
    }
  }, { threshold: 0.5 });

  observer.observe(cur.closest('footer'));
}
