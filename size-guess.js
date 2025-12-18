/* --------------------------
   pxPerCm 가져오기
--------------------------- */
function getPxPerCm() {
    const div = document.createElement("div");
    div.style.width = "1cm";
    div.style.visibility = "hidden";
    document.body.appendChild(div);
    const px = div.offsetWidth;
    div.remove();
    return px;
}

let pxPerCm = getPxPerCm();

/* 문제 정답(cm) */
let answerCm = 0;
let currentAngle = 0;

/* --------------------------
   페이지 로딩 시 문제 자동 생성
--------------------------- */
window.onload = () => {
    generateProblem();
};

/* --------------------------
   문제 생성
--------------------------- */
function generateProblem() {
    document.getElementById("result").innerText = "";
    document.getElementById("user-input").value = "";

    // 사용자 입력 선 숨기기
    document.getElementById("user-line").classList.add("size-hidden");

    answerCm = Math.random() * 15 + 2;          // 2~20cm
    const thickness = Math.random() * 6 + 2;    // 2~8px
    const angles = [0, 45, -45, 90];
    currentAngle = angles[Math.floor(Math.random() * angles.length)];

    const quiz = document.getElementById("quiz-line");
    const px = answerCm * pxPerCm;

    quiz.style.width = px + "px";
    quiz.style.height = thickness + "px";
    quiz.style.transform = `translateX(-50%) rotate(${currentAngle}deg)`;

    drawOneCm();
}

/* --------------------------
   1cm 기준선
--------------------------- */
function drawOneCm() {
    const cm = document.getElementById("cm-line");
    cm.style.width = pxPerCm + "px";
}

/* --------------------------
   정답 제출 + 오차 시각화
--------------------------- */
function submitInput() {
    const v = parseFloat(document.getElementById("user-input").value);
    if (isNaN(v)) return alert("숫자를 입력하세요!");

    const diff = Math.abs(v - answerCm);
    const r = document.getElementById("result");

    const userLine = document.getElementById("user-line");
    userLine.classList.remove("size-hidden");

    const userPx = v * pxPerCm;

    userLine.style.width = userPx + "px";
    userLine.style.height =
        document.getElementById("quiz-line").style.height;
    userLine.style.transform =
        `translateX(-50%) rotate(${currentAngle}deg)`;

    r.innerText =
        diff < 0.1
            ? `정답! (${answerCm.toFixed(1)} cm)`
            : `오답! 정답은 ${answerCm.toFixed(1)} cm 입니다.
            파란색으로 표시된 선분이 당신이 입력한 길이입니다.`;
}
