<button onclick="changeBackground()">Changer la couleur</button>

<script>
function changeBackground() {
    const colors = ["#ffcccb", "#b0e57c", "#ffb347", "#8ecae6", "#f4a261"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}
</script>
