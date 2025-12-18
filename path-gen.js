const svg = document.getElementById("svg");
const path = document.getElementById("path");

/* --------------------
   SVG 기준값 (핵심)
-------------------- */
const SVG_SIZE = 800;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;

// viewBox는 표시/저장용으로만 사용
svg.setAttribute("viewBox", `0 0 ${SVG_SIZE} ${SVG_SIZE}`);

const controls = {
  baseRadius: document.getElementById("baseRadius"),
  amplitude: document.getElementById("amplitude"),
  frequency: document.getElementById("frequency"),
  samples: document.getElementById("samples"),
  waveType: document.getElementById("waveType"),
  strokeWidth: document.getElementById("strokeWidth"),
  color: document.getElementById("color")
};

Object.values(controls).forEach(el =>
  el.addEventListener("input", updatePath)
);

/* --------------------
   파형 함수
-------------------- */
function waveFn(type, t) {
  switch (type) {
    case "triangle":
      return 2 * Math.asin(Math.sin(t)) / Math.PI;
    case "saw":
      return 2 * (t / (2 * Math.PI) - Math.floor(t / (2 * Math.PI) + 0.5));
    default:
      return Math.sin(t);
  }
}

/* --------------------
   패스 생성 (중앙 고정)
-------------------- */
function generatePath() {
  const baseRadius = +controls.baseRadius.value;
  const amplitude = +controls.amplitude.value;
  const frequency = +controls.frequency.value;
  const samples = +controls.samples.value;
  const waveType = controls.waveType.value;

  let d = "";

  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    const wave = waveFn(waveType, t * frequency);
    const r = Math.max(5, baseRadius + amplitude * wave);

    const x = CX + r * Math.cos(t);
    const y = CY + r * Math.sin(t);

    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }

  return d + " Z";
}

/* --------------------
   업데이트
-------------------- */
function updatePath() {
  path.setAttribute("d", generatePath());
  path.setAttribute("stroke-width", controls.strokeWidth.value);
  path.setAttribute("stroke", controls.color.value);
  path.setAttribute("fill", "none");
}

updatePath();

/* --------------------
   랜덤
-------------------- */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randomize() {
  controls.baseRadius.value = rand(80, 200);
  controls.amplitude.value = rand(10, 120);
  controls.frequency.value = Math.floor(rand(2, 30));
  controls.samples.value = Math.floor(rand(120, 400));
  updatePath();
}

/* --------------------
   SVG 저장 (정중앙 유지)
-------------------- */
function saveSVG() {
  const blob = new Blob(
    [
      `<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${SVG_SIZE} ${SVG_SIZE}"
        width="${SVG_SIZE}" height="${SVG_SIZE}">
        ${svg.innerHTML}
      </svg>`
    ],
    { type: "image/svg+xml" }
  );

  download(blob, "path.svg");
}

/* --------------------
   PNG 저장 (정중앙 유지)
-------------------- */
function savePNG() {
  const canvas = document.createElement("canvas");
  canvas.width = SVG_SIZE;
  canvas.height = SVG_SIZE;
  const ctx = canvas.getContext("2d");

  const img = new Image();
  const svgBlob = new Blob(
    [
      `<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${SVG_SIZE} ${SVG_SIZE}"
        width="${SVG_SIZE}" height="${SVG_SIZE}">
        ${svg.innerHTML}
      </svg>`
    ],
    { type: "image/svg+xml" }
  );

  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob(blob => download(blob, "path.png"));
  };

  img.src = url;
}

/* --------------------
   다운로드
-------------------- */
function download(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}
