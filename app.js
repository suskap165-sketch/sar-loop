/* SAR LOOP — interaktywna mapa koncepcji
   Koncepcja: Paweł Suska — System of Reality Authorization.
   Aplikacja demonstracyjna: nie jest wdrożeniem systemu weryfikacji. */

/* ---------- warstwa I: filary zaufania ---------- */
const PILLARS = [
  {
    key: "BODY",
    title: "BODY",
    text: "Ciało jako źródło zaufania (Root of Trust). Zamiast hasła czy zdjęcia twarzy — sygnał fizjologiczny, np. elektrokardiogram. W koncepcji autora to jedyny element niemożliwy do podrobienia."
  },
  {
    key: "COMPUTE",
    title: "COMPUTE",
    text: "Moc obliczeniowa jako warunek autoryzacji. Kto kontroluje infrastrukturę i zaawansowane układy, ten rozstrzyga, co w sieci zostanie uznane za autentyczne."
  },
  {
    key: "TWIN",
    title: "TWIN",
    text: "Cyfrowy bliźniak powiązany z konkretną, zweryfikowaną osobą. Bez tego powiązania awatar jest tylko klonem — czyli deepfake'iem."
  }
];

/* ---------- warstwa II: sześć kroków pętli ---------- */
const STEPS = [
  {
    n: 1,
    name: "SCAN",
    role: "Odczyt",
    body: "Wejście do pętli. System zbiera sygnał źródłowy: dane biometryczne, kontekst urządzenia, żądanie i jego zakres.",
    input: "Sygnał z warstwy BODY oraz żądanie użytkownika lub agenta.",
    output: "Surowe dane wejściowe opatrzone znacznikiem pochodzenia i czasu.",
    gate: "Bez ważnego odczytu pętla nie startuje."
  },
  {
    n: 2,
    name: "ANALYZE",
    role: "Ocena",
    body: "Warstwa COMPUTE przetwarza odczyt: porównuje sygnał z wzorcem, ocenia spójność i ryzyko.",
    input: "Dane z etapu SCAN.",
    output: "Ocena zgodności i poziomu ryzyka.",
    gate: "Rozbieżność powyżej progu kieruje żądanie do ponownej weryfikacji."
  },
  {
    n: 3,
    name: "REALITY CHECK",
    role: "Konfrontacja",
    body: "Zestawienie tego, co cyfrowe, z tym, co fizyczne — czy żądanie odpowiada realnej osobie, miejscu i uprawnieniu.",
    input: "Ocena z etapu ANALYZE oraz dane referencyjne.",
    output: "Potwierdzenie albo odrzucenie zgodności ze stanem faktycznym.",
    gate: "Tu wychodzą podmiany tożsamości i treści syntetyczne."
  },
  {
    n: 4,
    name: "LEGITIMIZE",
    role: "Bramka ludzka",
    body: "Kluczowy punkt koncepcji: autoryzacja nie jest wyłącznie techniczna. Człowiek zatwierdza zakres i konsekwencje działania.",
    input: "Potwierdzony wynik kontroli rzeczywistości.",
    output: "Zgoda na działanie wraz z zakresem uprawnień i odpowiedzialnością.",
    gate: "Bez tej zgody agent nie działa. To brama human-centric."
  },
  {
    n: 5,
    name: "OPERATE",
    role: "Działanie",
    body: "Wykonanie autoryzowanej czynności: transakcja, decyzja, wpis, ruch maszyny — w granicach nadanych uprawnień.",
    input: "Zgoda z etapu LEGITIMIZE.",
    output: "Zmiana w systemach cyfrowych lub w świecie fizycznym.",
    gate: "Działanie poza zakresem uprawnień jest z definicji nieautoryzowane."
  },
  {
    n: 6,
    name: "PROVE & FEEDBACK",
    role: "Dowód zwrotny",
    body: "Zapis dowodu wykonania i sprzężenie zwrotne. Wynik wraca na początek pętli jako materiał do kolejnej weryfikacji.",
    input: "Skutek działania z etapu OPERATE.",
    output: "Zapisany dowód oraz zaktualizowany wzorzec zaufania.",
    gate: "Brak dowodu zrywa ciągłość pętli i podważa kolejne autoryzacje."
  }
];

/* ---------- symulator: warunki autoryzacji ---------- */
const CONDITIONS = [
  { key: "body", label: "BODY / biometria", hint: "Sygnał fizjologiczny zgadza się z zarejestrowanym wzorcem.", weight: 30, on: true, blocks: "Odrzucenie na etapie SCAN — brak źródła zaufania." },
  { key: "compute", label: "COMPUTE / integralność", hint: "Infrastruktura obliczeniowa działa zgodnie z oczekiwanym stanem.", weight: 25, on: true, blocks: "Odrzucenie na etapie ANALYZE — ocena ryzyka niewiarygodna." },
  { key: "twin", label: "TWIN / powiązanie", hint: "Cyfrowy bliźniak jest trwale powiązany z fizyczną osobą.", weight: 20, on: true, blocks: "Odrzucenie na etapie REALITY CHECK — klon bez powiązania to deepfake." },
  { key: "consent", label: "LEGITIMIZE / zgoda człowieka", hint: "Człowiek zatwierdził zakres i skutki działania.", weight: 25, on: true, blocks: "Zatrzymanie na bramce LEGITIMIZE — działanie wymaga zgody człowieka." }
];

