// 랜덤 색상 생성
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}

function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

// 초기 설정
let sampleColor = getRandomColor();
const sampleBox = document.getElementById("sampleColor");
const userBox = document.getElementById("userColor");
const colorPicker = document.getElementById("colorPicker");
const resultText = document.getElementById("resultText");
const retryBtn = document.getElementById("retryBtn");
const checkResultBtn = document.getElementById("checkResult");

// 제시 색상 표시
sampleBox.style.backgroundColor = rgbToHex(sampleColor);

// 색상 바꾸기 버튼
document.getElementById("changeColorBtn").addEventListener("click", () => {
  sampleColor = getRandomColor();
  sampleBox.style.backgroundColor = rgbToHex(sampleColor);

  resultText.textContent = "";
  retryBtn.style.display = "none";
  checkResultBtn.style.display = "inline-block";
});

// 컬러 피커 → 사용자 색상 박스 반영
colorPicker.addEventListener("input", () => {
  userBox.style.backgroundColor = colorPicker.value;
});

// 유사도 계산 (기본 RGB 거리 방식)
function calculateSimilarity(color1, hex2) {
  const r2 = parseInt(hex2.substr(1, 2), 16);
  const g2 = parseInt(hex2.substr(3, 2), 16);
  const b2 = parseInt(hex2.substr(5, 2), 16);

  const distance = Math.sqrt(
    Math.pow(color1.r - r2, 2) +
    Math.pow(color1.g - g2, 2) +
    Math.pow(color1.b - b2, 2)
  );

  const maxDistance = Math.sqrt(255 ** 2 * 3);
  return Math.round((1 - distance / maxDistance) * 100);
}

// 결과 확인 버튼
checkResultBtn.addEventListener("click", () => {
  const percent = calculateSimilarity(sampleColor, colorPicker.value);
  resultText.textContent = `유사도: ${percent}%`;

  // 결과 확인 버튼 숨김
  checkResultBtn.style.display = "none";

  // 다시 하기 버튼 표시
  retryBtn.style.display = "inline-block";
});

// 다시 하기
retryBtn.addEventListener("click", () => {
  colorPicker.value = "#ffffff";
  userBox.style.backgroundColor = "#ffffff";
  resultText.textContent = "";
  retryBtn.style.display = "none";
  checkResultBtn.style.display = "inline-block";
});
