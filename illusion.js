// 착시 이미지 세트 구성
// bottom = 밑 이미지
// top = 겹쳐지는 공통 템플릿
// thumb = 썸네일 (bottom과 동일하게 사용)

const illusions = [
  { bottom: "round.jpg",   top: "template.png", thumb: "round.jpg" },
  { bottom: "dino.jpg",    top: "template.png", thumb: "dino.jpg" },
  { bottom: "maze.jpg",    top: "template.png", thumb: "maze.jpg" },
  { bottom: "geer.jpg",    top: "template.png", thumb: "geer.jpg" },
  { bottom: "creeper.jpg", top: "template.png", thumb: "creeper.jpg" },
  { bottom: "super.jpg",   top: "template.png", thumb: "super.jpg" },

  { bottom: "spin2.jpg",   top: "template.png", thumb: "spin2.jpg" },
  { bottom: "gun.jpg",     top: "template.png", thumb: "gun.jpg" },
  { bottom: "walk.jpg",    top: "template.png", thumb: "walk.jpg" },
  { bottom: "sphere.jpg",  top: "template.png", thumb: "sphere.jpg" },
  { bottom: "cat.jpg",     top: "template.png", thumb: "cat.jpg" },
  { bottom: "packman.jpg", top: "template.png", thumb: "packman.jpg" },
  { bottom: "fall.jpg",    top: "template.png", thumb: "fall.jpg" },
  { bottom: "spin.jpg",    top: "template.png", thumb: "spin.jpg" },
  { bottom: "factory.jpg", top: "template.png", thumb: "factory.jpg" },
  { bottom: "water.jpg",   top: "template.png", thumb: "water.jpg" }
];

const grid = document.getElementById("illusionGrid");
const modal = document.getElementById("illusionModal");
const bottomImg = document.getElementById("bottomImg");
const topImg = document.getElementById("topImg");
const slider = document.getElementById("slider");
const closeBtn = document.getElementById("closeModal");

// 🔹 랜덤하게 떠다니는 썸네일 생성 (CSS 변수만 설정)
illusions.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "illusion-thumb";

  div.style.backgroundImage = `url(${item.thumb})`;

  // CSS에서 사용할 커스텀 변수
  div.style.setProperty("--tx", `${Math.random() * 40 - 20}px`);
  div.style.setProperty("--ty", `${Math.random() * 40 - 20}px`);
  div.style.setProperty("--rot", `${Math.random() * 10 - 5}deg`);
  div.style.setProperty("--delay", `${Math.random() * 1.2}s`);

  div.onclick = () => openIllusion(index);
  grid.appendChild(div);
});

// 🔹 모달 열기
function openIllusion(i) {
  modal.style.display = "flex";

  bottomImg.src = illusions[i].bottom;
  topImg.src = illusions[i].top;

  // 슬라이더 초기화
  slider.value = 0;

  // top 이미지를 왼쪽 밖에서 시작
  topImg.style.transform = "translateX(-100%)";
}

// 🔹 슬라이더로 top 이미지 이동
slider.addEventListener("input", () => {
  const v = parseInt(slider.value, 10);

  // 0 → -100%, 50 → 0%, 100 → +100%
  const moveX = (v - 50) * 2;

  topImg.style.transform = `translateX(${moveX}%)`;
});



// 🔹 배경 클릭 시 닫기
modal.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
