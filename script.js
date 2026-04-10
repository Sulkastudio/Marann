const openingOverlay = document.getElementById("openingOverlay");
const giftButton = document.getElementById("giftButton");
const giftList = document.getElementById("giftList");
const giftItemsContainer = document.getElementById("giftItems");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

const confettiPieces = [];
let animationFrame = null;
const gifts = [
  "Un atelier pour creer ta bague en argent",
  "Deux places pour aller voir King Kong Meuf + Parcours Sante (deux groupes de punk feminin) le 29 Mai"
];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function openIntroOverlay() {
  setTimeout(() => {
    openingOverlay.classList.add("hidden-overlay");
  }, 3200);
}

function createConfettiBurst() {
  const colors = ["#ff4fa5", "#49f2ff", "#ffe65d", "#ffffff", "#9047ff", "#ff944d"];
  const pieceCount = 180;
  const centerX = confettiCanvas.width / 2;
  const centerY = confettiCanvas.height / 2;

  for (let i = 0; i < pieceCount; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 2;
    confettiPieces.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      gravity: 0.13 + Math.random() * 0.1,
      size: Math.random() * 7 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 16 - 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 150 + Math.random() * 35
    });
  }

  if (!animationFrame) {
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = confettiPieces.length - 1; i >= 0; i -= 1) {
    const piece = confettiPieces[i];
    piece.vy += piece.gravity;
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.rotation += piece.rotationSpeed;
    piece.life -= 1;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotation * Math.PI) / 180);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
    ctx.restore();

    if (piece.life <= 0 || piece.y > confettiCanvas.height + 30) {
      confettiPieces.splice(i, 1);
    }
  }

  if (confettiPieces.length > 0) {
    animationFrame = requestAnimationFrame(animateConfetti);
  } else {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

function setupGiftInteraction() {
  let opened = false;
  giftButton.addEventListener("click", () => {
    opened = !opened;
    giftButton.classList.toggle("opened", opened);
    giftButton.setAttribute("aria-expanded", String(opened));
    giftList.classList.toggle("hidden", !opened);
    createConfettiBurst();
  });
}

function renderGifts() {
  const giftMarkup = gifts.map((gift) => `<li>${gift}</li>`).join("");
  giftItemsContainer.innerHTML = giftMarkup;
}

resizeCanvas();
openIntroOverlay();
setupGiftInteraction();
renderGifts();

window.addEventListener("resize", resizeCanvas);
