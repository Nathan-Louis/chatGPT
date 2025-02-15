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
