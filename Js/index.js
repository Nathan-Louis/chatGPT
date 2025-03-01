function changeColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  document.body.style.backgroundColor = randomColor;

  document.getElementById(
    "colorInfo"
  ).innerText = ` - Couleur actuelle : ${randomColor}`;
}

document
  .getElementById("changeColorBtn")
  .addEventListener("click", changeColor);

async function fetchQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) throw new Error("Problème avec l'API");
    const data = await response.json();
    document.getElementById("quoteText").innerText = `"${data.content}"`;
    document.getElementById("quoteAuthor").innerText = `- ${data.author}`;
  } catch {
    document.getElementById("quoteText").innerText =
      "⚠️ Impossible de charger une citation.";
    document.getElementById("quoteAuthor").innerText = "";
  }
}

document.getElementById("quoteButton").addEventListener("click", fetchQuote);

function saveFavoriteQuote() {
  const quote = document.getElementById("quoteText").innerText;
  const author = document.getElementById("quoteAuthor").innerText;

  if (quote && author) {
    localStorage.setItem("favoriteQuote", quote);
    localStorage.setItem("favoriteAuthor", author);
    displayFavoriteQuote();
  }
}

function displayFavoriteQuote() {
  const savedQuote = localStorage.getItem("favoriteQuote");
  const savedAuthor = localStorage.getItem("favoriteAuthor");

  if (savedQuote && savedAuthor) {
    document.getElementById(
      "favoriteQuote"
    ).innerText = `Citation favorite : ${savedQuote} ${savedAuthor}`;
    showDeleteButton();
  }
}

function showDeleteButton() {
  if (!document.getElementById("deleteQuote")) {
    const btn = document.createElement("button");
    btn.id = "deleteQuote";
    btn.innerText = "Supprimer la citation favorite";
    btn.addEventListener("click", () => {
      localStorage.removeItem("favoriteQuote");
      localStorage.removeItem("favoriteAuthor");
      document.getElementById("favoriteQuote").innerText =
        "Citation favorite : Aucune pour le moment";
      btn.remove();
    });
    document.body.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", displayFavoriteQuote);
document
  .getElementById("saveQuoteButton")
  .addEventListener("click", saveFavoriteQuote);

document.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollTopBtn");
  if (window.scrollY > 100) btn.classList.add("show");
  else btn.classList.remove("show");
});

document.getElementById("scrollTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("convertButton").addEventListener("click", async () => {
  let amount = parseFloat(document.getElementById("amount").value);
  let fromCurrency = document.getElementById("fromCurrency").value;
  let toCurrency = document.getElementById("toCurrency").value;

  if (isNaN(amount) || amount <= 0) {
    document.getElementById("result").innerText = "Entrez un montant valide.";
    return;
  }

  if (fromCurrency === toCurrency) {
    document.getElementById(
      "result"
    ).innerText = `Résultat : ${amount} ${toCurrency}`;
    document.getElementById("change").innerText = "Taux de change : 1";
    return;
  }

  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    if (!response.ok) throw new Error();

    const data = await response.json();
    const rate = data.rates[toCurrency];
    const converted = amount * rate;

    document.getElementById(
      "result"
    ).innerText = `Résultat : ${converted.toFixed(2)} ${toCurrency}`;
    document.getElementById(
      "change"
    ).innerText = `Taux de change : ${rate.toFixed(2)}`;
  } catch {
    document.getElementById("result").innerText =
      "⚠️ Erreur de conversion. Vérifiez votre connexion.";
  }
});
