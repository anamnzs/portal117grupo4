// =====================================================================
// Celular desmontado - JavaScript puro
// Monta a ilustração interativa dentro da página da pesquisa, logo
// depois da lista "Cinco minerais, um aparelho". 
// =====================================================================

(function () {
  "use strict";

  // ================== DADOS ==================
  const minerais = [
    {
      id: "bateria",
      componente: "Bateria",
      mineral: "Cobalto",
      cor: "#2650D9",
      pais: "Congo: mais de 70% do cobalto do mundo vem de lá.",
      uso: "Vai na bateria do celular e, cada vez mais, nas baterias de carros elétricos.",
      problema: "Um estudo do Departamento do Trabalho dos EUA estimou trabalho forçado no cobalto do sul do Congo, com salários de até 2 dólares por dia, e 63% dos trabalhadores já se feriram ou adoeceram. A Anistia relatou seguranças que batem em crianças nas minas. Na refinação, o cobalto de várias fontes é misturado, e o produzido com trabalho infantil deixa de poder ser distinguido do limpo."
    },
    {
      id: "placa",
      componente: "Placa-mãe",
      mineral: "Estanho",
      cor: "#56606B",
      pais: "Grandes produtores incluem China, Indonésia e Myanmar; no leste do Congo, o estanho também é mineral de conflito.",
      uso: "Solda as peças da placa.",
      problema: "O estanho faz parte dos minerais de conflito (3TG: estanho, tântalo, tungstênio e ouro), cuja venda financia grupos armados. Como a origem é quase impossível de rastrear, as próprias empresas admitem que é difícil garantir que nenhuma peça esteja contaminada."
    },
    {
      id: "conectores",
      componente: "Conectores",
      mineral: "Ouro",
      cor: "#946A00",
      pais: "Vem de vários países. Nas reportagens aparecem o Sudão, o Sahel, o Brasil, o Peru e a Venezuela.",
      uso: "Fica nos conectores da placa.",
      problema: "A Verité estima que cerca de um quinto do ouro exportado pelo Peru é ilegal e que o trabalho forçado extrai grande parte do metal que vai para celulares. No Brasil, o garimpo usa mercúrio, que contamina rios, e ao menos 570 crianças yanomami morreram de doenças evitáveis entre 2019 e 2022, segundo a Unicef e a Hutukara."
    },
    {
      id: "capacitor",
      componente: "Capacitor",
      mineral: "Tântalo",
      cor: "#7B3FB0",
      pais: "Congo e Ruanda: 67% do tântalo vêm de lá, sobretudo do coltan, o minério de onde ele é extraído.",
      uso: "Vai nos capacitores que armazenam energia.",
      problema: "O coltan só virou negócio global depois que o preço disparou, em 2000. No leste do Congo, grupos armados controlam áreas de mineração, e peritos da ONU dizem que o M23 recebeu apoio de Ruanda, que afirma agir em autodefesa."
    },
    {
      id: "motor",
      componente: "Motor de vibração",
      mineral: "Tungstênio",
      cor: "#1F7A6B",
      pais: "A China é de longe a maior produtora; o tungstênio também aparece entre os minerais de conflito do leste africano.",
      uso: "Está no motor da vibração, que faz o celular tremer.",
      problema: "O tungstênio é um dos minerais de conflito (3TG), cuja venda financia grupos armados. Há leis dos EUA e da União Europeia (em vigor desde 2021) que obrigam as empresas a declarar o uso desses minerais, mas rastrear cada peça continua difícil."
    }
  ];

  const ancoras = {
    bateria:    { x: 390, y: 425 },
    placa:      { x: 390, y: 130 },
    conectores: { x: 370, y: 565 },
    capacitor:  { x: 390, y: 248 },
    motor:      { x: 243, y: 285 }
  };

  // ================== ESTILOS ==================
  const css = `
    #celular-desmontado { margin: 32px 0; font-family: inherit; color: inherit; }
    #celular-desmontado * { box-sizing: border-box; }
    #celular-desmontado .cd-intro { margin: 0 0 16px; max-width: 62ch; }
    #celular-desmontado .cd-grade {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
      align-items: start;
    }
    #celular-desmontado .cd-palco {
      background: #FBF8F2;
      border: 1px solid #CFC6B5;
      border-radius: 14px;
      padding: 12px;
    }
    #celular-desmontado svg { display: block; width: 100%; height: auto; max-height: 70vh; }
    #celular-desmontado .corpo { fill: none; stroke: #B9AF9C; stroke-width: 2; stroke-dasharray: 6 6; }
    #celular-desmontado .parte { cursor: pointer; outline: none; }
    #celular-desmontado .parte .forma { fill: #fff; stroke: #2B2B2B; stroke-width: 2; transition: fill .2s, stroke .2s; }
    #celular-desmontado .parte .detalhe { fill: none; stroke: #2B2B2B; stroke-width: 1.5; opacity: .45; }
    #celular-desmontado .parte .cheio { fill: #2B2B2B; stroke: none; opacity: .35; }
    #celular-desmontado .parte:hover .forma,
    #celular-desmontado .parte:focus-visible .forma { stroke-width: 3.5; }
    #celular-desmontado .parte:focus-visible .rotulo { text-decoration: underline; }
    #celular-desmontado .parte.ativa .forma { fill: color-mix(in srgb, var(--cor) 24%, #fff); stroke: var(--cor); stroke-width: 3.5; }
    #celular-desmontado .parte.ativa .cheio { fill: var(--cor); opacity: .8; }
    #celular-desmontado .parte.ativa .detalhe { stroke: var(--cor); opacity: .9; }
    #celular-desmontado .linha { stroke: #B9AF9C; stroke-width: 1.5; }
    #celular-desmontado .parte.ativa .linha { stroke: var(--cor); }
    #celular-desmontado .ponto { fill: #FBF8F2; stroke: #2B2B2B; stroke-width: 2; }
    #celular-desmontado .parte.visitada .ponto { fill: #2B2B2B; }
    #celular-desmontado .parte.ativa .ponto { fill: var(--cor); stroke: var(--cor); }
    #celular-desmontado .rotulo { font-family: inherit; font-size: 15px; font-weight: 600; fill: #2B2B2B; }

    #celular-desmontado .cd-painel {
      background: #FBF8F2;
      border: 1px solid #CFC6B5;
      border-left: 8px solid #B9AF9C;
      border-radius: 14px;
      padding: 22px;
      min-height: 300px;
      transition: border-left-color .25s;
    }
    #celular-desmontado .cd-peca { margin: 0; color: #5B5548; }
    #celular-desmontado .cd-mineral {
      margin: 2px 0 16px;
      font-family: "Merriweather", Georgia, serif;
      font-weight: 900;
      font-size: clamp(1.7rem, 4vw, 2.4rem);
      line-height: 1.15;
    }
    #celular-desmontado .cd-campo { margin-top: 14px; }
    #celular-desmontado .cd-campo-titulo { margin: 0; font-weight: 700; }
    #celular-desmontado .cd-campo-texto { margin: 2px 0 0; }
    #celular-desmontado .cd-vazio-titulo { margin: 0 0 6px; font-family: "Merriweather", Georgia, serif; font-weight: 700; font-size: 1.2rem; }
    #celular-desmontado .cd-vazio p { margin: 0; color: #5B5548; }
    #celular-desmontado .cd-progresso { margin: 20px 0 0; padding-top: 12px; border-top: 1px solid #CFC6B5; font-size: .92rem; color: #5B5548; }
    @media (prefers-reduced-motion: reduce) { #celular-desmontado * { transition: none !important; } }
  `;

  // ================== AUXILIARES ==================
  const NS_SVG = "http://www.w3.org/2000/svg";


  function h(tag, atributos, filhos) {
    const no = document.createElement(tag);
    for (const nome in atributos || {}) no.setAttribute(nome, atributos[nome]);
    (filhos || []).forEach(f => no.append(f));
    return no;
  }

  function s(tag, atributos, pai) {
    const no = document.createElementNS(NS_SVG, tag);
    for (const nome in atributos || {}) no.setAttribute(nome, atributos[nome]);
    if (pai) pai.appendChild(no);
    return no;
  }

  function esc(texto) {
    const d = document.createElement("div");
    d.textContent = texto;
    return d.innerHTML;
  }

  function acharLugar() {
    let host = document.getElementById("celular-desmontado");
    if (host) return host;

    host = document.createElement("section");
    host.id = "celular-desmontado";

    const lista = document.querySelector("ul.minerais");
    if (lista) {
      lista.after(host);
    } else {
      (document.querySelector("main") || document.body).appendChild(host);
    }
    return host;
  }

  // ================== INICIALIZAÇÃO ==================
  function iniciar() {
    const host = acharLugar();
    if (host.dataset.iniciado) return;
    host.dataset.iniciado = "sim";

    const estilo = document.createElement("style");
    estilo.textContent = css;
    document.head.appendChild(estilo);

    const svg = s("svg", {
      viewBox: "70 0 520 640",
      role: "group",
      "aria-label": "Ilustração de um celular desmontado com cinco peças clicáveis"
    });

    const painel = h("div", { class: "cd-painel", "aria-live": "polite" });

    host.append(
      h("h3", {}, ["Celular desmontado"]),
      h("p", { class: "cd-intro" }, ["Clique em cada peça para ver o mineral que ela usa, de onde ele vem e qual problema está ligado a ele."]),
      h("div", { class: "cd-grade" }, [
        h("div", { class: "cd-palco" }, [svg]),
        painel
      ])
    );
    
    s("rect", { class: "corpo", x: 140, y: 20, width: 280, height: 600, rx: 38 }, svg);

    const desenhos = {
      bateria(g) {
        s("rect", { class: "forma", x: 170, y: 330, width: 220, height: 190, rx: 14 }, g);
        s("rect", { class: "forma", x: 255, y: 320, width: 50, height: 12, rx: 3 }, g);
        [380, 425, 470].forEach(y => s("line", { class: "detalhe", x1: 195, x2: 365, y1: y, y2: y }, g));
      },
      placa(g) {
        s("rect", { class: "forma", x: 170, y: 50, width: 220, height: 160, rx: 10 }, g);
        s("rect", { class: "detalhe", x: 190, y: 70, width: 70, height: 60, rx: 4 }, g);
        s("rect", { class: "detalhe", x: 275, y: 70, width: 40, height: 40, rx: 4 }, g);
        s("rect", { class: "detalhe", x: 330, y: 70, width: 40, height: 28, rx: 4 }, g);
        s("rect", { class: "detalhe", x: 190, y: 148, width: 40, height: 40, rx: 4 }, g);
        s("path", { class: "detalhe", d: "M260 100H275M315 90H330M230 168H370M300 110V168" }, g);
      },
      conectores(g) {
        s("rect", { class: "forma", x: 190, y: 540, width: 180, height: 50, rx: 6 }, g);
        for (let i = 0; i < 8; i++) {
          s("rect", { class: "cheio", x: 204 + i * 20, y: 552, width: 10, height: 26, rx: 2 }, g);
        }
      },
      capacitor(g) {
        s("rect", { class: "forma", x: 310, y: 228, width: 80, height: 40, rx: 5 }, g);
        s("rect", { class: "cheio", x: 310, y: 228, width: 14, height: 40, rx: 3 }, g);
      },
      motor(g) {
        s("circle", { class: "forma", cx: 215, cy: 285, r: 28 }, g);
        s("circle", { class: "detalhe", cx: 215, cy: 285, r: 8 }, g);
        s("path", { class: "cheio", d: "M193 285a22 22 0 0 1 44 0z" }, g);
      }
    };

    const visitadas = new Set();

    function textoProgresso() {
      const total = minerais.length;
      return visitadas.size === total
        ? "Você explorou as " + total + " peças."
        : visitadas.size + " de " + total + " peças exploradas";
    }

    function mostrarVazio() {
      painel.style.borderLeftColor = "";
      painel.innerHTML =
        '<div class="cd-vazio">' +
          '<p class="cd-vazio-titulo">Escolha uma peça</p>' +
          "<p>Clique em qualquer parte do celular para ver o mineral que ela usa.</p>" +
        "</div>" +
        '<p class="cd-progresso">' + textoProgresso() + "</p>";
    }

    function campo(titulo, texto) {
      return '<div class="cd-campo">' +
        '<p class="cd-campo-titulo">' + titulo + "</p>" +
        '<p class="cd-campo-texto">' + esc(texto) + "</p>" +
      "</div>";
    }

    function selecionar(id) {
      const item = minerais.find(m => m.id === id);
      if (!item) return;

      visitadas.add(id);

      svg.querySelectorAll(".parte").forEach(g => {
        const ehEsta = g.dataset.id === id;
        g.classList.toggle("ativa", ehEsta);
        g.classList.toggle("visitada", visitadas.has(g.dataset.id));
        g.setAttribute("aria-pressed", String(ehEsta));
      });

      painel.style.borderLeftColor = item.cor;
      painel.innerHTML =
        '<p class="cd-peca">' + esc(item.componente) + "</p>" +
        '<p class="cd-mineral" style="color:' + item.cor + '">' + esc(item.mineral) + "</p>" +
        campo("De onde vem", item.pais) +
        campo("Para que serve na peça", item.uso) +
        campo("O problema", item.problema) +
        '<p class="cd-progresso">' + textoProgresso() + "</p>";
    }

    minerais.forEach(item => {
      const g = s("g", {
        class: "parte",
        tabindex: 0,
        role: "button",
        "aria-pressed": "false",
        "aria-label": item.componente + ": ver mineral, país e problema",
        "data-id": item.id
      }, svg);
      g.style.setProperty("--cor", item.cor);

      const a = ancoras[item.id];
      s("line", { class: "linha", x1: a.x, y1: a.y, x2: 440, y2: a.y }, g);
      s("circle", { class: "ponto", cx: 440, cy: a.y, r: 6 }, g);

      desenhos[item.id](g);

      const texto = s("text", { class: "rotulo", x: 454, y: a.y + 5 }, g);
      texto.textContent = item.componente;

      g.addEventListener("click", () => selecionar(item.id));
      g.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selecionar(item.id);
        }
      });
    });

    mostrarVazio();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
