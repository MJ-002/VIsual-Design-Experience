const sample = document.getElementById("sampleColor");
const userColor = document.getElementById("userColor");
const picker = document.getElementById("colorPicker");
const checkBtn = document.getElementById("checkResult");
const nextBtn = document.getElementById("nextBtn");
const resultText = document.getElementById("resultText");
const quizStatus = document.getElementById("quizStatus");

let current = 1;
let answers = [];

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

let sampleColor = randomColor();
sample.style.background = sampleColor;

picker.addEventListener("input", () => {
  userColor.style.background = picker.value;
});

// 간단한 RGB 차이 계산
function colorScore(a, b) {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);

  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);

  const diff = Math.sqrt((ar - br)**2 + (ag - bg)**2 + (ab - bb)**2);
  return Math.max(0, 100 - (diff / 441.67) * 100); // 0~100%
}

checkBtn.onclick = () => {
  const score = colorScore(sampleColor, picker.value);

  resultText.innerHTML = `유사도 : ${score.toFixed(1)}점`;

  checkBtn.style.display = "none";
  nextBtn.style.display = "inline-block";

  answers.push({
    sample: sampleColor,
    user: picker.value,
    score: score
  });
};

nextBtn.onclick = () => {
  current++;

  if (current > 5) {
    localStorage.setItem("quizResults", JSON.stringify(answers));
    location.href = "color-result.html";
    return;
  }

  quizStatus.innerText = `${current} / 5`;

  sampleColor = randomColor();
  sample.style.background = sampleColor;

  picker.value = "#ffffff";
  userColor.style.background = "#ffffff";

  resultText.innerHTML = "";
  checkBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
};
