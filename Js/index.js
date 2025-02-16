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

const quotes = [
  "La seule façon de faire du bon travail est d’aimer ce que vous faites. – Steve Jobs",
  "Le succès, c'est tomber sept fois et se relever huit. – Proverbe japonais",
  "L'échec est simplement l'opportunité de recommencer, cette fois plus intelligemment. – Henry Ford",
  "N’abandonnez jamais un rêve juste à cause du temps qu’il faudra pour l’accomplir. Le temps passera de toute façon. – Earl Nightingale",
  "Tout semble impossible jusqu’à ce qu’on le fasse. – Nelson Mandela",
];

function changeQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  document.getElementById("quoteText").innerText = quotes[randomIndex];
  document.getElementById("quoteText").style.color = randomColor;
}

let quoteBtn = document.getElementById("newQuoteBtn");

quoteBtn.addEventListener("click", () => {
  changeQuote();
});
