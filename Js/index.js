// COULEUR ALEATOIRE

function changeColor() {
  // Générer une couleur aléatoire HEXA
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  document.body.style.backgroundColor = randomColor;

  // Sélectionner l'élément <p> où afficher la couleur
  let colorText = document.getElementById("colorText");

  // Si l'élément n'existe pas, on le crée
  if (!colorText) {
    colorText = document.createElement("p");
    colorText.id = "colorText";
    document.body.appendChild(colorText);
  }

  // Mettre à jour le texte avec la nouvelle couleur
  // colorText.innerText = `Couleur actuelle : ${randomColor}`;
  document.querySelector(
    "header"
  ).innerText = `Couleur actuelle : ${randomColor}`;
}

// Sélectionner le bouton avec l'ID (meilleure pratique)
let btnColor = document.getElementById("changeColorBtn");

// Ajouter un événement "click" pour changer la couleur
btnColor.addEventListener("click", changeColor);

// CITATIONS

async function fetchQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    const data = await response.json();
    document.getElementById("quoteText").innerText = `"${data.content}"`;
    document.getElementById("quoteAuthor").innerText = `- ${data.author}`;
  } catch (error) {
    document.getElementById("quoteText").innerText =
      "Impossible de charger une citation.";
    document.getElementById("quoteAuthor").innerText = "";
    console.error(error);
  }
}

document.getElementById("quoteButton").addEventListener("click", fetchQuote);

//SAUVEGARDE CITATION PREFEREE

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
    deleteFavoriteQuote();
  }
}

// Afficher la citation favorite au chargement de la page
document.addEventListener("DOMContentLoaded", displayFavoriteQuote);

// Ajouter l'événement sur le bouton
document
  .getElementById("saveQuoteButton")
  .addEventListener("click", saveFavoriteQuote);

function deleteFavoriteQuote() {
  const savedQuote = localStorage.getItem("favoriteQuote");
  const savedAuthor = localStorage.getItem("favoriteAuthor");

  if (savedQuote && savedAuthor) {
    // Vérifier si le bouton existe déjà
    let existingDeleteBtn = document.getElementById("deleteQuote");
    if (!existingDeleteBtn) {
      let deleteBtn = document.createElement("button");
      deleteBtn.id = "deleteQuote";
      deleteBtn.innerText = "Supprimer la citation favorite";
      document.body.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", () => {
        localStorage.removeItem("favoriteQuote");
        localStorage.removeItem("favoriteAuthor");
        document.getElementById("favoriteQuote").innerText =
          "Citation favorite : Aucune pour le moment";
        deleteBtn.remove(); // Supprimer le bouton après suppression
      });
    }
  }
}

// Afficher la citation favorite au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  displayFavoriteQuote();
  deleteFavoriteQuote();
});

// BOUTON SCROLL UP

let scrollTop = document.getElementById("scrollTopBtn");

document.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    // scrollTop.style.display = "block";
    scrollTop.classList.add("show");
  } else {
    // scrollTop.style.display = "none";

    scrollTop.classList.remove("show");
  }
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// CONVERSION

document.getElementById("convertButton").addEventListener("click", async () => {
  let amount = parseFloat(document.getElementById("amount").value);
  let fromCurrency = document.getElementById("fromCurrency").value;
  let toCurrency = document.getElementById("toCurrency").value;

  if (isNaN(amount) || amount <= 0) {
    document.getElementById("result").innerText = "Entrez un montant valide.";
    return;
  }

  if (fromCurrency === toCurrency) {
    let rate = 1;
    document.getElementById(
      "result"
    ).innerText = `Résultat : ${amount} ${toCurrency}`;
    document.getElementById(
      "change"
    ).innerText = `Taux de change : ${rate.toFixed(2)} ${toCurrency}`;
    return;
  }

  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    if (!response.ok) throw new Error("Erreur API");

    const data = await response.json();
    let rate = data.rates[toCurrency];

    if (!rate) {
      document.getElementById("result").innerText = "Conversion impossible.";
      document.getElementById("change").innerText = "Taux de change : ...";
      return;
    }

    let convertedAmount = amount * rate;
    document.getElementById(
      "result"
    ).innerText = `Résultat : ${convertedAmount.toFixed(2)} ${toCurrency}`;
    document.getElementById(
      "change"
    ).innerText = `Taux de change : ${rate.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    document.getElementById("result").innerText = "Erreur de conversion.";
    console.error(error);
  }
});
