function changeBackground() {
  const colors = ["#ffcccb", "#b0e57c", "#ffb347", "#8ecae6", "#f4a261"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;

  let colorText = document.getElementById("colorText");
  if (!colorText) {
    colorText = document.createElement("p");
    colorText.id = "colorText";
    document.body.appendChild(colorText);
  }
  colorText.innerText = `Couleur actuelle : ${randomColor}`;
}
