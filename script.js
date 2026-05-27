const input = document.getElementById("input");
const output = document.getElementById("output");
const loginBox = document.querySelector(".login");

let gameStarted = false;

// saat sistemi
function getTime() {
  const now = new Date();

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  return `[${h}:${m}:${s}]`;
}

// yazı motoru
async function typeLine(text, type = "system") {

  const div = document.createElement("div");

  div.classList.add(type);

  output.appendChild(div);

  let delayBase = 30;

  if (type === "system") delayBase = 12;
  if (type === "command") delayBase = 22;
  if (type === "story") delayBase = 34;

  let finalText = text;

  if (type === "system") {
    finalText = `${getTime()} ${text}`;
  }

  for (let i = 0; i < finalText.length; i++) {

    div.innerText += finalText[i];

    let delay = delayBase;

    if (
      finalText[i] === "." ||
      finalText[i] === "," ||
      finalText[i] === ":" ||
      finalText[i] === "…"
    ) {
      delay += 70;
    }

    await new Promise(r => setTimeout(r, delay));
  }

  div.innerText += "\n";

  window.scrollTo(0, document.body.scrollHeight);
}

// ekran temizleme
function clearScreen() {
  output.innerHTML = "";
}

// boot
async function bootSequence() {

  const boot = [

    "[ ok ] sistem başlatılıyor...",
    "[ ok ] çekirdek modülleri yükleniyor...",
    "[ ok ] şifreleme protokolü aktif...",
    "[ ok ] güvenli kanal aranıyor...",
    "[ encrypted ] command bağlantısı kuruluyor...",
    "[ warning ] kimlik doğrulaması gerekli",
    "[ input ] lütfen şifreyi giriniz"

  ];

  for (let line of boot) {
    await typeLine(line, "system");
  }

  loginBox.style.display = "block";

  input.focus();
}

bootSequence();

// login
input.addEventListener("keydown", async (e) => {

  if (e.key !== "Enter") return;

  if (!gameStarted) {

    const value = input.value.trim().toLowerCase();

    if (value === "hm20ae2358tpfnq99") {

      gameStarted = true;

      input.value = "";

      loginBox.style.display = "none";

      clearScreen();

      await typeLine(
        "[ access granted ] erişim sağlandı...",
        "system"
      );

      await typeLine(
        "[ identity confirmed ] ajan doğrulandı...",
        "system"
      );

      await typeLine(
        "[ secure tunnel established ] şifreli kanal açılıyor...",
        "system"
      );

      await startStory();

    } else {

      await typeLine(
        "[ denied ] erişim reddedildi",
        "system"
      );

      input.value = "";
    }
  }
});

// hikaye
async function startStory() {

  await typeLine(
    "yağmur neredeyse 3 saattir durmuyordu",
    "story"
  );

  await typeLine(
    "şehrin ışıkları ıslak asfaltın üzerinde dans ediyordu",
    "story"
  );

  await typeLine(
    "eski apartmanların arasındaki dar sokak ise gerektiğinden fazla sessizdi",
    "story"
  );

  await typeLine(
    "terminal ekranında tek bir mesaj belirdi",
    "story"
  );

  await typeLine(
    "“uyanık kal, seni izliyorlar.”",
    "command"
  );

  await typeLine(
    "ajan gündüz derin bir nefes aldı",
    "story"
  );

  await typeLine(
    "bu mesajın kimden geldiğini bilmiyordu",
    "story"
  );

  await typeLine(
    "ama birisi, sisteme giriş yaptığını fark etmişti",
    "story"
  );

  await new Promise(r => setTimeout(r, 2500));

  await showChapter("BÖLÜM 1");
}

// chapter sistemi
async function showChapter(text) {

  // overlay oluştur
  const overlay = document.createElement("div");

  overlay.className = "screen-overlay";

  document.body.appendChild(overlay);

  // ekranı karart
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });

  await new Promise(r => setTimeout(r, 2200));

  // chapter oluştur
  const div = document.createElement("div");

  div.innerText = text;

  Object.assign(div.style, {

    position: "fixed",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%) scale(0.9)",

    fontSize: "48px",
    color: "#39ff14",
    fontFamily: "monospace",

    textShadow: "0 0 15px rgba(57,255,20,0.8)",

    zIndex: "9999",

    opacity: "0",

    transition: "all 2s ease",

    pointerEvents: "none"

  });

  document.body.appendChild(div);

  // fade in
  requestAnimationFrame(() => {

    div.style.opacity = "1";

    div.style.transform =
      "translate(-50%, -50%) scale(1)";
  });

  // ekranda kalma süresi
  await new Promise(r => setTimeout(r, 5000));

  // fade out
  div.style.opacity = "0";

  div.style.transform =
    "translate(-50%, -45%) scale(1.1)";

  await new Promise(r => setTimeout(r, 2000));

  div.remove();
}
