const analyzeBtn = document.getElementById("analyze");
const notesInput = document.getElementById("notes");
const output = document.getElementById("output");

analyzeBtn.addEventListener("click", async () => {
  const notes = notesInput.value.trim();

  if (!notes) {
    output.textContent = "Please paste meeting notes first.";
    return;
  }

  output.textContent = "Analyzing meeting notes…";

  try {
    const response = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ notes })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();
    output.textContent = data.result;

  } catch (error) {
    output.textContent =
      "Could not connect to the server.\nMake sure the backend is running.";
  }
});
