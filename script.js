const pairBtn = document.getElementById("pairBtn");
const numberInput = document.getElementById("number");
const resultDiv = document.getElementById("result");
const loadingDiv = document.getElementById("loading");

const BACKEND_URL = "https://zrt-pair-production.up.railway.app";

pairBtn.addEventListener("click", async () => {

  const number = numberInput.value.trim();

  if (!number) {
    alert("Enter your WhatsApp number");
    return;
  }

  resultDiv.classList.add("hidden");
  loadingDiv.classList.remove("hidden");

  try {

    // Request official pairing code from backend
    const response = await fetch(
  `${BACKEND_URL}/pair?number=${number}`
);
    const data = await response.json();

    loadingDiv.classList.add("hidden");

    if (data.code) {

      resultDiv.innerHTML = `
        Pair Code:<br><br>
        <strong>${data.code}</strong>
      `;

      resultDiv.classList.remove("hidden");

    } else {

      resultDiv.innerHTML = `
        Failed to get pairing code
      `;

      resultDiv.classList.remove("hidden");
    }

  } catch (err) {

    loadingDiv.classList.add("hidden");

    resultDiv.innerHTML = `
      Backend connection failed
    `;

    resultDiv.classList.remove("hidden");

    console.error(err);
  }

});
