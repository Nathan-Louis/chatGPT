/* ================================
   CHANGER COULEUR DE FOND (ALÉATOIRE & STOCKAGE)
   ================================ */
// Récupération de la couleur stockée ou valeur par défaut
const savedColor = localStorage.getItem("bgColor") || "#f0f2f5";
document.body.style.backgroundColor = savedColor;
document.getElementById(
  "colorText"
).innerText = `Couleur actuelle : ${savedColor}`;

// Génération d'une couleur hexadécimale aléatoire
function getRandomColor() {
  return `#${Math.random().toString(16).slice(2, 8).padEnd(6, "0")}`;
}

document.getElementById("changeColorBtn").addEventListener("click", () => {
  const color = getRandomColor();
  document.body.style.backgroundColor = color;
  document.getElementById(
    "colorText"
  ).innerText = `Couleur actuelle : ${color}`;
  localStorage.setItem("bgColor", color); // Sauvegarde la couleur
});

/* ================================
   CITATION (API EXTERNE)
   ================================ */
async function fetchQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) throw new Error("Problème de récupération des citations");
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

// Sauvegarde de la citation favorite dans localStorage
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

/* ================================
   BOUTON SCROLL TOP
   ================================ */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("show", window.scrollY > 100);
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ================================
   CONVERTISSEUR DE DEVISES (API EXTERNE)
   ================================ */
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
    if (!res.ok) throw new Error("Problème de récupération des taux");
    const data = await res.json();
    const rate = data.rates[to];
    if (!rate) throw new Error("Taux non disponible");
    document.getElementById("result").innerText = `Résultat : ${(
      amount * rate
    ).toFixed(2)} ${to}`;
    document.getElementById(
      "change"
    ).innerText = `Taux de change : ${rate.toFixed(2)}`;
  } catch (error) {
    document.getElementById("result").innerText =
      "Erreur de conversion : " + error.message;
  }
});

/* ================================
   VALIDATION FORMULAIRE
   ================================ */
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const passwordValidation =
    document.getElementById("passwordValidation").value;
  const genre = document.querySelector('input[name="genre"]:checked');
  const cgu = document.getElementById("cgu").checked;
  const message = document.getElementById("formMessage");

  if (!nom || !prenom || !email || !genre) {
    message.textContent = "Tous les champs sont obligatoires.";
    message.style.color = "red";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.textContent = "Veuillez entrer une adresse e-mail valide.";
    message.style.color = "red";
    return;
  }

  if (password.length < 8) {
    message.textContent = "Le mot de passe doit faire au moins 8 caractères.";
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
