let answers = [];
let index = 0;
let nickname = "";
let musicStarted = false;

const questions = [
  "Do you like surprises? 😏",
  "Do you believe in love at first click? 💕",
  "Are you smiling right now? 😊",
];

const images = [
  //"assets/NM.jpeg",
  "assets/p1.jpeg",
  "assets/p2.jpeg",
  "assets/p3.jpeg",
];

const imagePositions = [
  "center 10%", // p1 – more top
  "center 25%", // p2
  "center 10%", // p3
];

function playMusic() {
  if (!musicStarted) {
    document.getElementById("bgMusic").play();
    musicStarted = true;
  }
}

function next(answer) {
  playMusic();
  answers.push(answer);
  index++;

  const questionElement = document.getElementById("question");

  if (index < questions.length) {
    changeBackground(images[index-1]);
    questionElement.innerText = questions[index];
  } else {
    document.getElementById("options").style.display = "none";
    questionElement.innerText = "";
    document.getElementById("nicknameBox").style.display = "block";

  }
}

function changeBackground(imagePath) {
  document.body.style.background = `url("${imagePath}") no-repeat center center / cover`;
  document.body.style.backgroundPosition = "center 20%";
}


function saveNickname() {
  nickname = document.getElementById("nickname").value || "My Love";
  answers.push("Nickname: " + nickname);

  document.getElementById("nicknameBox").style.display = "none";
  document.getElementById("finalText").innerText =
    `So ${nickname}... will you be my Valentine? 💖`;
  document.getElementById("final").style.display = "block";
}

/* Escaping NO button 😈 */
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * 80 + "%";
  noBtn.style.top = Math.random() * 80 + "%";
});

function submitAnswer(ans) {
  playMusic();
  answers.push(ans);

  const data = new FormData();
  data.append("responses", answers.join(" | "));

  fetch("https://formspree.io/f/mkovnqyp", {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  });

  document.querySelector(".card").style.display = "none";

  document.getElementById("successMsg").innerHTML = `
    ${nickname} 💕<br><br>
    You just made me very happy today 😘<br>
    Thank you for being my Valentine 💝
  `;

  document.getElementById("success").style.display = "block";
  launchConfetti();
  document.getElementById("bgMusic").pause();
  document.getElementById("bgMusic").currentTime = 0;
}

/* Confetti 🎉 */
function launchConfetti() {
  const end = Date.now() + 3000;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
