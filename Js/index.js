let btnEnvoyer = document.getElementById("envoyer");
let btnCouleur = document.getElementById("couleur");
let texte = document.getElementById("texte");
let p = document.querySelector("p");
let pCouleur = document.getElementById("couleurInfo");
let i = 0;

function getRandomColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

btnEnvoyer.addEventListener("click", () => {
  p.textContent = texte.value;
});

btnCouleur.addEventListener("click", () => {
  i++;
  console.log(i);

  console.log("Click Bouton Couleur");
  document.body.style.backgroundColor = getRandomColor();
  pCouleur.textContent = document.body.style.backgroundColor;
});
