document.addEventListener("DOMContentLoaded", () => {
  const linksMenu = document.querySelectorAll('.menu a[href^="#"]');
  const secoes = document.querySelectorAll("main section[id]");
  const cards = document.querySelectorAll(".card");

  /* Scroll suave no menu */
  linksMenu.forEach((link) => {
    link.addEventListener("click", (event) => {
      const destino = link.getAttribute("href");

      if (!destino || !destino.startsWith("#")) return;

      const secao = document.querySelector(destino);

      if (secao) {
        event.preventDefault();
        secao.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* Destacar link ativo no menu */
  function atualizarLinkAtivo() {
    let secaoAtual = "";

    secoes.forEach((secao) => {
      const topo = window.scrollY;
      const offset = secao.offsetTop - 140;
      const altura = secao.offsetHeight;

      if (topo >= offset && topo < offset + altura) {
        secaoAtual = secao.getAttribute("id");
      }
    });

    linksMenu.forEach((link) => {
      link.classList.remove("ativo");

      const href = link.getAttribute("href");
      if (href === `#${secaoAtual}`) {
        link.classList.add("ativo");
      }
    });
  }

  window.addEventListener("scroll", atualizarLinkAtivo);
  atualizarLinkAtivo();

  /* Animação ao aparecer na tela */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("mostrar");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  cards.forEach((card) => {
    card.classList.add("esconder");
    observer.observe(card);
  });
});

