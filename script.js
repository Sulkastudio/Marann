(function () {
  const giftBox = document.getElementById("giftBox");
  const envelopesContainer = document.getElementById("envelopes");
  const envelopeStack = document.getElementById("envelopeStack");
  const closeBtn = document.getElementById("closeEnvelopes");

  let giftsRevealed = false;

  // Show stickers immediately (no opening overlay)
  document.querySelectorAll(".sticker").forEach(function (s, i) {
    setTimeout(function () {
      s.classList.add("visible");
    }, i * 100);
  });

  // --- CONFETTI ON PAGE LOAD ---
  window.addEventListener("load", function () {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { x: 0.5, y: 0.3 },
      colors: ["#ffd6e0", "#e0c3fc", "#c1f0db", "#ffd8be", "#fff5c3", "#b8e6ff", "#ff9eb5", "#ffe45d"]
    });
    setTimeout(function () {
      confetti({
        particleCount: 80,
        spread: 70,
        angle: 60,
        origin: { x: 0, y: 0.5 },
        colors: ["#ffd6e0", "#e0c3fc", "#ff9eb5", "#d28aff"]
      });
    }, 300);
    setTimeout(function () {
      confetti({
        particleCount: 80,
        spread: 70,
        angle: 120,
        origin: { x: 1, y: 0.5 },
        colors: ["#ffd8be", "#fff5c3", "#b8e6ff", "#ffe45d"]
      });
    }, 500);
    setTimeout(function () {
      confetti({
        particleCount: 60,
        spread: 50,
        startVelocity: 20,
        origin: { x: 0.5, y: 0.1 },
        colors: ["#ff6b8a", "#c1f0db", "#e0c3fc", "#ffe45d"]
      });
    }, 900);
  });

  // --- DOODLE FACES FOR AVATARS ---
  var faces = [
    { eyes: "round", mouth: "smile" },
    { eyes: "dot",   mouth: "open" },
    { eyes: "happy", mouth: "grin" },
    { eyes: "round", mouth: "cat" },
    { eyes: "dot",   mouth: "smile" },
    { eyes: "happy", mouth: "open" },
    { eyes: "round", mouth: "grin" },
    { eyes: "dot",   mouth: "cat" },
    { eyes: "happy", mouth: "smile" },
    { eyes: "round", mouth: "open" },
    { eyes: "dot",   mouth: "grin" },
    { eyes: "happy", mouth: "cat" },
    { eyes: "round", mouth: "smile" }
  ];

  function drawEyes(type) {
    switch (type) {
      case "round":
        return '<circle cx="20" cy="24" r="3.5" fill="#222"/><circle cx="36" cy="24" r="3.5" fill="#222"/><circle cx="21.5" cy="23" r="1.2" fill="#fff"/><circle cx="37.5" cy="23" r="1.2" fill="#fff"/>';
      case "dot":
        return '<circle cx="20" cy="25" r="2.5" fill="#222"/><circle cx="36" cy="25" r="2.5" fill="#222"/>';
      case "happy":
        return '<path d="M16 24Q20 20 24 24" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M32 24Q36 20 40 24" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
      default:
        return '<circle cx="20" cy="24" r="3" fill="#222"/><circle cx="36" cy="24" r="3" fill="#222"/>';
    }
  }

  function drawMouth(type) {
    switch (type) {
      case "smile":
        return '<path d="M22 34Q28 40 34 34" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/>';
      case "open":
        return '<ellipse cx="28" cy="35" rx="5" ry="4" fill="#222"/>';
      case "grin":
        return '<path d="M20 33Q28 42 36 33" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/><line x1="24" y1="35" x2="32" y2="35" stroke="#222" stroke-width="1" opacity="0.3"/>';
      case "cat":
        return '<path d="M22 34L28 37L34 34" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      default:
        return '<path d="M22 34Q28 40 34 34" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/>';
    }
  }

  var cheekColors = ["#ffb5c5", "#d4aaff", "#a5dbb5", "#ffd6a5", "#a5d4f5", "#ffa5c5"];

  document.querySelectorAll(".avatar").forEach(function (avatar, idx) {
    var face = faces[idx % faces.length];
    var cheekColor = cheekColors[idx % cheekColors.length];
    var svg = '<svg viewBox="0 0 56 56" fill="none" style="width:100%;height:100%">';
    svg += drawEyes(face.eyes);
    svg += drawMouth(face.mouth);
    svg += '<circle cx="13" cy="32" r="4" fill="' + cheekColor + '" opacity="0.45"/>';
    svg += '<circle cx="43" cy="32" r="4" fill="' + cheekColor + '" opacity="0.45"/>';
    svg += "</svg>";
    avatar.innerHTML = svg;
  });

  // --- GIFT INTERACTION ---
  function revealGifts() {
    if (giftsRevealed) return;
    giftsRevealed = true;

    giftBox.style.animation = "none";

    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.55 },
      colors: ["#ffd6e0", "#e0c3fc", "#c1f0db", "#ffd8be", "#fff5c3", "#b8e6ff", "#ff9eb5", "#ffe45d"]
    });

    envelopesContainer.classList.remove("hidden");

    // Stagger-animate cards into view (bottom → middle → top)
    var cards = Array.from(envelopeStack.querySelectorAll(".envelope-card"));
    cards.forEach(function (card) {
      card.style.opacity = "0";
    });

    // Animate in (bottom card first so it appears, then middle, then top)
    cards.slice().reverse().forEach(function (card, i) {
      setTimeout(function () {
        card.style.transition = "opacity 0.45s ease";
        card.style.opacity = "1";
      }, 200 + i * 180);
    });

    // After all are in, clear inline transitions so CSS class transitions take over
    setTimeout(function () {
      cards.forEach(function (card) {
        card.style.transition = "";
        card.style.opacity = "";
      });
    }, 200 + cards.length * 180 + 500);
  }

  giftBox.addEventListener("click", revealGifts);
  giftBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      revealGifts();
    }
  });

  // --- CLOSE ENVELOPES ---
  closeBtn.addEventListener("click", function () {
    var cards = envelopeStack.querySelectorAll(".envelope-card");
    cards.forEach(function (card) {
      card.classList.remove("flipped", "raised");
    });

    envelopesContainer.style.transition = "opacity 0.4s ease";
    envelopesContainer.style.opacity = "0";
    setTimeout(function () {
      envelopesContainer.classList.add("hidden");
      envelopesContainer.style.opacity = "";
      envelopesContainer.style.transition = "";
      giftsRevealed = false;
      giftBox.style.animation = "";
    }, 420);
  });

  // --- ENVELOPE CLICK: raise the card, then flip to reveal content ---
  //
  // Interaction sequence per envelope:
  //  1st click  → card raises up out of the stack (slides up + slight rotate)
  //  2nd click  → card flips to show its content
  //  3rd click  → card flips back, then settles back into stack
  //
  // This way envelopes stay stacked but each one can be individually opened.

  var cards = [
    document.getElementById("env1"), // top
    document.getElementById("env2"), // middle
    document.getElementById("env3")  // bottom
  ];

  cards.forEach(function (card) {
    var state = 0; // 0=stacked, 1=raised, 2=flipped

    card.addEventListener("click", function (e) {
      if (state === 0) {
        // Raise the card up
        card.classList.add("raised");
        state = 1;
      } else if (state === 1) {
        // Flip to reveal
        card.classList.add("flipped");
        state = 2;
      } else {
        // Flip back, then lower
        card.classList.remove("flipped");
        setTimeout(function () {
          card.classList.remove("raised");
        }, 400);
        state = 0;
      }
    });
  });
})();
