const generateBtn = document.getElementById("generate-btn");   // FIX: was "generatedBtn" (typo, also fixed below)
const paletteContainer = document.querySelector(".palette-container");
// FIX: removed unused/buggy "copyBtn" const — it only grabbed the FIRST .copy-btn
// and was never referenced, so it was dead code that could confuse debugging.

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;
        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target))   // FIX: "showCopySucess" → "showCopySuccess" (consistent spelling)
            .catch((err) => console.log(err));
    } else if (e.target.classList.contains("color")) {
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
            .catch((err) => console.log(err));
    }
});

function showCopySuccess(element) {
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");
    element.style.color = "#48bb78";
    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");   // FIX: was re-adding "fas fa-check" again — icon never reverted
        element.style.color = "";
    }, 1500);
}

function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }
    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];   // FIX: "Math,floor" → "Math.floor" (comma instead of dot)
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");
        colorDiv.style.backgroundColor = color;   // FIX: "colorDiv.computedStyleMap.backgroundColor" is not a valid API — should be "colorDiv.style.backgroundColor"
        hexValue.textContent = color;
    });
}

generatePalette();
