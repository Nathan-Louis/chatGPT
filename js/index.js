// CHANGER COULEUR DE FOND
const changeColorBtn = document.getElementById("changeColorBtn");
changeColorBtn.addEventListener("click", () => {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  document.body.style.backgroundColor = color;
  document.getElementById(
    "colorText"
  ).innerText = `Couleur actuelle : ${color}`;
});

// GÉNÉRATEUR DE CITATIONS
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

// SCROLL TO TOP
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// CONVERTISSEUR DE DEVISES
async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  if (isNaN(amount) || amount <= 0) {
    document.getElementById("result").innerText = "Entrez un montant valide.";
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
}
document
  .getElementById("convertButton")
  .addEventListener("click", convertCurrency);

// FORMULAIRE D'INSCRIPTION
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const passwordValidation =
    document.getElementById("passwordValidation").value;
  const cgu = document.getElementById("cgu").checked;
  const message = document.getElementById("formMessage");
  if (!nom || !prenom || !email) {
    message.textContent = "Tous les champs sont obligatoires.";
    message.style.color = "red";
    return;
  }
  if (password.length < 8) {
    message.textContent =
      "Le mot de passe doit contenir au moins 8 caractères.";
    message.style.color = "red";
    return;
  }
  if (password !== passwordValidation) {
    message.textContent = "Les mots de passe ne correspondent pas.";
    message.style.color = "red";
    return;
  }
  if (!cgu) {
    message.textContent = "Vous devez accepter les CGU.";
    message.style.color = "red";
    return;
  }
  message.textContent = "Formulaire validé avec succès !";
  message.style.color = "green";
  setTimeout(() => alert("Formulaire envoyé !"), 500);
});
