/* =========================
   사운드 설정
========================= */

// 클릭 효과음
const clickSound = new Audio("click.mp3");
clickSound.volume = 0.6;

// 배경음악
const bgm = new Audio("mewpot.mp3");
bgm.loop = true;
bgm.volume = 0.5;

/* =========================
   BGM 상태 복원
========================= */

const savedTime = localStorage.getItem("bgmTime");
const savedPlaying = localStorage.getItem("bgmPlaying");

if (savedTime) {
  bgm.currentTime = parseFloat(savedTime);
}

/* =========================
   사용자 첫 상호작용 후 BGM 시작
========================= */

let bgmUnlocked = false;

function unlockBGM() {
  if (bgmUnlocked) return;

  bgm.play().then(() => {
    bgmUnlocked = true;
    localStorage.setItem("bgmPlaying", "true");
  }).catch(() => {});

  document.removeEventListener("click", unlockBGM);
}

document.addEventListener("click", unlockBGM, { once: true });

/* =========================
   클릭 효과음 (전역)
========================= */

document.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
});

/* =========================
   페이지 이동 시 BGM 상태 저장
========================= */

setInterval(() => {
  if (!bgm.paused) {
    localStorage.setItem("bgmTime", bgm.currentTime);
    localStorage.setItem("bgmPlaying", "true");
  }
}, 1000);

/* =========================
   컨트롤 바 생성
========================= */

window.addEventListener("DOMContentLoaded", () => {
  const bar = document.createElement("div");
  bar.style.cssText = `
    width: 800px;
    margin: 10px auto 20px;
    padding: 10px 14px;
    border-radius: 14px;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
  `;

  const btn = document.createElement("button");
  btn.textContent = "⏸ Pause";
  btn.style.cssText = `
    padding: 6px 12px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  `;

  btn.onclick = () => {
    if (bgm.paused) {
      bgm.play();
      btn.textContent = "⏸ Pause";
      localStorage.setItem("bgmPlaying", "true");
    } else {
      bgm.pause();
      btn.textContent = "▶ Play";
      localStorage.setItem("bgmPlaying", "false");
    }
  };

  bar.appendChild(btn);
  document.body.appendChild(bar);

  // 이전 재생 상태 복원
  if (savedPlaying === "true") {
    bgm.play().catch(() => {});
  } else {
    btn.textContent = "▶ Play";
  }
});
