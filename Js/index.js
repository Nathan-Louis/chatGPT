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
  colorText.innerText = `Couleur actuelle : ${randomColor}`;
}

// Sélectionner le bouton avec l'ID (meilleure pratique)
let btnColor = document.getElementById("changeColorBtn");

// Ajouter un événement "click" pour changer la couleur
btnColor.addEventListener("click", changeColor);

// CITATIONS

// const quotes = [
//   "La seule façon de faire du bon travail est d’aimer ce que vous faites. – Steve Jobs",
//   "Le succès, c'est tomber sept fois et se relever huit. – Proverbe japonais",
//   "L'échec est simplement l'opportunité de recommencer, cette fois plus intelligemment. – Henry Ford",
//   "N’abandonnez jamais un rêve juste à cause du temps qu’il faudra pour l’accomplir. Le temps passera de toute façon. – Earl Nightingale",
//   "Tout semble impossible jusqu’à ce qu’on le fasse. – Nelson Mandela",
// ];

// function changeQuote() {
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

//   document.getElementById("quoteText").innerText = quotes[randomIndex];
//   document.getElementById("quoteText").style.color = randomColor;
// }

// let quoteBtn = document.getElementById("QuoteBtn");

async function fetchQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) {
      throw new Error("Problème avec l'API");
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
    let deleteBtn = document.createElement("button#deleteQuote");
    document.body.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
      localStorage.removeItem(savedQuote);
      localStorage.removeItem(savedAuthor);
    });
  }
}
