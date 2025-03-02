// CHANGER COULEUR DE FOND
document.getElementById("changeColorBtn").addEventListener("click", () => {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  document.body.style.backgroundColor = color;
  document.getElementById(
    "colorText"
  ).innerText = `Couleur actuelle : ${color}`;
});

// CITATION
async function fetchQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    document.getElementById("quoteText").innerText = `"${data.content}"`;
    document.getElementById("quoteAuthor").innerText = `- ${data.author}`;
  } catch (error) {
    document.getElementById("quoteText").innerText =
      "Impossible de charger une citation.";
    document.getElementById("quoteAuthor").innerText = "";
  }
}
document.getElementById("quoteButton").addEventListener("click", fetchQuote);

// SAUVEGARDE CITATION
function saveFavoriteQuote() {
  localStorage.setItem(
    "favoriteQuote",
    document.getElementById("quoteText").innerText
  );
  localStorage.setItem(
    "favoriteAuthor",
    document.getElementById("quoteAuthor").innerText
  );
  displayFavoriteQuote();
}
function displayFavoriteQuote() {
  const quote = localStorage.getItem("favoriteQuote") || "Aucune";
  const author = localStorage.getItem("favoriteAuthor") || "";
  document.getElementById(
    "favoriteQuote"
  ).innerText = `Citation favorite : ${quote} ${author}`;
}
document
  .getElementById("saveQuoteButton")
  .addEventListener("click", saveFavoriteQuote);
document.addEventListener("DOMContentLoaded", displayFavoriteQuote);

// SCROLL TOP
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// CONVERTISSEUR DE DEVISES
document.getElementById("convertButton").addEventListener("click", async () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;

  if (isNaN(amount) || amount <= 0) {
    document.getElementById("result").innerText = "Entrez un montant valide.";
    return;
  }

  if (from === to) {
    document.getElementById("result").innerText = `Résultat : ${amount} ${to}`;
    document.getElementById("change").innerText = `Taux de change : 1`;
    return;
  }

  try {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );
    const data = await res.json();
    const rate = data.rates[to];
    document.getElementById("result").innerText = `Résultat : ${(
      amount * rate
    ).toFixed(2)} ${to}`;
    document.getElementById(
      "change"
    ).innerText = `Taux de change : ${rate.toFixed(2)}`;
  } catch {
    document.getElementById("result").innerText = "Erreur de conversion.";
  }
});
