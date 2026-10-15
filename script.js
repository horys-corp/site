"use strict";

// Navegação utilizável por teclado e leitores de tela.
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
if (menuToggle && mobileMenu) {
  function closeMenu(returnFocus = false) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    mobileMenu.hidden = true;
    if (returnFocus) menuToggle.focus();
  }
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Abrir menu" : "Fechar menu");
    mobileMenu.hidden = expanded;
  });
  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileMenu.hidden) closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!mobileMenu.hidden && !event.target.closest(".site-header")) closeMenu();
  });
  window.matchMedia("(min-width: 601px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

// O visitante escolhe a criação exibida no terminal, sem rastreamento.
const terminalModes = {
  sistemas: { caption: "MENOS COMPLEXIDADE. MAIS POSSIBILIDADES.", announcement: "Modo Sistemas: software sob medida para o seu negócio." },
  apps: { caption: "BOAS IDEIAS QUE CABEM NO BOLSO.", announcement: "Modo Apps: aplicativos para pessoas e empresas." },
  games: { caption: "SEU PRÓXIMO UNIVERSO COMEÇA AQUI.", announcement: "Modo Games: universos e experiências para jogar." },
};
const terminalScreen = document.querySelector(".crt-screen");
document.querySelectorAll("[data-terminal-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.terminalMode;
    if (!terminalScreen || !terminalModes[mode]) return;
    terminalScreen.dataset.mode = mode;
    document.querySelectorAll("[data-terminal-mode]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelectorAll("[data-icon]").forEach((icon) => icon.toggleAttribute("hidden", icon.dataset.icon !== mode));
    document.getElementById("terminal-word").textContent = mode;
    document.getElementById("terminal-caption").textContent = terminalModes[mode].caption;
    document.getElementById("terminal-announcement").textContent = terminalModes[mode].announcement;
  });
});

// Entrada em sequência, mantendo o conteúdo visível sem JavaScript.
const creationSection = document.querySelector(".creation-section");
if (creationSection) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealItems = creationSection.querySelectorAll(".section-heading, .creation-card");
  let revealObserver;

  const revealAll = () => {
    revealItems.forEach((item) => {
      item.classList.remove("reveal-pending");
      item.classList.add("is-revealed");
    });
    revealObserver?.disconnect();
  };

  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", (Math.max(0, index - 1) * 90) + "ms");
      item.classList.add("reveal-pending");
      revealObserver.observe(item);
    });
  }
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) revealAll();
  });

  // Uma atualização por frame; telas de toque e movimento reduzido ficam estáticos.
  const pointerEffects = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
  );
  creationSection.querySelectorAll(".creation-card").forEach((card) => {
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resetCard = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      card.classList.remove("is-pointing");
      ["--pointer-x", "--pointer-y", "--rotate-x", "--rotate-y"].forEach(
        (property) => card.style.removeProperty(property)
      );
    };

    card.addEventListener("pointermove", (event) => {
      if (!pointerEffects.matches || event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const bounds = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (pointerX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (pointerY - bounds.top) / bounds.height));
        card.classList.add("is-pointing");
        card.style.setProperty("--pointer-x", (x * 100).toFixed(1) + "%");
        card.style.setProperty("--pointer-y", (y * 100).toFixed(1) + "%");
        card.style.setProperty("--rotate-x", ((0.5 - y) * 5).toFixed(2) + "deg");
        card.style.setProperty("--rotate-y", ((x - 0.5) * 5).toFixed(2) + "deg");
      });
    }, { passive: true });
    card.addEventListener("pointerleave", resetCard);
    card.addEventListener("pointercancel", resetCard);
    pointerEffects.addEventListener("change", resetCard);
  });
}