/* ---------- rendering: pętla ---------- */
const nodesEl = document.getElementById("nodes");
const detailEl = document.getElementById("loopDetail");

function polar(index, total, radiusPct) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + Math.cos(angle) * radiusPct,
    y: 50 + Math.sin(angle) * radiusPct
  };
}

STEPS.forEach((step, i) => {
  const link = document.createElement("div");
  link.className = "node";
  link.dataset.key = step.name;
  link.tabIndex = 0;
  const pos = polar(i, STEPS.length, 36);
  link.style.left = pos.x + "%";
  link.style.top = pos.y + "%";
  link.innerHTML =
    '<span class="node-index">' + String(step.n).padStart(2, "0") + "</span>" +
    '<span class="node-name">' + step.name + "</span>" +
    '<span class="node-gate">' + step.role + "</span>";
  link.addEventListener("click", () => selectStep(step, link));
  link.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectStep(step, link); }
  });
  nodesEl.appendChild(link);
});

function selectStep(step, el) {
  document.querySelectorAll(".node").forEach((n) => n.classList.remove("is-active"));
  el.classList.add("is-active");
  detailEl.innerHTML =
    "<h3>" + step.name + "</h3>" +
    '<p class="role">Krok ' + step.n + " z 6 &middot; " + step.role + "</p>" +
    '<p class="body">' + step.body + "</p>" +
    "<dl>" +
      "<dt>Wejście</dt><dd>" + step.input + "</dd>" +
      "<dt>Wyjście</dt><dd>" + step.output + "</dd>" +
      "<dt>Warunek przejścia</dt><dd>" + step.gate + "</dd>" +
    "</dl>";
}

/* ---------- rendering: filary ---------- */
const pillarsEl = document.getElementById("pillars");
PILLARS.forEach((p, i) => {
  const card = document.createElement("article");
  card.className = "pillar";
  card.innerHTML =
    '<span class="num">' + String(i + 1).padStart(2, "0") + "</span>" +
    "<h3>" + p.title + "</h3>" +
    "<p>" + p.text + "</p>";
  pillarsEl.appendChild(card);
});

/* ---------- rendering i logika: symulator ---------- */
const controlsEl = document.getElementById("simControls");
const listEl = document.getElementById("checklist");
const scoreEl = document.getElementById("simScore");
const fillEl = document.getElementById("gaugeFill");
const verdictEl = document.getElementById("verdict");

CONDITIONS.forEach((c) => {
  const btn = document.createElement("button");
  btn.className = "cond" + (c.on ? " is-on" : "");
  btn.type = "button";
  btn.dataset.key = c.key;
  btn.innerHTML =
    '<span class="cond-box">' + (c.on ? "&#10003;" : "") + "</span>" +
    '<span class="cond-text"><strong>' + c.label + "</strong><span>" + c.hint + "</span></span>";
  btn.addEventListener("click", () => {
    c.on = !c.on;
    btn.classList.toggle("is-on", c.on);
    btn.querySelector(".cond-box").innerHTML = c.on ? "&#10003;" : "";
    render();
  });
  controlsEl.appendChild(btn);
});

function render() {
  let score = 0;
  let firstBlocker = null;

  listEl.innerHTML = "";
  CONDITIONS.forEach((c) => {
    if (c.on) score += c.weight;
    else if (!firstBlocker) firstBlocker = c;

    const li = document.createElement("li");
    li.className = c.on ? "pass" : "";
    li.innerHTML = '<span class="dot">' + (c.on ? "&#10003;" : "&#10007;") + "</span><span>" +
      c.label + (c.on ? " — warunek spełniony" : " — warunek niespełniony") + "</span>";
    listEl.appendChild(li);
  });

  scoreEl.innerHTML = score + "<small>%</small>";
  const dash = 251;
  fillEl.style.strokeDashoffset = String(dash - (dash * score) / 100);
  fillEl.style.stroke = score === 100 ? "#4ce0a5" : score >= 60 ? "#5ed6ff" : "#ff6b7a";

  if (score === 100) {
    verdictEl.className = "verdict ok";
    verdictEl.innerHTML = "<strong>Reality authorized</strong>Pętla domknięta: żądanie przeszło wszystkie sześć etapów i wraca jako dowód zwrotny. Wynik jest zaufany w granicach przyjętych założeń.";
  } else {
    verdictEl.className = "verdict stop";
    verdictEl.innerHTML = "<strong>Authorization halted</strong>" + firstBlocker.blocks +
      " Wynik: " + score + "% spełnionych warunków.";
  }
}

/* ---------- zakładki ---------- */
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-active"));
    tab.classList.add("is-active");
    document.getElementById("view-" + tab.dataset.view).classList.add("is-active");
  });
});

render();
selectStep(STEPS[0], document.querySelector(".node"));
