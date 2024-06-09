(function() {
  const patterns = [
    /free money/i,
    /click here/i,
    /follow for follow/i,
    /instant followers/i,
    /make \$\d{1,}/i,
    /get rich quick/i,
    /win a prize/i,
    /claim your reward/i,
    /exclusive offer/i
  ];

  function isSuspicious(text) {
    return patterns.some(pat => pat.test(text));
  }

  function scan() {
    const elems = document.querySelectorAll('p, span, div, a, h1, h2, h3, h4, h5, h6, li, button');
    elems.forEach(el => {
      if (isSuspicious(el.textContent)) {
        el.style.display = 'none';
        console.log(`Element hidden: ${el.textContent}`);
      }
    });
  }

  scan();
  setInterval(scan, 5000);
})();
