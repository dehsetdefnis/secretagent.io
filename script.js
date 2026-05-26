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

  let finalText = type === "system" ? `${getTime()} ${text}` : text;

  for (let i = 0; i < finalText.length; i++) {
    div.innerText += finalText[i];

    let delay = delayBase;

    if ([".", ",", ":", "…"].includes(finalText[i])) {
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

// ekran karartma
function fadeScreen() {
  document.body.classList.add("fade-out");
}

// boot sequence
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

      await typeLine("[ access granted ] erişim sağlandı...", "system");
      await typeLine("[ identity confirmed ] ajan doğrulandı...", "system");
      await typeLine("[ secure tunnel established ] şifreli kanal açılıyor...", "system");

      await startStory();

    } else {
      await typeLine("[ denied ] erişim reddedildi", "system");
      input.value = "";
    }
  }
});

// hikaye
async function startStory() {

  await typeLine("yağmur neredeyse 3 saattir durmuyordu", "story");
  await typeLine("şehrin ışıkları ıslak asfaltın üzerinde dans ediyordu", "story");
  await typeLine("eski apartmanların arasındaki dar sokak ise gerektiğinden fazla sessizdi", "story");
  await typeLine("terminal ekranında tek bir mesaj belirdi", "story");
  await typeLine("“uyanık kal, seni izliyorlar.”", "command");
  await typeLine("ajan gündüz derin bir nefes aldı", "story");
  await typeLine("bu mesajın kimden geldiğini bilmiyordu", "story");
  await typeLine("ama birisi, sisteme giriş yaptığını fark etmişti", "story");

  await new Promise(r => setTimeout(r, 2500));

  await showChapter("bölüm 1");
}

// 🔥 FINAL CHAPTER (UZATILMIŞ + STABİL)
async function showChapter(text) {

  fadeScreen();

  await new Promise(r => setTimeout(r, 1200));

  const div = document.createElement("div");
  div.className = "chapter";
  div.innerText = text;

  document.body.appendChild(div);

  // görünür hale getir
  div.style.opacity = "1";
  div.style.zIndex = "9999";
  div.style.transform = "translate(-50%, -50%) scale(1)";

  // ⬇️ UZATILDI (artık 3.5 saniye görünür kalır)
  await new Promise(r => setTimeout(r, 3500));

  // fade out
  div.style.transition = "all 1.5s ease";
  div.style.opacity = "0";
  div.style.transform = "translate(-50%, -45%) scale(1.1)";

  await new Promise(r => setTimeout(r, 1600));

  div.remove();
}
