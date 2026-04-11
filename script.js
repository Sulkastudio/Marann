(function () {
  // --- PASSWORD GATE ---
  var PASSWORDS = ["diplodocus", "dinosaure"];
  var splash = document.getElementById("splashScreen");
  var splashForm = document.getElementById("splashForm");
  var splashError = document.getElementById("splashError");

  // Build the input dynamically so password managers never see type="password" in the DOM
  var splashInput = document.createElement("input");
  splashInput.type = "text";
  splashInput.className = "splash-input";
  splashInput.placeholder = "Mot de passe\u2026";
  splashInput.setAttribute("aria-label", "Mot de passe");
  splashInput.setAttribute("autocomplete", "off");
  splashInput.setAttribute("autocorrect", "off");
  splashInput.setAttribute("autocapitalize", "none");
  splashInput.setAttribute("spellcheck", "false");
  splashInput.setAttribute("data-lpignore", "true");      // LastPass
  splashInput.setAttribute("data-1p-ignore", "true");     // 1Password
  splashInput.setAttribute("data-bwignore", "true");      // Bitwarden
  document.getElementById("splashInputWrap").appendChild(splashInput);
  splashInput.focus();

  function dismissSplash() {
    splash.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    splash.style.opacity = "0";
    splash.style.transform = "scale(1.04)";
    revealStickers();
    setTimeout(function () {
      splash.classList.add("hidden");
      triggerLoadConfetti();
    }, 560);
  }

  splashForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (PASSWORDS.indexOf(splashInput.value.trim().toLowerCase()) !== -1) {
      splashError.textContent = "";
      dismissSplash();
    } else {
      splashError.textContent = "Mot de passe incorrect";
      splashError.classList.remove("shake");
      splashInput.value = "";
      void splashError.offsetWidth; // reflow to restart animation
      splashError.classList.add("shake");
    }
  });

  // --- MAIN PAGE LOGIC ---
  const giftBox = document.getElementById("giftBox");
  const giftItems = document.getElementById("giftItems");
  const overlay = document.getElementById("giftModalOverlay");
  const modal = document.getElementById("giftModal");

  let giftsRevealed = false;

  function revealStickers() {
    document.querySelectorAll(".sticker").forEach(function (s, i) {
      setTimeout(function () {
        s.classList.add("visible");
      }, i * 100);
    });
  }

  // --- CONFETTI (fired after splash is dismissed) ---
  function triggerLoadConfetti() {
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
  }

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

  // --- GIFT TOGGLE ---
  function revealGifts() {
    if (giftsRevealed) {
      hideGifts();
      return;
    }
    giftsRevealed = true;
    giftBox.style.animation = "none";

    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.55 },
      colors: ["#ffd6e0", "#e0c3fc", "#c1f0db", "#ffd8be", "#fff5c3", "#b8e6ff", "#ff9eb5", "#ffe45d"]
    });

    giftItems.classList.remove("hidden");
    var items = giftItems.querySelectorAll(".gift-item");
    items.forEach(function (item) { item.style.opacity = "0"; });
    items.forEach(function (item, i) {
      setTimeout(function () {
        item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        item.style.opacity = "1";
      }, 100 + i * 140);
    });
    setTimeout(function () {
      items.forEach(function (item) {
        item.style.transition = "";
        item.style.opacity = "";
      });
    }, 100 + items.length * 140 + 400);
  }

  function hideGifts() {
    closeModal();
    giftItems.style.transition = "opacity 0.4s ease";
    giftItems.style.opacity = "0";
    setTimeout(function () {
      giftItems.classList.add("hidden");
      giftItems.style.opacity = "";
      giftItems.style.transition = "";
      giftsRevealed = false;
      giftBox.style.animation = "";
    }, 420);
  }

  giftBox.addEventListener("click", revealGifts);
  giftBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      revealGifts();
    }
  });

  // --- MODAL LOGIC ---
  var activeModal = null;

  function openModal(contentId) {
    // Hide all modal contents
    modal.querySelectorAll(".modal-content").forEach(function (el) {
      el.classList.add("hidden");
    });

    var content = document.getElementById(contentId);
    if (!content) return;
    content.classList.remove("hidden");
    activeModal = contentId;

    overlay.classList.remove("hidden");

    // Reset animation by cloning overlay (re-trigger animation)
    overlay.style.animation = "none";
    overlay.offsetHeight; // reflow
    overlay.style.animation = "";

    // Specific init per modal
    if (contentId === "modalCard") {
      initCardModal();
    } else if (contentId === "modalTicket") {
      initTicketModal();
    }
  }

  function closeModal() {
    if (!activeModal) return;
    overlay.classList.add("hidden");

    // Reset card state
    var scene = document.getElementById("modalCardScene");
    if (scene) scene.classList.remove("opened");
    var heartsContainer = document.getElementById("cardHeartsContainer");
    if (heartsContainer) heartsContainer.innerHTML = "";

    // Reset ticket split
    var ticketWrap = document.querySelector(".concert-ticket-wrap");
    if (ticketWrap) ticketWrap.classList.remove("split");

    activeModal = null;
  }

  // Close on overlay background click (not on modal itself)
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // --- ITEM BUTTONS ---
  document.getElementById("itemCard").addEventListener("click", function () {
    openModal("modalCard");
  });
  document.getElementById("itemTicket").addEventListener("click", function () {
    openModal("modalTicket");
  });
  document.getElementById("itemMoney").addEventListener("click", function () {
    openModal("modalMoney");
  });

  // --- BIRTHDAY CARD MODAL ---
  function initCardModal() {
    var scene = document.getElementById("modalCardScene");
    scene.classList.remove("opened");
    var heartsContainer = document.getElementById("cardHeartsContainer");
    heartsContainer.innerHTML = "";

    // Slide the card out after a short delay
    setTimeout(function () {
      scene.classList.add("opened");
      launchHearts(heartsContainer);
    }, 300);
  }

  function launchHearts(container) {
    var heartChars = ["♥", "♡", "❤", "💕", "💖"];
    var leftPositions = ["12%", "25%", "38%", "50%", "62%", "74%", "84%", "20%"];
    var colors = ["#ff6b8a", "#ff9eb5", "#e0c3fc", "#ffd6e0", "#c1f0db", "#ffe45d"];

    leftPositions.forEach(function (leftPos, i) {
      setTimeout(function () {
        var heart = document.createElement("span");
        heart.className = "flying-heart";
        heart.textContent = heartChars[i % heartChars.length];
        var rot = (Math.random() * 50 - 25) + "deg";
        heart.style.cssText =
          "left:" + leftPos + ";" +
          "color:" + colors[i % colors.length] + ";" +
          "--rot:" + rot + ";";
        container.appendChild(heart);
        setTimeout(function () {
          if (heart.parentNode) heart.parentNode.removeChild(heart);
        }, 1900);
      }, i * 110);
    });
  }

  // --- CONCERT TICKET MODAL ---
  function initTicketModal() {
    var ticketWrap = document.querySelector(".concert-ticket-wrap");
    ticketWrap.classList.remove("split");
    // Animate the split after a short delay
    setTimeout(function () {
      ticketWrap.classList.add("split");
    }, 250);
  }

})();
