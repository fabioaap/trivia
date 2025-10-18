export type ViewportHandle = {
  toGame: (x: number, y: number) => { x: number; y: number };
  onResize: () => void;
  dpr: number;
};

export function setupViewport(canvas: HTMLCanvasElement, baseW = 1920, baseH = 1080, dprMax = 2): ViewportHandle {
  const ctx = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
  let DPR = Math.min(window.devicePixelRatio || 1, dprMax);

  function apply() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(vw / baseW, vh / baseH);
    const cssW = Math.floor(baseW * scale);
    const cssH = Math.floor(baseH * scale);
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    canvas.width = Math.floor(baseW * DPR);
    canvas.height = Math.floor(baseH * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function toGame(x: number, y: number) {
    const r = canvas.getBoundingClientRect();
    const gx = (x - r.left) * (baseW / r.width);
    const gy = (y - r.top) * (baseH / r.height);
    return { x: gx, y: gy };
  }

  function onResize() {
    DPR = Math.min(window.devicePixelRatio || 1, dprMax);
    apply();
  }

  window.addEventListener("resize", onResize);
  apply();

  return { toGame, onResize, dpr: DPR };
}
