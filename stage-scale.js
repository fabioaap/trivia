(function () {
  const BASE_W = 1920;
  const BASE_H = 1080;
  const DPR_MAX = 2;

  const stage = document.getElementById('stage');
  if (!stage) return;

  function fit() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = Math.min(vw / BASE_W, vh / BASE_H);

    // centraliza via translação + escala calculada
    const scaledW = BASE_W * s;
    const scaledH = BASE_H * s;
    const offsetX = (vw - scaledW) * 0.5;
    const offsetY = (vh - scaledH) * 0.5;

    stage.style.left = '0px';
    stage.style.top = '0px';
    stage.style.transformOrigin = 'top left';
    stage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${s})`;

    // sanity check - log para verificar centralização
    setTimeout(() => {
      const rect = stage.getBoundingClientRect();
      console.log('Palco redimensionado:', {
        window: { width: vw, height: vh },
        stage: { width: rect.width, height: rect.height, left: rect.left, top: rect.top },
        scale: s,
        barrasH: (vw - rect.width) / 2,
        barrasV: (vh - rect.height) / 2
      });
    }, 0);
  }

  window.addEventListener('resize', fit);
  fit();

  window.stageToGame = function(clientX, clientY) {
    const r = stage.getBoundingClientRect();
    return {
      x: (clientX - r.left) * (BASE_W / r.width),
      y: (clientY - r.top)  * (BASE_H / r.height)
    };
  };

  const canv = stage.querySelector('canvas');
  if (canv) {
    const ctx = canv.getContext('2d', { alpha: false });
    function applyDpr() {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX);
      canv.width  = Math.floor(BASE_W * dpr);
      canv.height = Math.floor(BASE_H * dpr);
      canv.style.width  = BASE_W + 'px';
      canv.style.height = BASE_H + 'px';
      if (ctx && ctx.setTransform) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    applyDpr();
    window.addEventListener('resize', applyDpr);
  }
})();
